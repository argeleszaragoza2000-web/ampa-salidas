const EMAIL_VIE_SCOLAIRE = "sudafricakananga2009@gmail.com";

const screens = {
  welcome: document.getElementById("screenWelcome"),
  form: document.getElementById("screenForm"),
  error: document.getElementById("screenError"),
  review: document.getElementById("screenReview"),
  done: document.getElementById("screenDone")
};

let currentEmail = {
  to: "",
  cc: "",
  subject: "",
  body: ""
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

function formatDateForFrenchEmail(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
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

function validateForm() {
  clearFieldErrors();

  const errors = [];

  const requiredFields = [
    ["studentName", "Falta el nombre del alumno."],
    ["studentClass", "Falta el curso."],
    ["guardianName", "Falta el nombre del padre, madre o tutor legal."],
    ["guardianEmail", "Falta el email del padre, madre o tutor legal."],
    ["guardianPhone", "Falta el teléfono de contacto."],
    ["guardianId", "Falta el documento de identidad."],
    ["departureDate", "Falta la fecha de salida."],
    ["departureTime", "Falta la hora de salida."],
    ["returnDate", "Falta la fecha de regreso."],
    ["returnTime", "Falta la hora de regreso."]
  ];

  requiredFields.forEach(([id, message]) => {
    if (!value(id)) {
      errors.push(message);
      markError(id);
    }
  });

  if (!selectedRadio("usesBus")) {
    errors.push("Debe indicar si usará el autobús del AMPA.");
  }

  return errors;
}

function buildEmail() {
  const studentName = value("studentName");
  const studentClass = value("studentClass");
  const studentEmail = value("studentEmail");

  const guardianName = value("guardianName");
  const guardianEmail = value("guardianEmail");
  const guardianPhone = value("guardianPhone");
  const guardianId = value("guardianId");

  const departureDate = formatDateForFrenchEmail(value("departureDate"));
  const departureTime = value("departureTime");
  const returnDate = formatDateForFrenchEmail(value("returnDate"));
  const returnTime = value("returnTime");
  const usesBus = selectedRadio("usesBus");
  const authorize1300 = document.getElementById("authorize1300").checked;

  const subject = `Autorisation de sortie - ${studentName} - Vacances scolaires`;

  let body = `Madame, Monsieur,

Je soussigné(e) ${guardianName}, responsable légal(e) de l'élève ${studentName}, scolarisé(e) en ${studentClass}, autorise mon enfant à quitter l'internat dans le cadre des vacances scolaires.

Départ prévu :
- Date : ${departureDate}
- Heure : ${departureTime}

Retour prévu :
- Date : ${returnDate}
- Heure : ${returnTime}

Utilisation du bus de l'AMPA : ${usesBus}.`;

  if (authorize1300) {
    body += `

J'autorise également la sortie de l'établissement à 13h00, si cela est applicable.`;
  }

  body += `

Coordonnées du responsable légal :
- Nom et prénom : ${guardianName}
- Téléphone : ${guardianPhone}
- Email : ${guardianEmail}
- Pièce d'identité : ${guardianId}

Je vous remercie par avance de bien vouloir prendre en compte cette autorisation.

Cordialement,

${guardianName}`;

  return {
    to: EMAIL_VIE_SCOLAIRE,
    cc: studentEmail,
    subject,
    body
  };
}

function showErrors(errors) {
  const errorList = document.getElementById("errorList");
  errorList.innerHTML = "";
  errors.forEach(error => {
    const item = document.createElement("li");
    item.textContent = error;
    errorList.appendChild(item);
  });
  showScreen("error");
}

function showReview(email) {
  document.getElementById("emailTo").textContent = email.to;
  document.getElementById("emailSubject").textContent = email.subject;
  document.getElementById("emailPreview").textContent = email.body;
  showScreen("review");
}

function openUrl(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openGmail(email) {
  const url = "https://mail.google.com/mail/?view=cm&fs=1"
    + `&to=${encodeURIComponent(email.to)}`
    + `&cc=${encodeURIComponent(email.cc)}`
    + `&su=${encodeURIComponent(email.subject)}`
    + `&body=${encodeURIComponent(email.body)}`;
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

function resetForm() {
  document.getElementById("permissionForm").reset();
  clearFieldErrors();
  currentEmail = { to: "", cc: "", subject: "", body: "" };
  document.getElementById("copyStatus").textContent = "";
}

document.getElementById("startButton").addEventListener("click", () => showScreen("form"));
document.getElementById("backToWelcome").addEventListener("click", () => showScreen("welcome"));
document.getElementById("backToFormFromError").addEventListener("click", () => showScreen("form"));
document.getElementById("reviewBack").addEventListener("click", () => showScreen("form"));

document.getElementById("permissionForm").addEventListener("submit", event => {
  event.preventDefault();
  const errors = validateForm();

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  currentEmail = buildEmail();
  showReview(currentEmail);
});

document.getElementById("openGmail").addEventListener("click", () => openGmail(currentEmail));
document.getElementById("openOutlook").addEventListener("click", () => openOutlook(currentEmail));
document.getElementById("openMailApp").addEventListener("click", () => openMailApp(currentEmail));

document.getElementById("copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentEmail.body);
    document.getElementById("copyStatus").textContent = "Texto copiado.";
  } catch (error) {
    document.getElementById("copyStatus").textContent = "No se ha podido copiar automáticamente.";
  }
});

document.getElementById("finishButton").addEventListener("click", () => showScreen("done"));

document.getElementById("restartButton").addEventListener("click", () => {
  resetForm();
  showScreen("welcome");
});
