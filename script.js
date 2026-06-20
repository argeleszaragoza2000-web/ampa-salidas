const EMAIL_VIE_SCOLAIRE = "sudafricakananga2009@gmail.com";

const screens = {
  welcome: document.getElementById("screenWelcome"),
  type: document.getElementById("screenType"),
  form: document.getElementById("screenForm"),
  error: document.getElementById("screenError"),
  review: document.getElementById("screenReview"),
  done: document.getElementById("screenDone")
};

const permissionTitles = {
  vacaciones: "Vacaciones escolares",
  pernocta: "Salida puntual con pernocta",
  sinPernocta: "Salida puntual sin pernocta"
};

const reasonSentences = {
  sport: "Cette sortie est demandée afin de permettre à l'élève de participer à une activité extrascolaire sportive.",
  course: "Cette sortie est demandée afin de permettre à l'élève de participer à une activité extrascolaire liée au cursus scolaire.",
  activity: "Cette sortie est demandée afin de permettre à l'élève de participer à une activité extrascolaire."
};

let selectedPermissionType = "";
let previousScreenForError = "form";
let generatedEmail = {
  to: "",
  cc: "",
  subject: "",
  body: ""
};

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[screenName].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function getCheckedValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : "";
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((element) => {
    element.classList.remove("field-error");
  });
}

function markField(id) {
  const element = document.getElementById(id);
  if (element) element.classList.add("field-error");
}

function addRequired(errors, id, message) {
  if (!getValue(id)) {
    errors.push(message);
    markField(id);
  }
}

function addRequiredChoice(errors, blockId, radioName, message) {
  if (!getCheckedValue(radioName)) {
    errors.push(message);
    markField(blockId);
  }
}

function formatDateForEmail(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function formatTimeForEmail(timeValue) {
  if (!timeValue) return "";
  const [hour, minute] = timeValue.split(":");
  return `${hour}h${minute}`;
}

function resetPermissionSections() {
  document.querySelectorAll(".permission-specific").forEach((section) => {
    section.classList.add("hidden");
  });
}

function openFormForType(permissionType) {
  selectedPermissionType = permissionType;

  document.querySelectorAll(".type-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.permissionType === permissionType);
  });

  resetPermissionSections();
  setText("formTitle", permissionTitles[permissionType]);

  if (permissionType === "vacaciones") {
    document.getElementById("vacacionesSection").classList.remove("hidden");
  }

  if (permissionType === "pernocta") {
    document.getElementById("pernoctaSection").classList.remove("hidden");
    if (!getValue("overnightDepartureTime")) document.getElementById("overnightDepartureTime").value = "18:30";
    if (!getValue("overnightReturnTime")) document.getElementById("overnightReturnTime").value = "16:00";
  }

  if (permissionType === "sinPernocta") {
    document.getElementById("sinPernoctaSection").classList.remove("hidden");
    if (!getValue("dayDepartureTime")) document.getElementById("dayDepartureTime").value = "17:00";
    if (!getValue("dayReturnTime")) document.getElementById("dayReturnTime").value = "20:30";
  }

  showScreen("form");
}

function getCommonData() {
  return {
    studentName: getValue("studentName"),
    studentClass: getValue("studentClass"),
    studentEmail: getValue("studentEmail"),
    guardianName: getValue("guardianName"),
    guardianEmail: getValue("guardianEmail"),
    guardianPhone: getValue("guardianPhone"),
    guardianId: getValue("guardianId")
  };
}

function validateCommonFields(errors) {
  addRequired(errors, "studentName", "Falta el nombre del alumno.");
  addRequired(errors, "studentClass", "Falta el curso.");
  addRequired(errors, "guardianName", "Falta el nombre del padre, madre o tutor legal.");
  addRequired(errors, "guardianEmail", "Falta el email del padre, madre o tutor legal.");
  addRequired(errors, "guardianPhone", "Falta el teléfono de contacto.");
  addRequired(errors, "guardianId", "Falta el documento de identidad.");
}

function validateVacaciones(errors) {
  addRequired(errors, "vacDepartureDate", "Falta la fecha de salida.");
  addRequired(errors, "vacDepartureTime", "Falta la hora de salida.");
  addRequired(errors, "vacReturnDate", "Falta la fecha de regreso.");
  addRequired(errors, "vacReturnTime", "Falta la hora de regreso.");
  addRequiredChoice(errors, "vacBusChoice", "vacUsesBus", "Debe indicar si usará el autobús del AMPA.");
}

