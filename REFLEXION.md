La primera dificultad fue probar los estados del permiso de cámara. Después de aceptar el permiso en el iPhone, no pude volver al 
estado inicial sin desinstalar Expo Go, porque iOS recuerda la respuesta y no vuelve a mostrar el diálogo. Como no era viable 
reinstalar cada vez, simulé en el código los estados “sin pedir” y “denegado” para verificar sus pantallas. Por eso esos dos estados se 
probaron simulados y no con el diálogo real del sistema. En ubicación manejé los estados pendiente, concedido y denegado, y con 
canAskAgain muestro un botón para abrir los ajustes cuando el sistema ya no permite volver a preguntar

La segunda dificultad fue la brújula: aunque el teléfono estuviera quieto, los valores de X, Y y Z cambiaban constantemente. Esto se 
debe al ruido del magnetómetro y a la interferencia de metales o electrónica cercana. Identifiqué que podía aplicarse un filtro de 
suavizado, pero decidí no incluirlo y documentarlo como limitación.

Respecto a la diferencia, el magnetómetro mide el campo magnético terrestre y entrega una orientación relativa al norte magnético, sin 
necesitar señal externa, es sensible a la inclinación y a interferencias. El GPS calcula la posición (latitud y longitud) a partir de 
señales de satélites, y no indica hacia dónde apunta el teléfono. Son mediciones independientes.

