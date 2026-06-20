# AMPA - Permiso de vacaciones escolares

Miniweb estática para preparar un correo de autorización de salida del internado en francés.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: diseño visual adaptado a la estética AMPA.
- `script.js`: validación, generación de correo y apertura en Gmail, Outlook o aplicación de correo.

## Configuración necesaria

En `script.js`, sustituir:

```js
const EMAIL_VIE_SCOLAIRE = "viescolaire@ejemplo.fr";
```

por el email real de Vie Scolaire.

## Privacidad

Esta versión no usa base de datos, login, backend ni almacenamiento persistente. Los datos introducidos se usan solo en el navegador para generar el texto del correo.