function validatePernocta(errors) {
  addRequired(errors, "overnightDepartureDate", "Falta la fecha de salida.");
  addRequired(errors, "overnightDepartureTime", "Falta la hora de salida.");
  addRequired(errors, "overnightReturnDate", "Falta la fecha de regreso.");
  addRequired(errors, "overnightReturnTime", "Falta la hora de regreso.");
  addRequiredChoice(errors, "overnightResponsibleChoice", "overnightResponsibleType", "Debe indicar si el alumno sale con sus padres o con otra persona.");

  if (getCheckedValue("overnightResponsibleType") === "other") {
    addRequired(errors, "overnightResponsibleName", "Falta el nombre de la persona adulta responsable.");
    addRequired(errors, "overnightResponsibleRelation", "Falta la relación de la persona responsable con el alumno.");
    addRequired(errors, "overnightResponsiblePhone", "Falta el teléfono de la persona responsable.");
  }

  addRequired(errors, "overnightReason", "Debe seleccionar el motivo de la salida.");

  if (getValue("overnightReason") === "other") {
    addRequired(errors, "overnightOtherReason", "Si eligió “Otro motivo”, debe redactar el motivo en francés.");
  }
}

function validateSinPernocta(errors) {
  addRequired(errors, "dayDate", "Falta la fecha.");
  addRequired(errors, "dayDepartureTime", "Falta la hora de salida.");
  addRequired(errors, "dayReturnTime", "Falta la hora de regreso.");
  addRequired(errors, "dayReason", "Debe seleccionar el motivo de la salida.");

  if (getValue("dayReason") === "other") {
    addRequired(errors, "dayOtherReason", "Si eligió “Otro motivo”, debe redactar el motivo en francés.");
  }

  addRequiredChoice(errors, "dayCompanionChoice", "dayHasCompanion", "Debe indicar si desea incluir una persona acompañante.");

  if (getCheckedValue("dayHasCompanion") === "yes") {
    addRequired(errors, "dayCompanionName", "Falta el nombre de la persona acompañante.");
    addRequired(errors, "dayCompanionPhone", "Falta el teléfono de la persona acompañante.");
  }
}

function validateForm() {
  clearErrors();
  const errors = [];

  validateCommonFields(errors);

  if (selectedPermissionType === "vacaciones") {
    validateVacaciones(errors);
  } else if (selectedPermissionType === "pernocta") {
    validatePernocta(errors);
  } else if (selectedPermissionType === "sinPernocta") {
    validateSinPernocta(errors);
  } else {
    errors.push("Debe seleccionar un tipo de salida.");
  }

  return errors;
}

function showErrors(errors) {
  const list = document.getElementById("errorList");
  list.innerHTML = "";

  errors.forEach((errorText) => {
    const item = document.createElement("li");
    item.textContent = errorText;
    list.appendChild(item);
  });

  previousScreenForError = "form";
  showScreen("error");
}

function buildReasonBlock(reasonId, otherReasonText) {
  if (reasonId === "none") return "";

  if (reasonId === "other") {
    return `

Motif de la sortie :
${otherReasonText}`;
  }

  if (reasonSentences[reasonId]) {
    return `

Motif de la sortie :
${reasonSentences[reasonId]}`;
  }

  return "";
}

function buildVacationEmail(data) {
  const subject = `Autorisation de sortie - ${data.studentName} - Vacances scolaires`;

  let body = `Madame, Monsieur,

Je soussigné(e) ${data.guardianName}, responsable légal(e) de l'élève ${data.studentName}, scolarisé(e) en ${data.studentClass}, autorise mon enfant à quitter l'internat dans le cadre des vacances scolaires.

Départ prévu :
- Date : ${formatDateForEmail(getValue("vacDepartureDate"))}
- Heure : ${formatTimeForEmail(getValue("vacDepartureTime"))}

Retour prévu :
- Date : ${formatDateForEmail(getValue("vacReturnDate"))}
- Heure : ${formatTimeForEmail(getValue("vacReturnTime"))}

Utilisation du bus de l'AMPA : ${getCheckedValue("vacUsesBus")}.`;

  if (document.getElementById("vacAuthorize1300").checked) {
    body += `

J'autorise également la sortie de l'établissement à 13h00, si cela est applicable.`;
  }

  body += buildLegalGuardianBlock(data);

  return { subject, body };
}

