const form = document.getElementById("interestForm");
const status = document.getElementById("formStatus");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  status.hidden = true;
  status.textContent = "";

  const formData = new FormData(form);

  // Simple honeypot check for basic bot filtering.
  if (formData.get("_gotcha")) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Wird gesendet …";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Formular konnte nicht gesendet werden.");
    }

    form.reset();
    status.textContent =
      "Danke! Deine Interessenbekundung ist angekommen. Wir melden uns, sobald Christmas Wonderland für Weihnachten 2026 konkret wird.";
    status.hidden = false;
    status.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    status.textContent =
      "Das hat gerade leider nicht funktioniert. Bitte versuche es noch einmal.";
    status.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "🎄 Interesse vormerken";
  }
});
