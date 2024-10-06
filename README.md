# Moment 4.2 - Webbplats - DT207G
## Autentisering och säkerhet
Denna uppgift är skapad för Moment 4.2 i kursen DT207G. Webbplatsen använder Fetch API för att konsumera webbtjänsten jag skapade i Moment 4.1, som hanterar användarens arbetserfarenheter. Den använder JSON Web Tokens (JWT) för att autentisera användaren och skydda specifika resurser. 

### Funktionalitet
1. **Användarregistrering**: Användare kan registrera sig genom ett formulär på webbplatsen.
2. **Inloggning**: Användare kan logga in med sitt användarnamn och lösenord. Vid lyckad inloggning sparas en JWT-token i localStorage.
3. **Skyddade resurser**: En undersida på webbplatsen visar användarens arbetserfarenheter och är skyddad så att endast inloggade användare kan se den. JWT-token används för att autentisera API-anrop till den skyddade resursen.
4. **Logga ut**: Användaren kan logga ut genom att ta bort JWT-token och återgå till inloggningssidan. 

### Använda tekniker
Denna webbplats är skapad med HTML, CSS och JavaScript för att skapa själva gränssnittet och funktionaliteten. Fetch API har använts för att skicka och ta emot data till och från webbtjänsten. JWT(JSON Web Token) har använts för autentisering och åtkomstkontroll av skyddade resurser. Parcel har använts för en automatiserad utvecklingsmiljö. 

### API-anrop
Webbplatsen skickar följande anrop till webbtjänsten:
- **Registrering av användare**: POST till ```/api/register ```med användarnamn och lösenord.
- **Inloggning**: POST till ```/api/login``` med användarnamn och lösenord. Vid lyckad inloggning returneras en JWT-token.
- **Hämtning av arbetserfarenheter**: GET till ```/api/workexperience``` med JWT-token för att hämta användarens skyddade resurser (arbetserfarenheter).

### Lagrig av JWT
JWT-token lagras i **localStorage** och används för att autentisera anrop till skyddade resurser. Detta sker genom att skicka med token i **Authorization**-headern i alla API-anrop som kräver autentisering.

### Skapad av:
- Julie Andersson
- Webbutvecklingsprogrammet på Mittuniversitetet i Sundsvall
- Moment 4.2 i kursen DT207G Backendbaserad Webbutveckling
