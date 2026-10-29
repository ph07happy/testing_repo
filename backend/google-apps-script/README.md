# Google Form & Apps Script Backend — Spider-Verse Birthday Surprise

This directory contains the configuration and backend code linked to your Google Form response spreadsheet:
👉 **[Google Spreadsheet](https://docs.google.com/spreadsheets/d/1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0/edit?resourcekey=&gid=850598855#gid=850598855)**

---

## 1. Verified Column Headers in Your Spreadsheet

Your Google Form response sheet columns:
1. `Timestamp`
2. `Email address` (if collected)
3. `message to` — Birthday recipient's name
4. `message by` — Sender name / who filled the form
5. `message` — Complete birthday message and wishes
6. `upload pictures (in .jpg, .png)` — Uploaded Google Drive file links

> Both the frontend and backend automatically normalize these header names to map `message to`, `message by`, `message`, and `upload pictures` seamlessly.

---

## 2. Crucial Step Needed: Google Drive Photo Sharing

When users upload photos via Google Forms, Google automatically stores them in a folder on your Google Drive named:
`[Your Google Form Title] (File Responses)`

### How to allow pictures to display on the website:
1. Open [Google Drive](https://drive.google.com/).
2. Locate the folder: **`... (File Responses)`**.
3. Right-click the folder and click **Share** > **Share**.
4. Under **General access**, change from *Restricted* to:
   - **Anyone with the link**
   - Role: **Viewer**
5. Click **Done**.

> **Why this is needed:** By default, Google Forms keeps uploaded pictures private to your Google account. Changing this folder to "Anyone with the link can view" allows the website's comic photo frames and lightbox to render the images for anyone visiting the birthday site.

---

## 3. How the Frontend Connects to Your Sheet

The website supports two connection methods:

### Method A: Direct Live Feed (Already Configured!)
Because you set your Google Spreadsheet to **"Anyone with the link can view"**, the website can read new submissions directly via Google's visualization feed without needing any extra server:
- Spreadsheet ID: `1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0`
- Tab GID: `850598855`
- Polling runs automatically every 30 seconds while the page is open.

### Method B: Google Apps Script Web App (For Server-Side Lock)
If you want strict server-side encryption of messages before the birthday:
1. Open your Google Sheet > click **Extensions** > **Apps Script**.
2. Paste the contents of [`Code.gs`](file:///d:/downloads/spider_verse/backend/google-apps-script/Code.gs).
3. Click **Deploy** > **New deployment** > **Web app**:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Copy the Web App URL and paste it into `src/config/apiConfig.js` under `appsScriptUrl`.
