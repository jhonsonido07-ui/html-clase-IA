## Explicación del proyecto (Respuestas del taller)

### 1. ¿Qué representa un Turno y qué información decidiste no guardar?

`Turno` representa una solicitud de atención: su `id` único, el `nombre` de la persona, el `motivo` del turno y la `prioridad`. 

Se decidió **no guardar** el historial completo de la persona (edad, documento, teléfono, atenciones anteriores, hora de ingreso, etc.). Esto es una abstracción intencional: solo se conserva lo necesario para organizar la atención.

### 2. ¿Por qué la fila es un arreglo?

La fila se modela como `Turno[]` porque un arreglo mantiene el **orden de llegada** de cada turno. Eso permite saber que el primer elemento (`turnos[0]`) es quien llegó primero. Además permite recorrerlo con `map` y agregar o quitar elementos manteniendo su orden. Es la estructura ideal para una cola FIFO.

### 3. ¿Por qué `slice(1)` es preferible a mutar el estado con `shift()`?

React detecta los cambios comparando la **referencia** del estado. `Array.shift()` **modifica el arreglo original** (misma referencia), por lo que React puede no detectar el cambio y no redibujar la interfaz.

`Array.slice(1)` crea un **arreglo nuevo** (referencia distinta) sin el primer elemento, respetando la **inmutabilidad del estado**. Esto hace que React detecte el cambio y actualice la vista correctamente.

### 4. ¿Qué pasaría si atendieras siempre al último elemento?

En lugar de FIFO (primero en llegar, primero en atender) se aplicaría **LIFO** (último en llegar, primero en salir), como una pila. El último turno agregado sería el primero en atenderse. Esto rompería el orden de llegada y puede causar que las personas que llevan más tiempo esperando nunca sean atendidas (inanición).

### 5. ¿Qué cambiaría si agregas prioridad?

Deja de ser una cola FIFO pura y pasa a ser una **cola de prioridad**. En este proyecto, los turnos con prioridad `"urgente"` se colocan al frente de la fila, pero **agrupados en orden de llegada entre ellos**, antes de cualquier turno `"normal"`. 

Esto significa que un turno urgente pasa delante de todos los normales, pero dentro de los urgentes se sigue respetando su orden de llegada. Como consecuencia, los turnos normales pueden esperar más tiempo (posible inanición de los normales) si siguen llegando urgentes.