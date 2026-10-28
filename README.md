# Explorador móvil

## Instalación
npm install
npx expo install expo-camera expo-location expo-sensors 
npx expo install react-native-safe-area-context

## Ejecución
npx expo start   (abrir con Expo Go)

## Limitaciones conocidas
- Las lecturas del magnetómetro fluctúan aun con el teléfono quieto, no se aplicó suavizado.
- El ángulo es una orientación horizontal aproximada, no un rumbo geográfico calibrado.
- Probado solo en iPhone con Expo Go.
- Los estados ‘sin pedir’ y ‘denegado’ de la cámara se probaron con estados simulados

## Evidencias
Ver carpeta `evidencias/`.