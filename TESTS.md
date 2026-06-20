# Set de pruebas

## A. Carga inicial y navegación

| Nº | Prueba | Resultado esperado |
|---|---|---|
| A1 | Abrir `index.html` o la URL de GitHub Pages | Se muestra “Preparar una autorización de salida” |
| A2 | Pulsar “Comenzar” | Se muestra la selección del tipo de salida |
| A3 | Seleccionar “Vacaciones escolares” | Se abre directamente el formulario de vacaciones |
| A4 | Seleccionar “Salida puntual con pernocta” | Se abre directamente el formulario de pernocta |
| A5 | Seleccionar “Salida puntual sin pernocta” | Se abre directamente el formulario sin pernocta |
| A6 | Pulsar “Volver” desde el formulario | Regresa a la selección de tipo |
| A7 | Pulsar “Volver” desde revisión | Regresa al formulario para modificar datos |

## B. Datos comunes

| Nº | Prueba | Resultado esperado |
|---|---|---|
| B1 | Dejar nombre del alumno vacío | Error “Falta el nombre del alumno.” |
| B2 | Dejar curso vacío | Error “Falta el curso.” |
| B3 | Dejar nombre del tutor vacío | Error correspondiente |
| B4 | Dejar email del tutor vacío | Error correspondiente |
| B5 | Dejar teléfono vacío | Error correspondiente |
| B6 | Dejar documento de identidad del tutor vacío | Error correspondiente |
| B7 | Dejar email del alumno vacío | No bloquea el avance |

## C. Fechas y horas

| Nº | Prueba | Resultado esperado |
|---|---|---|
| C1 | Pulsar un campo de fecha | Se abre selector de calendario del navegador |
| C2 | Seleccionar una fecha | El campo acepta la fecha |
| C3 | Generar correo con fecha seleccionada | La fecha aparece en el correo como DD/MM/AAAA |
| C4 | Introducir hora `18:30` | El campo acepta la hora |
| C5 | Generar correo | El correo muestra la hora como `18h30` y no incluye “au format 24 h” |
| C6 | En navegador que muestre AM/PM | No se fuerza cambio visual del campo; el correo sí convierte la hora a formato francés `HHhMM` |

## D. Vacaciones escolares

| Nº | Prueba | Resultado esperado |
|---|---|---|
| D1 | Seleccionar “Vacaciones escolares” | En la misma pantalla aparecen alumno, tutor legal y datos de vacaciones |
| D2 | No responder a “¿Usará el autobús del AMPA?” | Error específico |
| D3 | Marcar checkbox 13:00 | El correo incluye la frase de autorización de salida a las 13h00 |
| D4 | No marcar checkbox 13:00 | El correo no incluye esa frase |
| D5 | Completar todo correctamente | Se muestra revisión del correo en francés |
| D6 | Revisar correo | No aparece “format 24 h” ni “au format 24 h” |

## E. Salida puntual con pernocta

| Nº | Prueba | Resultado esperado |
|---|---|---|
| E1 | Seleccionar “Salida puntual con pernocta” | En la misma pantalla aparecen alumno, tutor legal, fechas, responsable y motivo |
| E2 | Entrar en la pantalla | Hora de salida propuesta `18:30` y hora de regreso propuesta `16:00` |
| E3 | Modificar las horas propuestas | El correo usa las horas modificadas y las muestra como `HHhMM` |
| E4 | No indicar si sale con padres u otra persona | Error específico |
| E5 | Seleccionar “Sale con sus padres” | No se muestran campos de otra persona |
| E6 | Seleccionar “Sale con sus padres” y generar correo | El correo incluye exactamente `Personne responsable : Parents` en una sola línea |
| E7 | Seleccionar “Sale con otra persona” | Se abren campos de persona responsable |
| E8 | Dejar nombre de otra persona vacío | Error específico |
| E9 | Dejar relación vacía | Error específico |
| E10 | Dejar teléfono vacío | Error específico |
| E11 | Dejar DNI de otra persona vacío | No bloquea el avance |
| E12 | Rellenar DNI de otra persona | El correo lo incluye |
| E13 | Seleccionar “Otro motivo” | Aparece campo de motivo en francés |
| E14 | Seleccionar “Otro motivo” y dejarlo vacío | Error específico |
| E15 | Seleccionar “No deseamos incluir motivo” | Aparece nota y el correo no incluye motivo |
| E16 | Revisar correo | No aparece “format 24 h” ni “au format 24 h” |

## F. Salida puntual sin pernocta

| Nº | Prueba | Resultado esperado |
|---|---|---|
| F1 | Seleccionar “Salida puntual sin pernocta” | En la misma pantalla aparecen alumno, tutor legal, datos de salida y acompañante |
| F2 | Ver sección de acompañante | Aparece pregunta “¿Desea incluir una persona acompañante?” |
| F3 | No contestar si incluye acompañante | Error específico |
| F4 | Seleccionar “No” en acompañante | No se muestran campos de acompañante |
| F5 | Seleccionar “No” y generar correo | El correo no menciona acompañante |
| F6 | Seleccionar “Sí” en acompañante | Se abren campos de nombre y teléfono |
| F7 | Seleccionar “Sí” y dejar nombre vacío | Error específico |
| F8 | Seleccionar “Sí” y dejar teléfono vacío | Error específico |
| F9 | Seleccionar “Sí” y completar acompañante | El correo incluye “Personne accompagnante” |
| F10 | Seleccionar “Otro motivo” | Aparece campo de motivo en francés |
| F11 | Seleccionar “No deseamos incluir motivo” | Aparece nota y el correo no incluye motivo |
| F12 | Revisar correo | Las horas aparecen como `HHhMM` y no aparece “format 24 h” ni “au format 24 h” |

## G. Apertura de correo

| Nº | Prueba | Resultado esperado |
|---|---|---|
| G1 | Pulsar “Abrir en Gmail” | Se abre Gmail con destinatario, asunto y cuerpo completados |
| G2 | Pulsar “Abrir en Outlook” | Se abre Outlook con destinatario, asunto y cuerpo completados |
| G3 | Pulsar “Abrir en mi aplicación de correo” | Se abre la aplicación de correo del dispositivo si está configurada |
| G4 | Pulsar “Copiar asunto” | Se copia el asunto |
| G5 | Pulsar “Copiar texto” | Se copia el cuerpo del correo |
| G6 | Revisar cuenta antes de enviar | La familia comprueba visualmente que Gmail/Outlook usa su cuenta personal |

## H. Responsive e integración en Wix

| Nº | Prueba | Resultado esperado |
|---|---|---|
| H1 | Abrir en ordenador | El formulario se ve compacto, centrado y sin aspecto de app externa |
| H2 | Abrir en móvil | Las tarjetas y campos se apilan correctamente |
| H3 | Embeber en Wix con iframe | La herramienta carga dentro de la página Wix |
| H4 | Revisar altura del iframe en escritorio | No queda cortado |
| H5 | Revisar altura del iframe en móvil | No queda cortado |
