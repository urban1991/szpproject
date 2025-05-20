'use client';

import { useState } from 'react';
import {ForPeteSakePage} from "@/app/interpreter";

export default function Home() {
  const [interpreterCode, setInterpreterCode] = useState<string>('');
  const loadExampleProgram = async () => {

    try {
      const response = await fetch('/docs/turing_completeness_example.fps');
      if (!response.ok) {
        throw new Error(`Failed to fetch example program: ${response.status}`);
      }
      const code = await response.text();
      setInterpreterCode(code);
    } catch (error) {
      console.error('Error loading example program:', error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16s font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
            <h1 className="text-4xl font-bold text-center">
                Interpreter ForPeteSake
            </h1>
            <div className="flex flex-col gap-2 mb-4 text-center">
              <h2 className="text-xl font-semibold">Dokumentacja zupełności Turinga</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Dowiedz się, dlaczego ForPeteSake jest językiem zupełnym w sensie Turinga
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/docs/turing_completeness_checks.md"
                  target="_blank"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Weryfikacja zupełności Turinga
                </a>
                <button
                  onClick={loadExampleProgram}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Program przykładowy
                </button>
                <a
                  href="/docs/turing_completeness_README.md"
                  target="_blank"
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                >
                  Dokumentacja
                </a>
              </div>
            </div>
              <ForPeteSakePage initialCode={interpreterCode || undefined} onCodeReset={setInterpreterCode} />
      </main>
    </div>
  );
}
