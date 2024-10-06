// Skapa konto

"use strict";

// Hämtar formuläret för att skapa ett konto
const createAccountFormElement = document.querySelector("#register-form");
// Hämtar felmeddelande för att visa eventuella fel
const createAccountErrorMessage = document.getElementById("createAccountErrorMessage");

// Funktion för att visa laddningsstatus under registrering
function showCreateAccountLoading() {
  const loadingElement = document.getElementById("create-account-loading");
  if (loadingElement) {
    loadingElement.style.display = "block";
  }
}

// Funktion för att dölja laddningsstatus när registreringen är klar
function hideCreateAccountLoading() {
  const loadingElement = document.getElementById("create-account-loading");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
}

// När användaren skickar in registeringen
createAccountFormElement.addEventListener("submit", async (event) => {
  event.preventDefault(); // Förhindra att sidan laddas om

  // Hämtar användarnamn och lösenord från formuläret
  const userNameInput = document.querySelector("#username").value;
  const passwordInput = document.querySelector("#password").value;

  // Skapar ett objekt med användarens registeringsuppgifter
  const newAccountData = { username: userNameInput, password: passwordInput };

  try {
    // Visa laddningsindikator när registreringen startar
    showCreateAccountLoading();

    // Skicka registeringsuppgifter till APIet
    const apiResponse = await fetch("https://moment4-1-dt207g-2ykf.onrender.com/api/register", {
      method: "POST", // POSTanrop
      headers: {
        "Content-Type": "application/json", // Skickar JSONdata
      },
      body: JSON.stringify(newAccountData), // Omvandlar till JSONformat
    });


    // Om registrering lyckas
    const responseData = await apiResponse.json();
    if (apiResponse.ok) {
        // Visa meddelande om kontot skapats
      alert("Ditt konto har skapats!");
      // Skicka användaren tillbaka till inloggningssidan
      window.location.href = "index.html";
    } else {
      // Visa felmeddelande om registreringen misslyckades
      createAccountErrorMessage.textContent = `Fel: ${responseData.error}`;
      createAccountErrorMessage.style.display = "block";
    }
  } catch (error) {
    // Om något går fel, visa ett generellt felmeddelande
    console.error("Något gick fel: ", error);
    createAccountErrorMessage.textContent = "Något gick fel, försök igen senare.";
    createAccountErrorMessage.style.display = "block";
  } finally {
    // Dölj laddningsindikatorn efter att registreringsprocessen är klar
    hideCreateAccountLoading();
  }
});
