'use client';

import { useState } from 'react';
import {ForPeteSakePage} from "@/app/interpreter";
import Link from "next/link";

const exampleProgram = `// Program demonstrujący zupełność Turinga w ForPeteSake
// 1. Rozgałęzienie warunkowe
// 2. Iteracja
// 3. Manipulacja pamięcią

// Inicjalizacja: Ustawiamy wartość pierwszej komórki na 3
pit pit pit

// ITERACJA: Pętla główna wykonuje się 3 razy
pit?
  // MANIPULACJA PAMIĘCIĄ: Przesuwamy wskaźnik do komórki 1
  pete

  // Dodajemy 1 do komórki 1 w każdej iteracji
  pit

  // MANIPULACJA PAMIĘCIĄ: Przesuwamy wskaźnik z powrotem do komórki 0
  etepe

  // Zmniejszamy licznik pętli o 1
  tip
?tip

// ROZGAŁĘZIENIE WARUNKOWE: Sprawdzamy czy komórka 0 = 0
// Przesuń do komórki 1 (która ma teraz wartość 3)
pete

// Dodaj 3 do komórki 1 tylko jeśli komórka 0 = 0
// (co jest prawdą po zakończeniu pętli)
etepe
pit?
  // Ta część wykona się tylko gdy komórka 0 jest niezerowa
  pete
  tip tip tip
  etepe
?tip

// W tym momencie:
// - Komórka 0 ma wartość 0
// - Komórka 1 ma wartość 3 (po jednym inkremencie w każdej z 3 iteracji)
`

export default function Home() {
  const [interpreterCode, setInterpreterCode] = useState<string>('');

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
                <Link
                  href="/docs/turing_completeness_checks.md"
                  target="_blank"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Weryfikacja zupełności Turinga
                </Link>
                <button
                  onClick={() => setInterpreterCode(exampleProgram)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Program przykładowy
                </button>
                <Link
                  href="/docs/turing_completeness_README.md"
                  target="_blank"
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                >
                  Dokumentacja
                </Link>
              </div>
            </div>
              <ForPeteSakePage initialCode={interpreterCode || undefined} onCodeReset={setInterpreterCode} />
      </main>
    </div>
  );
}
