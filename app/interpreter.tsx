'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// ForPeteSake commands: pit (increment), tip (decrement), pete (move right), etepe (move left), pit? (loop start), ?tip (loop end)
const TOKEN_REGEX = /(pit\?|\?tip|etepe|pete|pit|tip)/g;

export const metadata = {
    title: 'Interpreter ForPeteSake',
};

interface Step {
    tape: number[];
    pointer: number;
    token: string;
    ip: number;
}

export default function ForPeteSakePage({ initialCode, onCodeChange }: { initialCode?: string, onCodeChange?: (code: string) => void }) {
    const defaultCode = `// Przykładowy kod ForPeteSake
// Inkrementuje komórkę 5 razy
pit pit pit pit pit
// Przesuwa wskaźnik w prawo
pete
// Inkrementuje komórkę 3 razy
pit pit pit
// Przesuwa wskaźnik w lewo
etepe
// Pętla: dopóki wartość komórki nie jest zerem
pit?
  // Dekrementuje komórkę
  tip
  // Przesuwa wskaźnik w prawo
  pete
  // Inkrementuje komórkę
  pit
  // Przesuwa wskaźnik w lewo
  etepe
?tip`;

    const [code, setCode] = useState<string>(initialCode || defaultCode);
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [speed, setSpeed] = useState<number>(500); // Default speed: 500ms
    const timer = useRef<NodeJS.Timeout | null>(null);

    // Function to reset the interpreter state and set new code
    const resetAndSetCode = (newCode: string) => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
        setCode(newCode);
        setSteps([]);
        setCurrentStep(0);
        setError(null);
        if (onCodeChange) {
            onCodeChange(newCode);
        }
    };

    const runCode = () => {
        try {
            setError(null);
            const tape = Array(20).fill(0);
            let ptr = 0;
            let ip = 0;
            const tokens = code.match(TOKEN_REGEX) || [];

            if (tokens.length === 0) {
                setError("Nie znaleziono żadnych komend ForPeteSake w kodzie.");
                return;
            }

            const loopStack: number[] = [];
            const loopMap: Record<number, number> = {};

            tokens.forEach((tok, idx) => {
                if (tok === 'pit?') {
                    loopStack.push(idx);
                } else if (tok === '?tip') {
                    const start = loopStack.pop();
                    if (start === undefined) {
                        throw new Error(`Niepasujący ?tip na pozycji ${idx}. Każda komenda ?tip musi mieć odpowiadającą komendę pit?.`);
                    }
                    loopMap[start] = idx;
                    loopMap[idx] = start;
                }
            });

            if (loopStack.length) {
                throw new Error(`Niepasujący pit? na pozycji ${loopStack[0]}. Każda komenda pit? musi mieć odpowiadającą komendę ?tip.`);
            }

            const trace: Step[] = [];
            // Add a maximum step limit to prevent browser hanging
            const MAX_STEPS = 10000;
            let stepCount = 0;

            while (ip < tokens.length && stepCount < MAX_STEPS) {
                const cmd = tokens[ip];
                trace.push({ tape: [...tape], pointer: ptr, token: cmd, ip });
                stepCount++;

                switch (cmd) {
                    case 'pit':
                        tape[ptr] = (tape[ptr] + 1) & 0xff;
                        break;
                    case 'tip':
                        tape[ptr] = (tape[ptr] - 1 + 256) & 0xff;
                        break;
                    case 'pete':
                        ptr = (ptr + 1) % tape.length;
                        break;
                    case 'etepe':
                        ptr = (ptr - 1 + tape.length) % tape.length;
                        break;
                    case 'pit?':
                        if (tape[ptr] === 0) ip = loopMap[ip] as number;
                        break;
                    case '?tip':
                        if (tape[ptr] !== 0) ip = loopMap[ip] as number;
                        break;
                }
                ip++;
            }

            // Check if we hit the step limit
            if (stepCount >= MAX_STEPS) {
                trace.push({ tape: [...tape], pointer: ptr, token: 'LIMIT', ip });
                setError("Program przekroczył maksymalną liczbę kroków (10000). Możliwy nieskończony cykl.");
            } else {
                trace.push({ tape: [...tape], pointer: ptr, token: 'END', ip });
            }

            setSteps(trace);
            setCurrentStep(0);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd podczas wykonywania kodu.");
            setSteps([]);
        }
    };

    const nextStep = () => {
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    };
    const prevStep = () => {
        setCurrentStep((s) => Math.max(s - 1, 0));
    };

    const play = () => {
        if (timer.current) return;
        timer.current = setInterval(() => {
            setCurrentStep((s) => {
                if (s < steps.length - 1) return s + 1;
                clearInterval(timer.current!);
                timer.current = null;
                return s;
            });
        }, speed);
    };
    const pause = () => {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
    };

    // Reset the interpreter state when initialCode changes
    useEffect(() => {
        if (initialCode) {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
            setCode(initialCode);
            setSteps([]);
            setCurrentStep(0);
            setError(null);
        }
    }, [initialCode]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => { if (timer.current) clearInterval(timer.current); };
    }, []);

    return (
        <>
            <Head><title>Interpreter ForPeteSake</title></Head>
            <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 w-full max-w-4xl mx-auto">
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Instrukcja:</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">ForPeteSake to prosty język programowania z następującymi komendami:</p>
                    <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-300">
                        <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">pit</code> - inkrementuje wartość aktualnej komórki</li>
                        <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">tip</code> - dekrementuje wartość aktualnej komórki</li>
                        <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">pete</code> - przesuwa wskaźnik w prawo</li>
                        <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">etepe</code> - przesuwa wskaźnik w lewo</li>
                        <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">pit?</code> - początek pętli (jeśli wartość komórki = 0, przeskakuje do odpowiadającego <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">?tip</code>)</li>
                        <li><code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">?tip</code> - koniec pętli (jeśli wartość komórki ≠ 0, wraca do odpowiadającego <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">pit?</code>)</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300">Kliknij &#34;Uruchom&#34; aby wykonać kod, a następnie użyj przycisków nawigacji aby przechodzić przez kolejne kroki wykonania.</p>
                </div>

                <textarea
                    className="w-full h-48 p-2 mb-4 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// Wpisz kod ForPeteSake tutaj"
                />
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={runCode}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                        Uruchom
                    </button>
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Poprzedni
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={currentStep >= steps.length - 1}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Następny
                    </button>
                    <button
                        onClick={play}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
                    >
                        Play
                    </button>
                    <button
                        onClick={pause}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                    >
                        Pause
                    </button>
                </div>

                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="speed-slider" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Prędkość animacji:
                        </label>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {speed}ms
                        </span>
                    </div>
                    <input
                        id="speed-slider"
                        type="range"
                        min="100"
                        max="1000"
                        step="100"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Szybko</span>
                        <span>Wolno</span>
                    </div>
                </div>
                {error && <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-200 rounded-md dark:bg-red-900 dark:text-red-100 dark:border-red-800">Błąd: {error}</div>}
                {steps.length > 0 && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md dark:border-gray-700">
                        <div className="mb-2 text-gray-700 dark:text-gray-300">
                            Token: <span className="font-bold">{steps[currentStep].token}</span>
                            <span className="ml-2 text-gray-500 dark:text-gray-400">(ip: {steps[currentStep].ip})</span>
                        </div>
                        <div className="flex overflow-x-auto pb-2">
                            {steps[currentStep].tape.map((cell, idx) => (
                                <div
                                    key={idx}
                                    className={`
                                        flex items-center justify-center
                                        w-10 h-10 min-w-[2.5rem]
                                        text-center
                                        ${idx === steps[currentStep].pointer 
                                            ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' 
                                            : 'border border-gray-300 dark:border-gray-600'}
                                        mr-1 rounded-md
                                        transition-all duration-200
                                    `}
                                >
                                    {cell}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
