document.getElementById("interestForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());

  // Für den ersten lokalen Test speichern wir die Interessenten im Browser.
  // Für den echten Markttest wird dieser Teil später durch einen Backend-/Formular-Endpunkt ersetzt.
  const leads = JSON.parse(localStorage.getItem("christmasWonderlandLeads") || "[]");
  leads.push({
    ...data,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem("christmasWonderlandLeads", JSON.stringify(leads));

  form.reset();
  document.getElementById("successMessage").hidden = false;
  document.getElementById("successMessage").scrollIntoView({ behavior: "smooth", block: "nearest" });
});
