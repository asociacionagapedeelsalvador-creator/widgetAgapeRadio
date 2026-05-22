 Widget Ágape Radio (Documentación Técnica)

## Descripción Técnica

El proyecto "widgetAgapeRadio" implementa un reproductor de streaming de audio en vivo basado en HTML5 Audio API, construido con una arquitectura sencilla de tres capas:

- Capa de presentación (HTML)
- Capa de estilos (CSS)
- Capa de lógica (JavaScript)

El widget permite consumir una señal de radio en tiempo real desde un servidor de streaming (Icecast o Shoutcast) y reproducirla directamente en el navegador.

## Arquitectura

El flujo del sistema es el siguiente:

1. El navegador carga el archivo `widget.html`
2. Se aplican los estilos definidos en `css/styles.css`
3. El archivo `js/script.js` inicializa el reproductor
4. Se establece la conexión con el servidor de streaming
5. Se controla la reproducción mediante la API de audio

## Estructura de Archivos

```
widgetAgapeRadio/
│
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── img/
├── widget.html
├── README.md
└── LICENSE
```

## Integración del Widget

### Inclusión de dependencias

```html
<link rel="stylesheet" href="css/styles.css">
<script src="js/script.js"></script>
```

### Contenedor del reproductor

```html
<div id="agape-radio-widget"></div>
```

## Lógica de Reproducción

El núcleo del widget se basa en el elemento `HTMLAudioElement`:

```javascript
const audio = new Audio(STREAM_URL);
audio.play();
```

### Variables principales

```javascript
const STREAM_URL = "https://streaming.agaperadio.com/stream";
let isPlaying = false;
```

### Control de reproducción

```javascript
function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}
```

### Manejo de eventos

```javascript
audio.addEventListener('play', () => {
    console.log('Reproducción iniciada');
});

audio.addEventListener('pause', () => {
    console.log('Reproducción pausada');
});

audio.addEventListener('error', (e) => {
    console.error('Error en el stream', e);
});
```

## Configuración del Servidor de Streaming

El widget está diseñado para consumir streams tipo:

- Icecast
- Shoutcast

### Requisitos del stream

- Protocolo: HTTP o HTTPS
- Formato: MP3 o AAC
- Acceso público
- Soporte CORS habilitado

### Ejemplo de endpoint

```text
https://streaming.agaperadio.com:8000/live
```

## Consideraciones Técnicas

### Autoplay

Los navegadores modernos bloquean autoplay sin interacción del usuario:

```javascript
audio.play().catch(() => {
    console.log('Autoplay bloqueado');
});
```

### CORS

El servidor debe incluir encabezados:

```
Access-Control-Allow-Origin: *
```

### Buffering

El comportamiento depende del navegador y ancho de banda del usuario.

## Personalización

### CSS

- Colores institucionales
- Tamaño del widget
- Tipografía

### JavaScript

- Cambio de URL del stream
- Control de volumen
- Eventos personalizados

## Despliegue

1. Copiar archivos a servidor web
2. Ajustar rutas relativas
3. Validar conexión al stream
4. Probar en navegadores

## Implementación en Producción

Este widget ha sido desplegado en:

- https://agaperadio.com.sv/
- https://radioluzfm.com.sv/

## Compatibilidad

- Chrome
- Firefox
- Edge
- Safari

## Licencia

MIT

## Autor

Asociación Ágape de El Salvador
