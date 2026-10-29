/**
 * Google Form & Google Apps Script API Configuration
 * 
 * Connected to your Google Form response spreadsheet:
 * https://docs.google.com/spreadsheets/d/1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0/edit?resourcekey=&gid=850598855#gid=850598855
 */
export const apiConfig = {
  // Google Spreadsheet ID (from your Google Form)
  spreadsheetId: "1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0",

  // Sheet tab GID
  gid: "850598855",

  // Direct Google Spreadsheet view URL
  sheetUrl: "https://docs.google.com/spreadsheets/d/1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0/edit?resourcekey=&gid=850598855#gid=850598855",

  // Google Apps Script Web App Deployment URL (optional server-side proxy)
  // If deployed, paste your web app URL here:
  appsScriptUrl: "",

  // API Modes:
  // 'auto'        -> Fetches live data from linked Google Sheet (or Apps Script if provided); falls back to demo data only if showDemoData=true
  // 'sheets-live' -> Strictly fetches live from your linked Google Sheet
  // 'apps-script' -> Strictly requires Google Apps Script Web App
  // 'demo'        -> Strictly uses local demo dataset (offline development)
  apiMode: "auto",

  // Timeout for API requests in milliseconds
  requestTimeoutMs: 12000,

  // Use JSONP if direct CORS is restricted by certain browser extensions or network policies
  useJsonpFallback: true,
};
