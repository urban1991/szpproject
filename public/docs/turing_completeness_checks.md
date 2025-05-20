# Język ForPeteSake: Weryfikacja zupełności Turinga

Ten dokument demonstruje, w jaki sposób język ForPeteSake spełnia trzy kluczowe wymagania zupełności Turinga.

## 1. Rozgałęzienie warunkowe

Język musi być w stanie wykonywać różne operacje na podstawie warunków (instrukcje if/else lub ich odpowiedniki).

### Implementacja w ForPeteSake:

ForPeteSake implementuje rozgałęzienie warunkowe poprzez swoje konstrukcje pętli `pit?` i `?tip`. Te komendy pozwalają programowi podejmować decyzje na podstawie wartości aktualnej komórki:

```
// Struktura if-then w ForPeteSake
// Ten kod sprawdza, czy komórka ma wartość niezerową i wykonuje akcję

// Najpierw skopiuj wartość do innej komórki, aby ją zachować
pit? // Początek pętli (wykonuje się tylko, jeśli wartość komórki jest niezerowa)
  tip // Zmniejsz wartość oryginalnej komórki
  pete // Przesuń wskaźnik w prawo
  pit // Zwiększ wartość następnej komórki (tworząc kopię)
  etepe // Przesuń wskaźnik w lewo
?tip // Koniec pętli

pete // Przesuń wskaźnik do skopiowanej wartości
pit? // Jeśli skopiowana wartość jest niezerowa (co oznacza, że oryginalna była niezerowa)
  // Akcje do wykonania, jeśli warunek jest prawdziwy
  // ...

  // Wyczyść komórkę po zakończeniu
  pit?
    tip
  ?tip
?tip
```

To pokazuje, że ForPeteSake może implementować logikę warunkową, używając swoich konstrukcji pętli i wartości komórek do podejmowania decyzji o tym, które ścieżki kodu wykonać.

## 2. Iteracja lub rekurencja

Język musi obsługiwać pętle lub wywołania funkcji rekurencyjnych, aby powtarzać operacje.

### Implementacja w ForPeteSake:

ForPeteSake bezpośrednio obsługuje iterację poprzez swoje konstrukcje pętli `pit?` i `?tip`:

```
// Podstawowa pętla, która powtarza akcję 5 razy
pit pit pit pit pit // Ustaw wartość komórki na 5
pit? // Początek pętli (kontynuuje, dopóki wartość komórki nie stanie się 0)
  // Akcje do powtórzenia
  // ...

  tip // Zmniejsz licznik
?tip // Koniec pętli, wróć do pit?, jeśli wartość komórki nie jest 0
```

Ta struktura pętli pozwala ForPeteSake powtarzać operacje określoną liczbę razy lub do momentu spełnienia warunku, spełniając wymaganie iteracji dla zupełności Turinga.

## 3. Manipulacja pamięcią

Język musi mieć możliwość odczytu i zapisu dowolnej ilości pamięci.

### Implementacja w ForPeteSake:

ForPeteSake operuje na taśmie komórek (tablicy liczb całkowitych) z komendami do manipulowania zarówno wartościami komórek, jak i pozycją wskaźnika:

1. **Odczyt pamięci**: Język niejawnie odczytuje wartość aktualnej komórki podczas wykonywania komend takich jak `pit?` (która sprawdza, czy wartość komórki wynosi 0).

2. **Zapis do pamięci**: Komendy `pit` i `tip` modyfikują wartość aktualnej komórki.

3. **Dostęp do dowolnych lokalizacji pamięci**: Komendy `pete` i `etepe` przesuwają wskaźnik w prawo i w lewo, umożliwiając dostęp do różnych komórek pamięci.

```
// Przykład manipulacji pamięcią
pit pit pit // Ustaw aktualną komórkę na 3
pete // Przesuń do następnej komórki
pit pit // Ustaw ją na 2
pete // Przesuń do następnej komórki
pit pit pit pit // Ustaw ją na 4
etepe etepe // Cofnij się o dwie komórki
tip // Zmodyfikuj pierwszą komórkę
```

Chociaż implementacja w interpreterze ogranicza taśmę do stałego rozmiaru (20 komórek), sam język koncepcyjnie obsługuje nieograniczoną taśmę, ponieważ zawijanie wskaźnika jest szczegółem implementacyjnym, a nie ograniczeniem języka. W teoretycznej implementacji taśma mogłaby być rozszerzana w miarę potrzeb.

## Podsumowanie

ForPeteSake spełnia wszystkie trzy wymagania zupełności Turinga:
1. Może wykonywać rozgałęzienie warunkowe poprzez swoje konstrukcje pętli
2. Obsługuje iterację za pomocą swojej struktury pętli
3. Może manipulować pamięcią poprzez odczytywanie i zapisywanie wartości komórek oraz przesuwanie wskaźnika

Dlatego ForPeteSake jest zupełny w sensie Turinga i teoretycznie może obliczać dowolny algorytm, który jest obliczalny przez maszynę Turinga, przy założeniu wystarczającej ilości czasu i pamięci.
