# AMPA - Asistente de permisos de salida del internado

Miniaplicación web estática para preparar correos de autorización en francés para Vie Scolaire.

Está pensada para alojarse gratis en GitHub Pages e insertarse en Wix mediante un iframe o un bloque “Embed a site”.

## Qué incluye

| Fichero | Función |
|---|---|
| `index.html` | Estructura de la aplicación |
| `styles.css` | Diseño visual |
| `script.js` | Lógica, validaciones y generación del correo |
| `README.md` | Instrucciones de configuración y publicación |
| `TESTS.md` | Set de pruebas funcionales |

## Modalidades incluidas

| Modalidad |
|---|
| Vacaciones escolares |
| Salida puntual con pernocta |
| Salida puntual sin pernocta |

## Privacidad

La aplicación no utiliza backend, base de datos, login, historial, cookies propias ni almacenamiento local persistente.

Los datos introducidos se utilizan únicamente en el navegador para preparar el correo. El AMPA no recibe ni conserva estos datos desde esta herramienta.

## Cambiar el email de Vie Scolaire

Abra `script.js` y sustituya esta línea:

```js
const EMAIL_VIE_SCOLAIRE = "viescolaire@ejemplo.fr";
```

por el email real de Vie Scolaire.

## Formato de fecha y hora

En pantalla:

| Campo | Tipo |
|---|---|
| Fechas | Calendario `type="date"` |
| Horas | Selector horario `type="time"` |

En el correo:

| Dato | Formato |
|---|---|
| Fecha | `DD/MM/AAAA` |
| Hora | `18h30`, `16h00` |

No se incluye en el correo ninguna frase como `format 24 h` o `au format 24 h`.

## Nota sobre Gmail

El botón de Gmail abre una ventana de composición con destinatario, copia, asunto y cuerpo.

El enlace incluye `authuser` con el email del tutor legal, pero Google no garantiza que una web externa pueda forzar siempre la cuenta exacta. La familia debe comprobar visualmente que el correo se abre desde su cuenta personal antes de enviarlo.

## Subir a GitHub

1. Crear un repositorio público en GitHub.
2. Subir estos ficheros a la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `TESTS.md`
3. Confirmar los cambios con `Commit changes`.

## Publicar con GitHub Pages

1. Entrar en `Settings`.
2. Abrir `Pages`.
3. En `Source`, elegir `Deploy from a branch`.
4. En `Branch`, elegir `main`.
5. En carpeta, elegir `/root`.
6. Guardar.

GitHub generará una URL similar a:

```text
https://usuario.github.io/nombre-del-repositorio/
```

## Embeber en Wix

En Wix, añadir un bloque de tipo `Embed a site` o `Embed HTML`.

Con `Embed a site`, pegar directamente la URL de GitHub Pages.

Con `Embed HTML`, se puede usar:

```html
<iframe
  src="https://usuario.github.io/nombre-del-repositorio/"
  width="100%"
  height="1300"
  style="border:0; background:#FBF5EF;"
  title="Asistente de permisos de salida del internado">
</iframe>
```

Revisar la altura en escritorio y móvil para evitar que el formulario quede cortado.
