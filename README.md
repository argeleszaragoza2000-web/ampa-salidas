# AMPA - Asistente de permisos de salida del internado

Miniaplicación web estática para preparar correos de autorización en francés para Vie Scolaire del internado del Collège / Lycée Climatique René Billères.

Incluye cinco ficheros: `index.html`, `styles.css`, `script.js`, `README.md` y `TESTS.md`.

## Cambios principales

- Email del alumno obligatorio.
- Datos obligatorios de los dos progenitores: nombre, DNI / Carte d’Identité y email.
- Copia automática al alumno y a ambos progenitores.
- Aviso previo al envío en rojo y negrita con recordatorio de adjuntar DNIs.
- Botones `Ir atrás` y `Borrar datos`.
- Correos en francés para vacaciones, salida con pernocta y salida sin pernocta.
- Fechas de salidas puntuales con día de la semana en francés.

## Cambiar email de Vie Scolaire

En `script.js`, cambiar:

```js
const EMAIL_VIE_SCOLAIRE = "sudafricakananga2009@gmail.com";
```

por el email real.

## Privacidad

No hay backend, base de datos, login, cookies propias ni almacenamiento local persistente. Los datos solo se usan en el navegador para preparar el correo.

## Adjuntos

La web no puede adjuntar automáticamente documentos. Las familias deben adjuntar manualmente en Gmail, Outlook o su aplicación de correo el DNI / Carte d’Identité de ambos progenitores y del alumno.

## Publicación

Subir los cinco ficheros a la raíz del repositorio de GitHub y publicar con GitHub Pages desde `Settings > Pages`.
