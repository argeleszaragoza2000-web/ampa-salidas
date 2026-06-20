# AMPA - Asistente de permisos de salida del internado

Miniaplicación web estática para preparar correos de autorización en francés para Vie Scolaire.

## Modalidades incluidas

1. Vacaciones escolares
2. Fin de semana con pernocta
3. Salida puntual sin pernocta

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
