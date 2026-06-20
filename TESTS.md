# Set de pruebas funcionales

## A. Navegación

| Nº | Prueba | Resultado esperado |
|---|---|---|
| A1 | Abrir la página | Se muestra la pantalla de bienvenida |
| A2 | Pulsar “Comenzar” | Se muestra la selección de tipo |
| A3 | Pulsar “Vacaciones escolares” | Se abre directamente el formulario de vacaciones |
| A4 | Pulsar “Salida puntual con pernocta” | Se abre directamente el formulario de pernocta |
| A5 | Pulsar “Salida puntual sin pernocta” | Se abre directamente el formulario sin pernocta |
| A6 | Pulsar “Volver” desde el formulario | Vuelve a la selección de tipo |
| A7 | Pulsar “Volver” desde revisión | Vuelve al formulario con los datos introducidos |
| A8 | Pulsar “Volver al inicio” desde pantalla final | Vuelve a bienvenida y limpia el formulario |

## B. Campos obligatorios comunes

| Nº | Prueba | Resultado esperado |
|---|---|---|
| B1 | Dejar nombre del alumno vacío | Error “Falta el nombre del alumno.” |
| B2 | Dejar curso vacío | Error “Falta el curso.” |
| B3 | Dejar email del alumno vacío | No bloquea el avance |
| B4 | Dejar nombre del tutor legal vacío | Error correspondiente |
| B5 | Dejar email del tutor legal vacío | Error correspondiente |
| B6 | Dejar teléfono de contacto vacío | Error correspondiente |
| B7 | Dejar documento de identidad del tutor legal vacío | Error correspondiente |

## C. Vacaciones escolares

| Nº | Prueba | Resultado esperado |
|---|---|---|
| C1 | Dejar fecha de salida vacía | Error “Falta la fecha de salida.” |
| C2 | Dejar hora de salida vacía | Error “Falta la hora de salida.” |
| C3 | Dejar fecha de regreso vacía | Error “Falta la fecha de regreso.” |
| C4 | Dejar hora de regreso vacía | Error “Falta la hora de regreso.” |
| C5 | No indicar si usará autobús AMPA | Error específico |
| C6 | Marcar autorización 13:00 | El correo incluye la autorización de salida a las 13h00 |
| C7 | No marcar autorización 13:00 | El correo no incluye esa frase |
| C8 | Generar correo | Las fechas aparecen como `DD/MM/AAAA` |
| C9 | Generar correo | Las horas aparecen como `18h30`, `16h00` |
| C10 | Revisar correo | No aparece `format 24 h` ni `au format 24 h` |

## D. Salida puntual con pernocta

| Nº | Prueba | Resultado esperado |
|---|---|---|
| D1 | Abrir modalidad | Hora de salida propuesta `18:30` |
| D2 | Abrir modalidad | Hora de regreso propuesta `16:00` |
| D3 | Modificar horas | El correo usa las horas modificadas |
| D4 | No indicar si sale con padres u otra persona | Error específico |
| D5 | Seleccionar “Sale con sus padres” | No se muestran campos de otra persona |
| D6 | Generar con padres | El correo incluye `Personne responsable : Parents` |
| D7 | Seleccionar “Sale con otra persona” | Se muestran campos de persona responsable |
| D8 | Dejar nombre de persona responsable vacío | Error correspondiente |
| D9 | Dejar relación vacía | Error correspondiente |
| D10 | Dejar teléfono vacío | Error correspondiente |
| D11 | Dejar documento de identidad de la persona responsable vacío | No bloquea el avance |
| D12 | Rellenar documento de identidad | El correo lo incluye |
| D13 | No seleccionar motivo | Error correspondiente |
| D14 | Seleccionar “Otro motivo” | Aparece campo “Redacte el motivo en francés” |
| D15 | Seleccionar “Otro motivo” y dejarlo vacío | Error específico |
| D16 | Seleccionar “No deseamos incluir motivo” | Aparece nota y el correo no incluye bloque de motivo |
| D17 | Generar correo | Fechas en `DD/MM/AAAA` |
| D18 | Generar correo | Horas en formato `18h30`, `16h00` |
| D19 | Revisar correo | No aparece `format 24 h` ni `au format 24 h` |

## E. Salida puntual sin pernocta

| Nº | Prueba | Resultado esperado |
|---|---|---|
| E1 | Abrir modalidad | Hora de salida propuesta `17:00` |
| E2 | Abrir modalidad | Hora de regreso propuesta `20:30` |
| E3 | Modificar horas | El correo usa las horas modificadas |
| E4 | Dejar fecha vacía | Error “Falta la fecha.” |
| E5 | Dejar hora de salida vacía | Error correspondiente |
| E6 | Dejar hora de regreso vacía | Error correspondiente |
| E7 | No seleccionar motivo | Error correspondiente |
| E8 | Seleccionar “Otro motivo” | Aparece campo “Redacte el motivo en francés” |
| E9 | Seleccionar “Otro motivo” y dejarlo vacío | Error específico |
| E10 | Seleccionar “No deseamos incluir motivo” | Aparece nota y el correo no incluye bloque de motivo |
| E11 | No indicar si desea acompañante | Error específico |
| E12 | Seleccionar “No” en acompañante | No se muestran campos de acompañante |
| E13 | Generar con acompañante “No” | El correo no menciona persona acompañante |
| E14 | Seleccionar “Sí” en acompañante | Se muestran campos de acompañante |
| E15 | Dejar nombre de acompañante vacío | Error correspondiente |
| E16 | Dejar teléfono de acompañante vacío | Error correspondiente |
| E17 | Generar con acompañante | El correo incluye `Personne accompagnante` |
| E18 | Generar correo | Fechas en `DD/MM/AAAA` |
| E19 | Generar correo | Horas en formato `17h00`, `20h30` |
| E20 | Revisar correo | No aparece `format 24 h` ni `au format 24 h` |

## F. Revisión y apertura de correo

| Nº | Prueba | Resultado esperado |
|---|---|---|
| F1 | Generar correo | Se muestra Para, Asunto y vista previa completa |
| F2 | Pulsar Gmail | Se abre Gmail con destinatario, cc, asunto y cuerpo |
| F3 | Pulsar Outlook | Se abre Outlook con destinatario, cc, asunto y cuerpo |
| F4 | Pulsar “Abrir en mi aplicación de correo” | Se abre `mailto:` si el dispositivo tiene cliente de correo |
| F5 | Pulsar “Copiar asunto” | Se copia el asunto |
| F6 | Pulsar “Copiar texto” | Se copia el cuerpo |
| F7 | Revisar aviso de Gmail/Outlook | Se indica que la familia debe comprobar la cuenta activa |

## G. Móvil y Wix

| Nº | Prueba | Resultado esperado |
|---|---|---|
| G1 | Abrir en móvil | El contenido se apila en una columna |
| G2 | Abrir en ordenador | Se ve compacto y centrado |
| G3 | Insertar en Wix con Embed a site | La aplicación carga dentro de Wix |
| G4 | Revisar iframe en escritorio | No queda cortado |
| G5 | Revisar iframe en móvil | No queda cortado |
