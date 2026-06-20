# AMPA - Asistente de permisos de salida del internado

Miniaplicación web estática para preparar correos de autorización en francés para Vie Scolaire.

## Modalidades incluidas

1. Vacaciones escolares
2. Salida puntual con pernocta
3. Salida puntual sin pernocta

## Cambios de esta versión

- La antigua opción “Fin de semana con pernocta” se llama ahora “Salida puntual con pernocta”.
- Las fechas se introducen en formato europeo `DD/MM/AAAA`.
- Las horas se introducen en formato 24 h.
- En salida puntual con pernocta se proponen por defecto:
  - Hora de salida: `18:30`
  - Hora de regreso: `16:00`
- En salida puntual con pernocta se puede indicar si el alumno sale con sus padres o con otra persona.
- Si sale con sus padres, el correo incluye `Personne responsable : Parents`.
- Si sale con otra persona, se solicitan sus datos.
- El documento de identidad de la persona responsable en pernocta es opcional.
- En salida puntual sin pernocta se puede decidir si se incluye persona acompañante.
- Si no se incluye acompañante, el correo no menciona acompañante.

## Archivos

| Archivo | Función |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilo visual compacto adaptado al AMPA |
| `script.js` | Validaciones, lógica del formulario y generación del correo |
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