function buildOvernightEmail(data) {
  const subject = `Autorisation de sortie ponctuelle avec nuitée - ${data.studentName}`;
  const responsibleType = getCheckedValue("overnightResponsibleType");
  const reasonId = getValue("overnightReason");

  let body = `Madame, Monsieur,

Je soussigné(e) ${data.guardianName}, responsable légal(e) de l'élève ${data.studentName}, scolarisé(e) en ${data.studentClass}, autorise mon enfant à quitter l'internat pour une sortie ponctuelle avec nuitée.

Départ prévu :
- Date : ${formatDateForEmail(getValue("overnightDepartureDate"))}
- Heure : ${formatTimeForEmail(getValue("overnightDepartureTime"))}

Retour prévu :
- Date : ${formatDateForEmail(getValue("overnightReturnDate"))}
- Heure : ${formatTimeForEmail(getValue("overnightReturnTime"))}`;

  if (responsibleType === "parents") {
    body += `

Personne responsable : Parents`;
  }

  if (responsibleType === "other") {
    body += `

Personne adulte responsable pendant la sortie :
- Nom et prénom : ${getValue("overnightResponsibleName")}
- Relation avec l'élève : ${getValue("overnightResponsibleRelation")}
- Téléphone : ${getValue("overnightResponsiblePhone")}`;

    if (getValue("overnightResponsibleId")) {
      body += `
- Pièce d'identité : ${getValue("overnightResponsibleId")}`;
    }
  }

  body += buildReasonBlock(reasonId, getValue("overnightOtherReason"));
  body += buildLegalGuardianBlock(data);

  return { subject, body };
}

function buildDayEmail(data) {
  const subject = `Autorisation de sortie ponctuelle sans nuitée - ${data.studentName}`;
  const reasonId = getValue("dayReason");

  let body = `Madame, Monsieur,

Je soussigné(e) ${data.guardianName}, responsable légal(e) de l'élève ${data.studentName}, scolarisé(e) en ${data.studentClass}, autorise mon enfant à quitter temporairement l'établissement sans nuitée.

Sortie prévue :
- Date : ${formatDateForEmail(getValue("dayDate"))}
- Heure de sortie : ${formatTimeForEmail(getValue("dayDepartureTime"))}
- Heure de retour : ${formatTimeForEmail(getValue("dayReturnTime"))}`;

  body += buildReasonBlock(reasonId, getValue("dayOtherReason"));

  if (getCheckedValue("dayHasCompanion") === "yes") {
    body += `

Personne accompagnante :
- Nom et prénom : ${getValue("dayCompanionName")}
- Téléphone : ${getValue("dayCompanionPhone")}`;
  }

  body += buildLegalGuardianBlock(data);

  return { subject, body };
}

function buildLegalGuardianBlock(data) {
  return `

Coordonnées du responsable légal :
- Nom et prénom : ${data.guardianName}
- Téléphone : ${data.guardianPhone}
- Email : ${data.guardianEmail}
- Pièce d'identité : ${data.guardianId}

Je vous remercie par avance de bien vouloir prendre en compte cette autorisation.

Cordialement,

${data.guardianName}`;
}

function buildEmail() {
  const data = getCommonData();
  let emailContent;

  if (selectedPermissionType === "vacaciones") {
    emailContent = buildVacationEmail(data);
  }

  if (selectedPermissionType === "pernocta") {
    emailContent = buildOvernightEmail(data);
  }

  if (selectedPermissionType === "sinPernocta") {
    emailContent = buildDayEmail(data);
  }

  const ccEmails = [data.guardianEmail, data.studentEmail]
    .filter(Boolean)
    .join(",");

  return {
    to: EMAIL_VIE_SCOLAIRE,
    cc: ccEmails,
    subject: emailContent.subject,
    body: emailContent.body
  };
}
function showReview(email) {
  setText("reviewTo", email.to);
  setText("reviewSubject", email.subject);
  setText("reviewBody", email.body);
  setText("copyStatus", "");
  showScreen("review");
}

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openGmail(email) {
  const guardianEmail = getValue("guardianEmail");
  const url = "https://mail.google.com/mail/?view=cm&fs=1"
    + `&to=${encodeURIComponent(email.to)}`
    + `&cc=${encodeURIComponent(email.cc)}`
    + `&su=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`
    + `&authuser=${encodeURIComponent(guardianEmail)}`;

  openExternal(url);
}

