const EMAIL_VIE_SCOLAIRE = "viescolaire@ejemplo.fr";

const screens = {
  welcome: document.getElementById("screenWelcome"),
  type: document.getElementById("screenType"),
  form: document.getElementById("screenForm"),
  error: document.getElementById("screenError"),
  review: document.getElementById("screenReview"),
  done: document.getElementById("screenDone")
};

let selectedType = "";
let lastScreenBeforeError = "form";
let currentEmail = {
  to: "",
  cc: "",
  subject: "",
  body: ""
};

const typeLabels = {
  vacaciones: "Vacaciones escolares",
  pernocta: "Salida puntual con pernocta",
  puntual: "Salida puntual sin pernocta"
};

const reasonText = {
  sport: "participer à une activité extrascolaire sportive",
  course: "participer à une activité extrascolaire liée au cursus scolaire",
  activity: "participer à une activité extrascolaire",
  none: ""
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function value(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function selectedRadio(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function dateForEmail(id) {
  const dateValue = value(id);
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function timeForEmail(id) {
  const timeValue = value(id);
  if (!timeValue) return "";
  return timeValue.replace(":", "h");
}

function clearFieldErrors() {
  document.querySelectorAll(".field-error").forEach(element => {
    element.classList.remove("field-error");
  });
}

function markError(id) {
  const element = document.getElementById(id);
  if (element) element.classList.add("field-error");
}

function addRequiredError(errors, id, message) {
  if (!value(id)) {
    errors.push(message);
    markError(id);
  }
}

function addDateError(errors, id, missingMessage) {
  if (!value(id)) {
    errors.push(missingMessage);
    markError(id);
  }
}

function addTimeError(errors, id, missingMessage) {
  if (!value(id)) {
    errors.push(missingMessage);
    markError(id);
  }
}

function validateCommonFields() {
  const errors = [];

  addRequiredError(errors, "studentName", "Falta el nombre del alumno.");
  addRequiredError(errors, "studentClass", "Falta el curso.");
  addRequiredError(errors, "guardianName", "Falta el nombre del padre, madre o tutor legal.");
  addRequiredError(errors, "guardianEmail", "Falta el email del padre, madre o tutor legal.");
  addRequiredError(errors, "guardianPhone", "Falta el teléfono de contacto.");
  addRequiredError(errors, "guardianId", "Falta el documento de identidad.");

  return errors;
}

function validateForm() {
  clearFieldErrors();
  const errors = validateCommonFields();

  if (selectedType === "vacaciones") {
    addDateError(errors, "vacDepartureDate", "Falta la fecha de salida.");
    addTimeError(errors, "vacDepartureTime", "Falta la hora de salida.");
    addDateError(errors, "vacReturnDate", "Falta la fecha de regreso.");
    addTimeError(errors, "vacReturnTime", "Falta la hora de regreso.");

    if (!selectedRadio("vacUsesBus")) {
      errors.push("Debe indicar si usará el autobús del AMPA.");
      document.getElementById("vacBusBlock").classList.add("field-error");
    }
  }

  if (selectedType === "pernocta") {
    addDateError(errors, "overnightDepartureDate", "Falta la fecha de salida.");
    addTimeError(errors, "overnightDepartureTime", "Falta la hora de salida.");
    addDateError(errors, "overnightReturnDate", "Falta la fecha de regreso.");
    addTimeError(errors, "overnightReturnTime", "Falta la hora de regreso.");

    const responsibleType = selectedRadio("overnightResponsibleType");
    if (!responsibleType) {
      errors.push("Debe indicar si el alumno sale con sus padres o con otra persona.");
      document.getElementById("overnightResponsibleTypeBlock").classList.add("field-error");
    }

    if (responsibleType === "other") {
      addRequiredError(errors, "responsibleName", "Falta el nombre de la persona adulta responsable.");
      addRequiredError(errors, "responsibleRelation", "Falta la relación de la persona responsable con el alumno.");
      addRequiredError(errors, "responsiblePhone", "Falta el teléfono de la persona responsable.");
    }

    addRequiredError(errors, "overnightReason", "Debe seleccionar el motivo de la salida.");

    if (value("overnightReason") === "other") {
      addRequiredError(errors, "overnightOtherReason", "Si eligió “Otro motivo”, debe redactar el motivo en francés.");
    }
  }

  if (selectedType === "puntual") {
    addDateError(errors, "dayDate", "Falta la fecha.");
    addTimeError(errors, "dayDepartureTime", "Falta la hora de salida.");
    addTimeError(errors, "dayReturnTime", "Falta la hora de regreso.");
    addRequiredError(errors, "dayReason", "Debe seleccionar el motivo de la salida.");

    if (value("dayReason") === "other") {
      addRequiredError(errors, "dayOtherReason", "Si eligió “Otro motivo”, debe redactar el motivo en francés.");
    }

    const hasCompanion = selectedRadio("dayHasCompanion");
    if (!hasCompanion) {
      errors.push("Debe indicar si desea incluir una persona acompañante.");
      document.getElementById("dayCompanionBlock").classList.add("field-error");
    }

    if (hasCompanion === "yes") {
      addRequiredError(errors, "dayResponsibleName", "Falta el nombre de la persona acompañante.");
      addRequiredError(errors, "dayResponsiblePhone", "Falta el teléfono de la persona acompañante.");
    }
  }

  return errors;
}

function showErrors(errors, previousScreen) {
  lastScreenBeforeError = previousScreen;
  const errorList = document.getElementById("errorList");
  errorList.innerHTML = "";
  errors.forEach(error => {
    const item = document.createElement("li");
    item.textContent = error;
    errorList.appendChild(item);
  });
  showScreen("error");
}

function configureFormScreen() {
  document.getElementById("formTitle").textContent = typeLabels[selectedType] || "Datos del permiso";

  document.querySelectorAll(".details-block").forEach(block => block.classList.add("hidden"));

  if (selectedType === "vacaciones") {
    document.getElementById("vacacionesFields").classList.remove("hidden");
  }

  if (selectedType === "pernocta") {
    document.getElementById("pernoctaFields").classList.remove("hidden");
    if (!value("overnightDepartureTime")) document.getElementById("overnightDepartureTime").value = "18:30";
    if (!value("overnightReturnTime")) document.getElementById("overnightReturnTime").value = "16:00";
  }

  if (selectedType === "puntual") {
    document.getElementById("puntualFields").classList.remove("hidden");
  }
}

function commonData() {
  return {
    studentName: value("studentName"),
    studentClass: value("studentClass"),
    studentEmail: value("studentEmail"),
    guardianName: value("guardianName"),
    guardianEmail: value("guardianEmail"),
    guardianPhone: value("guardianPhone"),
    guardianId: value("guardianId")
  };
}

function buildVacationEmail(data) {
  const usesBus = selectedRadio("vacUsesBus");
  const authorize1300 = document.getElementById("authorize1300").checked;

  const subject = `Autorisation de sortie - ${data.studentName} - Vacances scolaires`;

  let body = `Madame, Monsieur,

Je soussigné(e) ${data.guardianName}, responsable légal(e) de l'élève ${data.studentName}, scolarisé(e) en ${data.studentClass}, autorise mon enfant à quitter l'internat dans le cadre des vacances scolaires.

Départ prévu :
- Date : ${dateForEmail("vacDepartureDate")}
- Heure : ${timeForEmail("vacDepartureTime")}

Retour prévu :
- Date : ${dateForEmail("vacReturnDate")}
- Heure : ${timeForEmail("vacReturnTime")}

Utilisation du bus de l'AMPA : ${usesBus}.`;

  if (authorize1300) {
    body += `

J'autorise également la sortie de l'établissement à 13h00, si cela est applicable.`;
  }

  body += `

Coordonnées du responsable légal :
- Nom et prénom : ${data.guardianName}
- Téléphone : ${data.guardianPhone}
- Email : ${data.guardianEmail}
- Pièce d'identité : ${data.guardianId}

Je vous remercie par avance de bien vouloir prendre en compte cette autorisation.

Cordialement,

${data.guardianName}`;

  return { subject, body };
}

function buildOvernightEmail(data) {
  const reason = value("overnightReason");
  const responsibleType = selectedRadio("overnightResponsibleType");

  const subject = `Autorisation de sortie ponctuelle avec nuitée - ${data.studentName}`;

  let body = `Madame, Monsieur,

Je soussigné(e) ${data.guardianName}, responsable légal(e) de l'élève ${data.studentName}, scolarisé(e) en ${data.studentClass}, autorise mon enfant à quitter l'internat pour une sortie ponctuelle avec nuitée.

Départ prévu :
- Date : ${dateForEmail("overnightDepartureDate")}
- Heure : ${timeForEmail("overnightDepartureTime")}

Retour prévu :
- Date : ${dateForEmail("overnightReturnDate")}
- Heure : ${timeForEmail("overnightReturnTime")}`;

  if (responsibleType === "parents") {
    body += `

Personne responsable : Parents`;
  }

  if (responsibleType === "other") {
    body += `

Personne adulte responsable pendant la sortie :
- Nom et prénom : ${value("responsibleName")}
- Relation avec l'élève : ${value("responsibleRelation")}
- Téléphone : ${value("responsiblePhone")}`;

    if (value("responsibleId")) {
      body += `
- Pièce d'identité : ${value("responsibleId")}`;
    }
  }

  if (reason === "other") {
    body += `

Motif de la sortie :
${value("overnightOtherReason")}`;
  } else if (reason !== "none") {
    body += `

Motif de la sortie :
Cette sortie est demandée afin de permettre à l'élève de ${reasonText[reason]}.`;
  }

  body += `

Coordonnées du responsable légal :
- Nom et prénom : ${data.guardianName}
- Téléphone : ${data.guardianPhone}
- Email : ${data.guardianEmail}
- Pièce d'identité : ${data.guardianId}

Je vous remercie par avance de bien vouloir prendre en compte cette autorisation.

Cordialement,

${data.guardianName}`;

  return { subject, body };
}

function buildDayEmail(data) {
  const reason = value("dayReason");
  const hasCompanion = selectedRadio("dayHasCompanion");

  const subject = `Autorisation de sortie ponctuelle sans nuitée - ${data.studentName}`;

  let body = `Madame, Monsieur,

Je soussigné(e) ${data.guardianName}, responsable légal(e) de l'élève ${data.studentName}, scolarisé(e) en ${data.studentClass}, autorise mon enfant à quitter temporairement l'établissement sans nuitée.

Sortie prévue :
- Date : ${dateForEmail("dayDate")}
- Heure de sortie : ${timeForEmail("dayDepartureTime")}
- Heure de retour : ${timeForEmail("dayReturnTime")}`;

  if (reason === "other") {
    body += `

Motif de la sortie :
${value("dayOtherReason")}`;
  } else if (reason !== "none") {
    body += `

Motif de la sortie :
Cette sortie est demandée afin de permettre à l'élève de ${reasonText[reason]}.`;
  }

  if (hasCompanion === "yes") {
    body += `

Personne accompagnante :
- Nom et prénom : ${value("dayResponsibleName")}
- Téléphone : ${value("dayResponsiblePhone")}`;
  }

  body += `

Coordonnées du responsable légal :
- Nom et prénom : ${data.guardianName}
- Téléphone : ${data.guardianPhone}
- Email : ${data.guardianEmail}
- Pièce d'identité : ${data.guardianId}

Je vous remercie par avance de bien vouloir prendre en compte cette autorisation.

Cordialement,

${data.guardianName}`;

  return { subject, body };
}

function buildEmail() {
  const data = commonData();
  let result;

  if (selectedType === "vacaciones") result = buildVacationEmail(data);
  if (selectedType === "pernocta") result = buildOvernightEmail(data);
  if (selectedType === "puntual") result = buildDayEmail(data);

  return {
    to: EMAIL_VIE_SCOLAIRE,
    cc: data.studentEmail,
    subject: result.subject,
    body: result.body
  };
}

function showReview(email) {
  document.getElementById("emailTo").textContent = email.to;
  document.getElementById("emailSubject").textContent = email.subject;
  document.getElementById("emailPreview").textContent = email.body;
  document.getElementById("copyStatus").textContent = "";
  showScreen("review");
}

function openUrl(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openGmail(email) {
  const guardianEmail = value("guardianEmail");
  const url = "https://mail.google.com/mail/?view=cm&fs=1"
    + `&to=${encodeURIComponent(email.to)}`
    + `&cc=${encodeURIComponent(email.cc)}`
    + `&su=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`
    + `&authuser=${encodeURIComponent(guardianEmail)}`;
  openUrl(url);
}

function openOutlook(email) {
  const url = "https://outlook.office.com/mail/deeplink/compose?"
    + `to=${encodeURIComponent(email.to)}`
    + `&cc=${encodeURIComponent(email.cc)}`
    + `&subject=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`;
  openUrl(url);
}

function openMailApp(email) {
  const url = `mailto:${encodeURIComponent(email.to)}`
    + `?cc=${encodeURIComponent(email.cc)}`
    + `&subject=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`;
  window.location.href = url;
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("copyStatus").textContent = successMessage;
  } catch (error) {
    document.getElementById("copyStatus").textContent = "No se ha podido copiar automáticamente.";
  }
}

function resetAll() {
  document.querySelectorAll("form").forEach(form => form.reset());
  document.querySelectorAll(".type-card").forEach(card => card.classList.remove("selected"));
  document.getElementById("overnightOtherResponsibleFields").classList.add("hidden");
  document.getElementById("dayCompanionFields").classList.add("hidden");
  document.getElementById("overnightOtherReasonWrapper").classList.add("hidden");
  document.getElementById("dayOtherReasonWrapper").classList.add("hidden");
  document.getElementById("overnightNoReasonNote").classList.add("hidden");
  document.getElementById("dayNoReasonNote").classList.add("hidden");
  clearFieldErrors();
  selectedType = "";
  currentEmail = { to: "", cc: "", subject: "", body: "" };
}

document.getElementById("startButton").addEventListener("click", () => showScreen("type"));
document.getElementById("typeBack").addEventListener("click", () => showScreen("welcome"));
document.getElementById("formBack").addEventListener("click", () => showScreen("type"));

document.querySelectorAll(".type-card").forEach(card => {
  card.addEventListener("click", () => {
    selectedType = card.dataset.type;
    document.querySelectorAll(".type-card").forEach(item => item.classList.remove("selected"));
    card.classList.add("selected");
    configureFormScreen();
    showScreen("form");
  });
});

document.getElementById("permissionForm").addEventListener("submit", event => {
  event.preventDefault();
  const errors = validateForm();

  if (errors.length > 0) {
    showErrors(errors, "form");
    return;
  }

  currentEmail = buildEmail();
  showReview(currentEmail);
});

document.getElementById("backToComplete").addEventListener("click", () => showScreen(lastScreenBeforeError));
document.getElementById("reviewBack").addEventListener("click", () => showScreen("form"));

document.getElementById("openGmail").addEventListener("click", () => openGmail(currentEmail));
document.getElementById("openOutlook").addEventListener("click", () => openOutlook(currentEmail));
document.getElementById("openMailApp").addEventListener("click", () => openMailApp(currentEmail));

document.getElementById("copySubject").addEventListener("click", () => copyText(currentEmail.subject, "Asunto copiado."));
document.getElementById("copyBody").addEventListener("click", () => copyText(currentEmail.body, "Texto copiado."));

document.getElementById("finishButton").addEventListener("click", () => showScreen("done"));
document.getElementById("restartButton").addEventListener("click", () => {
  resetAll();
  showScreen("welcome");
});

document.querySelectorAll('input[name="overnightResponsibleType"]').forEach(input => {
  input.addEventListener("change", () => {
    const type = selectedRadio("overnightResponsibleType");
    document.getElementById("overnightOtherResponsibleFields").classList.toggle("hidden", type !== "other");
  });
});

document.querySelectorAll('input[name="dayHasCompanion"]').forEach(input => {
  input.addEventListener("change", () => {
    const hasCompanion = selectedRadio("dayHasCompanion");
    document.getElementById("dayCompanionFields").classList.toggle("hidden", hasCompanion !== "yes");
  });
});

document.getElementById("overnightReason").addEventListener("change", () => {
  const reason = value("overnightReason");
  document.getElementById("overnightOtherReasonWrapper").classList.toggle("hidden", reason !== "other");
  document.getElementById("overnightNoReasonNote").classList.toggle("hidden", reason !== "none");
});

document.getElementById("dayReason").addEventListener("change", () => {
  const reason = value("dayReason");
  document.getElementById("dayOtherReasonWrapper").classList.toggle("hidden", reason !== "other");
  document.getElementById("dayNoReasonNote").classList.toggle("hidden", reason !== "none");
});
