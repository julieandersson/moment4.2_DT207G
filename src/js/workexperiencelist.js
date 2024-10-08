// Skyddad sida, visas endast om användare har skapat ett konto och är inloggad.

"use strict";

// Hämtar listan där arbetserfarenheterna ska visas
const workExperienceListElement = document.getElementById("workexperience-list");
// Hämtar laddningsmeddelandet som visas medan data hämtas
const loadingMessage = document.getElementById("loading-message");
// Hämtar logga ut-knappen
const logoutButton = document.getElementById("logout-button");

// Funktion för att hämta JWT-token från localStorage
function getAuthToken() {
  return localStorage.getItem("authToken");
}

// Funktion för att visa laddningsmeddelandet
function showLoading() {
  loadingMessage.style.display = "block"; 
}

// Funktion för att dölja laddningsmeddelandet
function hideLoading() {
  loadingMessage.style.display = "none"; 
}

// Funktion för att logga ut användaren
function logoutUser() {
    const confirmLogout = confirm("Är du säker att du vill logga ut?");
    if (confirmLogout) {
      // Rensa authToken från localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedInUser");
  
      // Skicka användaren tillbaka till inloggningssidan
      window.location.href = "index.html";
    }
  }
  
// Lägg till händelsehanterare för "Logga ut"-knappen
logoutButton.addEventListener("click", logoutUser);

// Kontrollera om användaren är inloggad genom att kolla om JWT-token finns
const authToken = getAuthToken();
if (!authToken) {
  // Om ingen token finns, skicka tillbaka användaren till inloggningssidan
  alert("Du måste vara inloggad för att se dina arbetserfarenheter.");
  window.location.href = "index.html";
} else {
  // Visa laddningsmeddelandet
  showLoading();

  // Om token finns, anropa API:et för att hämta arbetserfarenheter
  fetch("https://moment4-1-dt207g-2ykf.onrender.com/api/workexperience", {
    method: "GET", // GET metod för att hämta datan
    headers: {
      "Authorization": `Bearer ${authToken}`, // Skickar JWT-token för autentisering
    },
  })
    .then((response) => {
      // Kontrollera om API-anropet lyckades
      if (response.ok) {
        return response.json(); // Om lyckat, omvandla svaret till JSON
      } else {
        // Om något gick fel, visa ett meddelande till användaren
        throw new Error("Fel vid hämtning av arbetserfarenheter.");
      }
    })
    .then((data) => {
      // När datan är hämtad, dölj laddningsmeddelandet
      hideLoading();

      // Om det finns data, loopa igenom och visa varje arbetserfarenhet i listan
      if (data.length > 0) {
        workExperienceListElement.innerHTML = ""; // Rensar listan om det finns tidigare innehåll
        data.forEach((experience) => {
          // Formatera datum
          const startDate = new Date(experience.startdate).toLocaleDateString();
          const endDate = new Date(experience.enddate).toLocaleDateString();
          
          // Nytt list-item för varje arbetserfarenhet
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>Jobbtitel:</strong> ${experience.jobtitle} <br>
            <strong>Företagsnamn:</strong> ${experience.companyname} <br>
            <strong>Plats:</strong> ${experience.location} <br>
            <strong>Perioden:</strong> ${startDate} - ${endDate} <br>
            <strong>Beskrivning:</strong> ${experience.description}
          `;
          workExperienceListElement.appendChild(listItem); // Lägg till arbetserfarenheten i listan
        });
      } else {
        // Om ingen arbetserfarenhet hittas, visa meddelande
        workExperienceListElement.innerHTML = "<li>Inga arbetserfarenheter hittades.</li>";
      }
    })
    .catch((error) => {
      // När ett fel uppstår, dölj också laddningsmeddelandet
      hideLoading();
      console.error("Fel vid hämtning av arbetserfarenheter: ", error);
      workExperienceListElement.innerHTML = "<li>Det gick inte att hämta dina arbetserfarenheter. Försök igen senare.</li>";
    });
}