function openOutlook(email) {
  const url = "https://outlook.office.com/mail/deeplink/compose?"
    + `to=${encodeURIComponent(email.to)}`
    + `&cc=${encodeURIComponent(email.cc)}`
    + `&subject=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`;

  openExternal(url);
}

function openMailApp(email) {
  const url = `mailto:${encodeURIComponent(email.to)}`
    + `?cc=${encodeURIComponent(email.cc)}`
    + `&subject=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`;

  window.location.href = url;
}

async function copyToClipboard(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    setText("copyStatus", message);
  } catch (error) {
    setText("copyStatus", "No se ha podido copiar automáticamente.");
  }
}

function resetApplication() {
  document.getElementById("permissionForm").reset();
  clearErrors();
  selectedPermissionType = "";
  generatedEmail = { to: "", cc: "", subject: "", body: "" };

  document.querySelectorAll(".type-card").forEach((card) => card.classList.remove("selected"));
  resetPermissionSections();

  document.getElementById("overnightOtherResponsibleFields").classList.add("hidden");
  document.getElementById("overnightOtherReasonWrapper").classList.add("hidden");
  document.getElementById("overnightNoReasonNote").classList.add("hidden");

  document.getElementById("dayOtherReasonWrapper").classList.add("hidden");
  document.getElementById("dayNoReasonNote").classList.add("hidden");
  document.getElementById("dayCompanionFields").classList.add("hidden");
}

document.getElementById("btnStart").addEventListener("click", () => showScreen("type"));
document.getElementById("btnTypeBack").addEventListener("click", () => showScreen("welcome"));
document.getElementById("btnFormBack").addEventListener("click", () => showScreen("type"));
document.getElementById("btnErrorBack").addEventListener("click", () => showScreen(previousScreenForError));
document.getElementById("btnReviewBack").addEventListener("click", () => showScreen("form"));
document.getElementById("btnDone").addEventListener("click", () => showScreen("done"));
document.getElementById("btnRestart").addEventListener("click", () => {
  resetApplication();
  showScreen("welcome");
});

document.querySelectorAll(".type-card").forEach((card) => {
  card.addEventListener("click", () => {
    openFormForType(card.dataset.permissionType);
  });
});

document.getElementById("permissionForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const errors = validateForm();

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  generatedEmail = buildEmail();
  showReview(generatedEmail);
});

document.querySelectorAll('input[name="overnightResponsibleType"]').forEach((input) => {
  input.addEventListener("change", () => {
    const isOther = getCheckedValue("overnightResponsibleType") === "other";
    document.getElementById("overnightOtherResponsibleFields").classList.toggle("hidden", !isOther);
  });
});

document.getElementById("overnightReason").addEventListener("change", () => {
  const reason = getValue("overnightReason");
  document.getElementById("overnightOtherReasonWrapper").classList.toggle("hidden", reason !== "other");
  document.getElementById("overnightNoReasonNote").classList.toggle("hidden", reason !== "none");
});

document.getElementById("dayReason").addEventListener("change", () => {
  const reason = getValue("dayReason");
  document.getElementById("dayOtherReasonWrapper").classList.toggle("hidden", reason !== "other");
  document.getElementById("dayNoReasonNote").classList.toggle("hidden", reason !== "none");
});

document.querySelectorAll('input[name="dayHasCompanion"]').forEach((input) => {
  input.addEventListener("change", () => {
    const hasCompanion = getCheckedValue("dayHasCompanion") === "yes";
    document.getElementById("dayCompanionFields").classList.toggle("hidden", !hasCompanion);
  });
});

document.getElementById("btnOpenGmail").addEventListener("click", () => openGmail(generatedEmail));
document.getElementById("btnOpenOutlook").addEventListener("click", () => openOutlook(generatedEmail));
document.getElementById("btnOpenMailApp").addEventListener("click", () => openMailApp(generatedEmail));
document.getElementById("btnCopySubject").addEventListener("click", () => copyToClipboard(generatedEmail.subject, "Asunto copiado."));
document.getElementById("btnCopyBody").addEventListener("click", () => copyToClipboard(generatedEmail.body, "Texto copiado."));
