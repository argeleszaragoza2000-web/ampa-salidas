# AMPA - Asistente de permisos de salida del internado

Miniaplicación web estática para preparar correos de autorización en francés para Vie Scolaire.

## Modalidades incluidas

1. Vacaciones escolares
2. Salida puntual con pernocta
3. Salida puntual sin pernocta

## Cambios de esta versión

- Al seleccionar un tipo de permiso, se abre directamente la pantalla del formulario. Ya no hay botón “Siguiente” en la selección.
- El formulario se ha reorganizado para que en la misma pantalla aparezcan:
  - Datos del alumno
  - Datos del padre, madre o tutor legal
  - Datos específicos de la salida
- Las fechas vuelven a ser campos de calendario con `type="date"`.
- En el correo, las fechas se convierten a formato europeo `DD/MM/AAAA`.
- Las horas se mantienen como `type="time"`.
- Se ha eliminado del correo la frase “au format 24 h”.
- En salida puntual con pernocta se proponen por defecto:
  - Hora de salida: `18:30`
  - Hora de regreso: `16:00`
- Los botones de navegación se llaman “Volver” para poder corregir pantallas anteriores.
- Se mantiene la lógica de:
  - Pernocta con padres
  - Pernocta con otra persona
  - DNI opcional de la persona responsable
  - Salida sin pernocta con o sin acompañante

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilo visual compacto adaptado al AMPA |
| `script.js` | Validaciones, navegación y generación del correo |
| `TESTS.md` | Set de pruebas funcionales |
| `README.md` | Esta guía |

## Configuración obligatoria

En `script.js`, sustituir:

```js
const EMAIL_VIE_SCOLAIRE = "viescolaire@ejemplo.fr";
```

por el email real de Vie Scolaire.

## Nota sobre Gmail

La URL de Gmail incluye el email del tutor legal con `authuser`, pero Google no garantiza que una web externa pueda forzar siempre la cuenta exacta desde la que se abre el borrador. Por eso la pantalla de revisión incluye un aviso para que la familia compruebe la cuenta antes de enviar.

## Privacidad

No se usa base de datos, login ni backend. Los datos introducidos se procesan únicamente en el navegador para generar el correo.
