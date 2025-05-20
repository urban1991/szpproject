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
Mnożenie 3×5 = 15
Komórka 0: pierwsza liczba (3)
Komórka 1: druga liczba (5)
Komórka 2: wynik (będzie 15)

Ustawiamy pierwszą liczbę (3) w komórce 0
pit pit pit

Przesuwamy wskaźnik do komórki 1
pete

Ustawiamy drugą liczbę (5) w komórce 1
pit pit pit pit pit

Przesuwamy wskaźnik do komórki 2 (na wynik, początkowo 0)
pete

Wracamy do komórki 0
etepe etepe

Algorytm mnożenia: dodajemy wartość komórki 1 do komórki 2
tyle razy, ile wynosi wartość komórki 0
pit?
Zmniejszamy licznik (komórka 0)
tip

Przechodzimy do komórki 1 (druga liczba)
pete

Kopiujemy wartość z komórki 1 do komórki 2
poprzez iterację
pit?
Zmniejszamy komórkę 1
tip

    // Przechodzimy do komórki 2
    pete
    
    // Zwiększamy komórkę 2
    pit
    
    // Wracamy do komórki 1
    etepe
?tip

// Odtwarzamy wartość komórki 1 (5)
pit pit pit pit pit

// Wracamy do komórki 0
etepe
?tip

Po zakończeniu pętli:
 - Komórka 0 będzie miała wartość 0
 - Komórka 1 będzie miała wartość 5
 - Komórka 2 będzie miała wartość 15 (wynik mnożenia 3×5)
