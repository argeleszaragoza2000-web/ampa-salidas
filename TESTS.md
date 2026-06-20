# Set de pruebas

## A. Carga inicial

| Nº | Prueba | Resultado esperado |
|---|---|---|
| A1 | Abrir `index.html` o la URL de GitHub Pages | Se muestra “Preparar una autorización de salida” |
| A2 | Pulsar “Comenzar” | Se muestra la selección del tipo de salida |
| A3 | No seleccionar tipo y pulsar “Siguiente” | Aparece pantalla de error indicando que debe seleccionarse un tipo |

## B. Datos básicos

| Nº | Prueba | Resultado esperado |
|---|---|---|
| B1 | Dejar nombre del alumno vacío | Error “Falta el nombre del alumno.” |
| B2 | Dejar curso vacío | Error “Falta el curso.” |
| B3 | Dejar nombre del tutor vacío | Error correspondiente |
| B4 | Dejar email del tutor vacío | Error correspondiente |
| B5 | Dejar teléfono vacío | Error correspondiente |
| B6 | Dejar documento de identidad vacío | Error correspondiente |
| B7 | Dejar email del alumno vacío | No debe bloquear el avance |

## C. Vacaciones escolares

| Nº | Prueba | Resultado esperado |
|---|---|---|
| C1 | Seleccionar “Vacaciones escolares” | Se muestran campos de salida, regreso, bus AMPA y checkbox 13:00 |
| C2 | Dejar fecha de salida vacía | Error “Falta la fecha de salida.” |
| C3 | Dejar hora de regreso vacía | Error “Falta la hora de regreso.” |
| C4 | No responder a “¿Usará el autobús del AMPA?” | Error específico |
| C5 | Marcar checkbox 13:00 | El correo incluye la frase de autorización de salida a las 13h00 |
| C6 | No marcar checkbox 13:00 | El correo no incluye esa frase |
| C7 | Completar todo correctamente | Se muestra revisión del correo en francés |

## D. Fin de semana con pernocta

| Nº | Prueba | Resultado esperado |
|---|---|---|
| D1 | Seleccionar “Fin de semana con pernocta” | Se muestran bloques “Fechas”, “Persona responsable” y “Motivo” |
| D2 | Dejar persona responsable vacía | Error específico |
| D3 | Dejar relación con alumno vacía | Error específico |
| D4 | Dejar teléfono responsable vacío | Error específico |
| D5 | Dejar documento responsable vacío | Error específico |
| D6 | No seleccionar motivo | Error específico |
| D7 | Seleccionar “Otro motivo” | Aparece campo “Redacte el motivo en francés” |
| D8 | Seleccionar “Otro motivo” y dejarlo vacío | Error específico |
| D9 | Seleccionar “No deseamos incluir motivo” | Aparece nota y el correo se genera sin motivo |
| D10 | Completar todo correctamente | Se muestra correo con salida con nuitée |

## E. Salida puntual sin pernocta

| Nº | Prueba | Resultado esperado |
|---|---|---|
| E1 | Seleccionar “Salida puntual sin pernocta” | Se muestran fecha, hora salida, hora regreso, acompañante, teléfono y motivo |
| E2 | Dejar hora de regreso vacía | Error “Falta la hora de regreso.” |
| E3 | Dejar acompañante vacío | Error específico |
| E4 | No seleccionar motivo | Error específico |
| E5 | Seleccionar “Otro motivo” | Aparece campo de motivo en francés |
| E6 | Seleccionar “No deseamos incluir motivo” | Aparece nota y el correo se genera sin motivo |
| E7 | Completar todo correctamente | Se muestra correo de salida temporal sin nuitée |

## F. Apertura de correo

| Nº | Prueba | Resultado esperado |
|---|---|---|
| F1 | Pulsar “Abrir en Gmail” | Se abre Gmail con destinatario, asunto y cuerpo completados |
| F2 | Pulsar “Abrir en Outlook” | Se abre Outlook con destinatario, asunto y cuerpo completados |
| F3 | Pulsar “Abrir en mi aplicación de correo” | Se abre la aplicación de correo del dispositivo si está configurada |
| F4 | Pulsar “Copiar asunto” | Se copia el asunto |
| F5 | Pulsar “Copiar texto” | Se copia el cuerpo del correo |
| F6 | Revisar cuenta antes de enviar | La familia debe comprobar visualmente que Gmail/Outlook usa su cuenta personal |

## G. Responsive e integración en Wix

| Nº | Prueba | Resultado esperado |
|---|---|---|
| G1 | Abrir en ordenador | El formulario se ve compacto, centrado y sin aspecto de app externa |
| G2 | Abrir en móvil | Las tarjetas y campos se apilan correctamente |
| G3 | Embeber en Wix con iframe | La herramienta carga dentro de la página Wix |
| G4 | Revisar altura del iframe en escritorio | No queda cortado |
| G5 | Revisar altura del iframe en móvil | No queda cortado |
