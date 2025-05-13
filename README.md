## Wymagania wstępne
Do odpalenia projektu, należy zainstalować:

- Node.js (rekomendowana wersja: 18+)
- npm lub yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Emulator lub Expo Go (na telefonie)

## Uruchomienie projektu

1. Sklonuj repozytorium:
  git clone https://github.com/MateuszCieplak/react-native-app.git
  cd react-native-app

2. Zainstaluj zależności:
npm install lub yarn install

3. Uruchom Expo:
npm start lub expo start

4. Uruchom aplikację:
- Android Emulator: naciśnij `a` w terminalu
- iOS Simulator (tylko macOS): naciśnij `i`
- lub zeskanuj QR kod w aplikacji **Expo Go** na telefonie

## Dane w aplikacji

Aplikacja korzysta z dwóch metod pobierania danych z YouTube API:

- `fetchVideosByQuery` – prawdziwe API YouTube (może mieć limity)
- `fetchMockVideosByQuery` – mockowane dane do testów

Domyślnie aplikacja używa `fetchMockVideosByQuery`.

## Struktura projektu

- `/screens` – ekrany aplikacji (Home, ShowMore itd.)
- `/components` – komponenty wielokrotnego użytku (SearchBar itd.)
- `/services` – logika API (mock i prawdziwa)
- `/navigation` – konfiguracja nawigacji (Stack + Tabs)

## Dodatkowe informacje

- Używane czcionki: `Poppins` – instalowane przez Expo
- Styl oparty na `StyleSheet` z React Native
