# Zupełność Turinga języka ForPeteSake

Ten katalog zawiera pliki, które demonstrują i wyjaśniają, dlaczego język ForPeteSake jest językiem zupełnym w sensie Turinga.

## Czym jest zupełność Turinga?

Język programowania jest uznawany za **zupełny w sensie Turinga**, jeśli może symulować maszynę Turinga, co oznacza, że może obliczać dowolny algorytm, który jest obliczalny. Aby język był zupełny w sensie Turinga, musi spełniać trzy kluczowe wymagania:

1. **Rozgałęzienie warunkowe**: Zdolność do wykonywania różnych operacji na podstawie warunków
2. **Iteracja lub rekurencja**: Zdolność do powtarzania operacji
3. **Manipulacja pamięcią**: Zdolność do odczytu i zapisu dowolnej ilości pamięci

## Pliki w tym katalogu

### 1. `turing_completeness_checks.md`

Ten dokument zawiera szczegółowe wyjaśnienie, w jaki sposób ForPeteSake spełnia każde z trzech wymagań zupełności Turinga, wraz z przykładami kodu dla każdego wymagania.

### 2. `Przykładowy program ForPeteSake`

Jest to kompletny program ForPeteSake, który demonstruje wszystkie trzy wymagania zupełności Turinga w jednym programie:
- Wykorzystuje pętle do iteracji
- Implementuje logikę warunkową do podejmowania decyzji
- Manipuluje pamięcią poprzez odczytywanie, zapisywanie i przenoszenie wartości między komórkami

## Jak uruchomić przykład

Możesz uruchomić przykładowy program za pomocą interpretera ForPeteSake w tym projekcie:

1. Naciśnij przycisk "Program początkowy", aby załadować przykładowy program
2. Kliknij "Uruchom", aby wykonać program i "Play", aby zobaczyć jego działanie
3. Użyj kontrolek krokowych, aby obserwować, jak program demonstruje każdy aspekt zupełności Turinga

## Podsumowanie

Język ForPeteSake, pomimo swojej prostoty, jest zupełny w sensie Turinga, ponieważ spełnia wszystkie trzy wymagania niezbędne do zupełności Turinga. Oznacza to, że teoretycznie ForPeteSake może obliczać dowolny algorytm, który jest obliczalny przez maszynę Turinga, przy założeniu wystarczającej ilości czasu i pamięci.

Chociaż praktyczna implementacja w tym projekcie ogranicza taśmę do stałego rozmiaru, sam język koncepcyjnie obsługuje nieograniczoną taśmę, co jest wymogiem dla prawdziwej zupełności Turinga.
