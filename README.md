# ForPeteSake Interpreter

**ForPeteSake** to minimalistyczny, ezoteryczny język o składni wzorowanej na Brainfucku, ale z bardziej „human-friendly” komendami. Język jest Turing-zupełny – możesz w nim zaimplementować dowolny algorytm.

---

## Komendy

| Instrukcja | Znaczenie                                                         |
|------------|------------------------------------------------------------------|
| `pit`      | inkrementuj wartość w bieżącej komórce taśmy                     |
| `tip`      | dekrementuj wartość w bieżącej komórce taśmy                     |
| `pete`     | przesuń wskaźnik na następną komórkę (prawo)                    |
| `etepe`    | przesuń wskaźnik na poprzednią komórkę (lewo)                   |
| `pit?`     | jeżeli wartość ≠ 0 → skocz do odpowiadającego `?tip` (początek pętli) |
| `?tip`     | jeżeli wartość ≠ 0 → skocz do odpowiadającego `pit?` (koniec pętli) |

---

## Przykład programu

**Mnożenie** 3×5 → wynik w drugiej komórce:

