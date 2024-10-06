// Logga in på startsidan

"use strict";

// Hämtar inloggningsformulär
const loginFormElement = document.querySelector("#login-form");
// Hämtar felmeddelande för att visa eventuella fel
const loginErrorMessage = document.getElementById("loginErrorMessage");

// Funktion för att visa laddningsstatus när inloggnigen pågår
function showLoadingIndicator() {
  const loadingElement = document.getElementById("loading-indicator");
  if (loadingElement) {
    loadingElement.style.display = "block"; 
  }
}

// Funktion för att dölja laddningsstatus när inloggningen är klar
function hideLoadingIndicator() {
  const loadingElement = document.getElementById("loading-indicator");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
}


// När användaren skickar in formulär (klickar på logga in)
loginFormElement.addEventListener("submit", async (event) => {
  event.preventDefault(); // förhindrar att sidan laddas om vid submit

  // Hämtar användarnamn och lösenord från formulär
  const userNameInput = document.querySelector("#username").value;
  const passwordInput = document.querySelector("#password").value;

  // Skapar ett objekt med inloggningsuppgifterna
  const credentials = { username: userNameInput, password: passwordInput };

  try {
    // Visa laddningsindikatorn under inloggningen
    showLoadingIndicator();

    // Skickar inloggningsuppgifterna till API:et
    const apiResponse = await fetch("https://moment4-1-dt207g-2ykf.onrender.com/api/login", {
      method: "POST", // Skickar data med POST
      headers: {
        "Content-Type": "application/json", // Skickar JSONdata
      },
      body: JSON.stringify(credentials), // Omvandlar till JSONformat
    });

    // Om inloggningen lyckas
    if (apiResponse.ok) {
      const responseData = await apiResponse.json();
      // Spara JWT-token i localStorage så att användaren förblir inloggad
      localStorage.setItem("authToken", responseData.response.token);
      // Spara användarnamnet i localStorage
      localStorage.setItem("loggedInUser", userNameInput);

      // Skicka användaren till sidan med arbetserfarenheter
      window.location.href = "workexperiencelist.html";
    } else {
      const responseData = await apiResponse.json();
      // Visa felmeddelande om inloggningen misslyckades
      loginErrorMessage.textContent = `${responseData.error}`;
      loginErrorMessage.style.display = "block";
    }
  } catch (error) {
    // Om ngt går fel vid inloggning, visa generellt felmeddelande
    console.error("Inloggningen misslyckades: ", error);
    loginErrorMessage.textContent = "Något gick fel, försök igen senare.";
    loginErrorMessage.style.display = "block";
  } finally {
    // Dölj laddningsindikatorn när inloggningen är klar
    hideLoadingIndicator();
  }
});

