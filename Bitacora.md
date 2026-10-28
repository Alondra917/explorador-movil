## Bitácora de IA


### Interacción 1: Módulo A (cámara)
- **Qué le pedí (prompt):** Le dije que estaba en la parte A (cámara) de mi práctica de Expo, que no entendía qué hacer, dónde poner el código y qué le faltaba. Después le pegué el ejemplo de la documentación de Expo Camera y le dije que me lo explicara.
- **Qué me dio (resumen en 1-2 líneas):** Explicacion de como se hace usa la camara, me explico como manejar los estados y me sugirio que lo dividiera como por pantallas.
- **Qué estaba mal o me faltó:** En su ejemplo agrupó "sin pedir" y "denegado" en una sola pantalla, aunque los estados correctos son los tres estados separados (sin pedir, aceptado y denegado).
- **Qué corregí o cambié yo:** Le indiqué que los tres estados debían ser distintos.También cambié la sintaxis de TypeScript del ejemplo de la documentación a JavaScript, porque mi proyecto usa la plantilla blank.
- **Qué aprendí:** Qué hace `cameraRef.current` y por qué se valida, la diferencia entre componente montado y cámara lista (`onCameraReady`), y cómo `useCameraPermissions` guarda y actualiza el permiso por sí solo.


### Interacción 2: Probar los estados del permiso en iPhone
- **Qué le pedí (prompt):** Le dije que mi código nunca pedía permiso y abría la cámara directo, y que en iPhone quería que el diálogo saliera cada vez.
- **Qué me dio (resumen en 1-2 líneas):** Explicó que el permiso pertenece a Expo Go y que iOS pregunta una sola vez, y propuso simular los estados en el código.
- **Qué estaba mal o me faltó:** La primera simulación no actualizaba la pantalla al tocar el botón, y mi intento de usarla me dio un error.
- **Qué corregí o cambié yo:** Pedí aclaración sobre `onPress` con el estado forzado y obtuve una versión con estado propio. Decidí simular los estados en lugar de reinstalar Expo Go cada vez.
- **Qué aprendí:** iOS recuerda la respuesta del permiso, `onPress` recibe una función (sin paréntesis) y cómo simular estados para probar pantallas.

### Interacción 3: Módulo B (ubicación)
- **Qué le pedí (prompt):** Le pase el codigo de el ejemplo y pedi explicaciones, y que faltaba, sin codigo, luego le pase lo que hice y pedi que me lo correigiera y pregunte que faltaba.
- **Qué me dio (resumen en 1-2 líneas):** Me explico como pedir los permiso, luego corriio mi falta de inidicadores de carga asi como el como mostrar el estado 
- **Qué estaba mal o me faltó:** Durante el proceso todo, pero al final lobre aprender 
- **Qué corregí o cambié yo:** Pues hice las cosas por mi cuenta, corregi mis errores y segui agregando lo que me faltaba
- **Qué aprendí:** Cómo pedir el permiso de ubicación en primer plano, que la precisión reportada no garantiza un error máximo, y que debo manejar estados, rechazo y fallos sin que la app se cierre.

### Interacción 4: Módulo C (brújula)
- **Qué le pedí (prompt):** Le pedí que corrigiera mi codigo, porque no sabia que estaba mal ni que estaba pasando
- **Qué me dio (resumen en 1-2 líneas):** Propuso el suevisado, no tenia el remove, y no estaba manehando bien las direcciones 
- **Qué estaba mal o me faltó:** Todo
- **Qué corregí o cambié yo:** Decidí no aplicar el filtro y dejar la lectura directa del sensor, y entendi las correcciones
- **Qué aprendí:** El magnetómetro tiene ruido e interferencia, el ángulo calculado es solo una orientación aproximada (no un rumbo geográfico calibrado), y las suscripciones deben limpiarse al salir de la pantalla.


### Interacción 5: Diseño en pantalla
- **Qué le pedí (prompt):** Le mandé una captura donde el título chocaba con la hora y el menú quedaba sobre la barra inferior del iPhone a pesar de tener implementado ya el SafeAreaView.
- **Qué me dio (resumen en 1-2 líneas):** Un `App.js` con `SafeAreaProvider` y `SafeAreaView` de `react-native-safe-area-context`.
- **Qué estaba mal o me faltó:** No se, pense que con el `SafeAreaView` era suficiente, que causó el problema.
- **Qué corregí o cambié yo:** Detecté el problema visual en el teléfono, lo reporté e instalé la librería y el `App.js` corregido.
- **Qué aprendí:** Probar en el dispositivo físico revela errores que el código no muestra, y las zonas seguras del iPhone requieren la librería adecuada.
