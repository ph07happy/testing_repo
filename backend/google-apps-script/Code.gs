/**
 * GOOGLE APPS SCRIPT BACKEND: SPIDER-VERSE BIRTHDAY API
 * 
 * Secure, cross-origin API serving submitted Google Form responses
 * from your linked Google Sheet to the Spider-Verse website.
 * 
 * LINKED SPREADSHEET:
 * https://docs.google.com/spreadsheets/d/1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0/edit?resourcekey=&gid=850598855#gid=850598855
 * 
 * FOUR FORM FIELDS SUPPORTED:
 * 1. "message to"                          -> Recipient name
 * 2. "message by"                          -> Sender identification / who filled the form
 * 3. "message"                             -> The personal birthday message
 * 4. "upload pictures (in .jpg, .png)"     -> One or more uploaded picture links
 */

var CONFIG = {
  // Target birthday timestamp with timezone offset (keep synced with siteConfig.js)
  BIRTHDAY_TIMESTAMP: "2026-11-15T00:00:00+05:30",

  // Your linked Google Sheet ID
  SPREADSHEET_ID: "1nP8NET9RP0xiU5S--V0PfLpbLACFuQunxkUmRkZQmL0",

  // Sheet tab GID
  SHEET_GID: "850598855",

  // Default Sheet tab name
  SHEET_NAME: "Form Responses 1",

  // Fallback ID prefix
  ID_PREFIX: "response",
};

/**
 * Handles incoming HTTP GET requests
 */
function doGet(e) {
  try {
    e = e || { parameter: {} };
    var params = e.parameter || {};
    var action = params.action || 'getMessages';
    var callback = params.callback; // For JSONP cross-origin fallback

    var responseData;

    // Evaluate server-side birthday reveal lock
    var serverNow = new Date();
    var unlockDate = getTargetUnlockDate();
    var isLocked = serverNow.getTime() < unlockDate.getTime();

    if (action === 'getStatus') {
      responseData = {
        locked: isLocked,
        serverTime: serverNow.toISOString(),
        unlockTime: unlockDate.toISOString(),
      };
    } else if (action === 'getMessages') {
      if (isLocked) {
        // Enforce access control: Do NOT reveal messages before countdown completes
        responseData = {
          locked: true,
          message: "The multiverse is still locked until the birthday countdown completes.",
          unlockTime: unlockDate.toISOString(),
          serverTime: serverNow.toISOString(),
          data: [],
        };
      } else {
        var messages = readFormResponses();
        responseData = {
          locked: false,
          serverTime: serverNow.toISOString(),
          data: messages,
          count: messages.length,
        };
      }
    } else if (action === 'getMessageById') {
      var requestedId = params.id;
      if (isLocked) {
        responseData = {
          locked: true,
          message: "Transmission is locked until the birthday countdown completes.",
          unlockTime: unlockDate.toISOString(),
          data: null,
        };
      } else {
        var allMessages = readFormResponses();
        var found = null;
        for (var i = 0; i < allMessages.length; i++) {
          if (allMessages[i].id === requestedId) {
            found = allMessages[i];
            break;
          }
        }
        if (found) {
          responseData = { locked: false, data: found };
        } else {
          responseData = { locked: false, error: "Not Found", message: "Dispatch ID not found", data: null };
        }
      }
    } else {
      responseData = { error: "Invalid action", action: action };
    }

    return createOutput(responseData, callback);
  } catch (err) {
    return createOutput({
      error: "Server Exception",
      message: err.toString(),
      data: [],
    }, e && e.parameter ? e.parameter.callback : null);
  }
}

/**
 * Returns the target unlock Date object from Script Properties or CONFIG
 */
function getTargetUnlockDate() {
  var props = PropertiesService.getScriptProperties();
  var configuredTimestamp = props.getProperty('BIRTHDAY_TIMESTAMP') || CONFIG.BIRTHDAY_TIMESTAMP;
  return new Date(configuredTimestamp);
}

/**
 * Normalizes header string to lowercase alphanumeric
 */
function normalizeHeader(str) {
  if (!str) return '';
  return str.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Extracts Google Drive ID from link
 */
function extractDriveId(url) {
  if (!url) return null;
  var fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];
  var idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];
  return null;
}

/**
 * Converts a Google Drive link to a displayable thumbnail image URL
 */
function toDisplayableDriveUrl(rawUrl) {
  if (!rawUrl) return '';
  var clean = rawUrl.trim();
  var driveId = extractDriveId(clean);
  if (driveId) {
    return "https://drive.google.com/thumbnail?id=" + driveId + "&sz=w1600";
  }
  return clean;
}

/**
 * Parses and normalizes all responses from the Google Sheet
 */
function readFormResponses() {
  var sheet = getTargetSheet();
  if (!sheet) return [];

  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  if (values.length < 2) return []; // Only headers or empty

  var rawHeaders = values[0];
  var headerMap = {};

  for (var h = 0; h < rawHeaders.length; h++) {
    var norm = normalizeHeader(rawHeaders[h]);
    if (norm) {
      headerMap[norm] = h;
    }
  }

  // Find column indices matching form fields
  var colMessageTo = findColumnIndex(headerMap, ['messageto', 'to']);
  var colMessageBy = findColumnIndex(headerMap, ['messageby', 'by', 'sender', 'from', 'author']);
  var colMessage = findColumnIndex(headerMap, ['message', 'wishes', 'birthdaymessage', 'msg'], ['by', 'to']);
  var colUploadPictures = findColumnIndex(headerMap, ['uploadpicturesinjpgpng', 'uploadpictures', 'uploadpicture', 'pictures', 'picture', 'upload', 'photos', 'photo']);
  var colTimestamp = findColumnIndex(headerMap, ['timestamp']);

  var responses = [];

  for (var r = 1; r < values.length; r++) {
    var row = values[r];

    var messageToVal = colMessageTo !== -1 && row[colMessageTo] !== undefined ? String(row[colMessageTo]).trim() : '';
    var messageByVal = colMessageBy !== -1 && row[colMessageBy] !== undefined ? String(row[colMessageBy]).trim() : '';
    var messageVal = colMessage !== -1 && row[colMessage] !== undefined ? String(row[colMessage]).trim() : '';
    var rawPictures = colUploadPictures !== -1 && row[colUploadPictures] !== undefined ? String(row[colUploadPictures]).trim() : '';
    var rowTimestamp = colTimestamp !== -1 && row[colTimestamp] ? new Date(row[colTimestamp]).toISOString() : new Date().toISOString();

    // Skip empty rows
    if (!messageToVal && !messageByVal && !messageVal && !rawPictures) {
      continue;
    }

    // Stable ID: Format response-001, response-002, etc. based on sheet row index
    var stableId = CONFIG.ID_PREFIX + "-" + padZero(r, 3);

    // Split multiple uploaded pictures
    var picturesList = [];
    if (rawPictures) {
      var splitUrls = rawPictures.split(/[\r\n,;]+|\s+(?=https?:\/\/)/);
      var picIndex = 1;
      for (var p = 0; p < splitUrls.length; p++) {
        var cleanUrl = splitUrls[p].trim();
        if (cleanUrl.indexOf('http://') === 0 || cleanUrl.indexOf('https://') === 0) {
          picturesList.push({
            id: stableId + "-pic-" + picIndex,
            url: toDisplayableDriveUrl(cleanUrl),
            rawUrl: cleanUrl,
            alt: "Birthday memory " + picIndex
          });
          picIndex++;
        }
      }
    }

    responses.push({
      id: stableId,
      messageTo: messageToVal || 'Birthday Hero',
      messageBy: messageByVal,
      message: messageVal || messageByVal,
      pictures: picturesList,
      timestamp: rowTimestamp,
    });
  }

  return responses;
}

/**
 * Finds column index by trying matching header keys with exclusion support
 */
function findColumnIndex(headerMap, candidateKeys, excludeKeys) {
  excludeKeys = excludeKeys || [];
  // 1. Direct exact match
  for (var i = 0; i < candidateKeys.length; i++) {
    var key = candidateKeys[i];
    if (headerMap[key] !== undefined) {
      return headerMap[key];
    }
  }
  // 2. Substring match avoiding exclusions
  for (var normKey in headerMap) {
    var isExcluded = false;
    for (var e = 0; e < excludeKeys.length; e++) {
      if (normKey.indexOf(excludeKeys[e]) !== -1) {
        isExcluded = true;
        break;
      }
    }
    if (isExcluded) continue;

    for (var j = 0; j < candidateKeys.length; j++) {
      if (normKey.indexOf(candidateKeys[j]) !== -1) {
        return headerMap[normKey];
      }
    }
  }
  return -1;
}

/**
 * Returns the target Google Sheet instance
 */
function getTargetSheet() {
  var ss = null;

  // Try opening by explicit ID first
  if (CONFIG.SPREADSHEET_ID) {
    try {
      ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } catch (e) {
      // Container-bound fallback
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) return null;

  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }
  return sheet;
}

/**
 * Pads numbers with leading zeros
 */
function padZero(num, size) {
  var s = String(num);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
}

/**
 * Serializes output as standard JSON or JSONP
 */
function createOutput(dataObj, callback) {
  var jsonString = JSON.stringify(dataObj);
  var output;

  if (callback && /^[a-zA-Z0-9_$.]+$/.test(callback)) {
    output = ContentService.createTextOutput(callback + "(" + jsonString + ");");
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    output = ContentService.createTextOutput(jsonString);
    output.setMimeType(ContentService.MimeType.JSON);
  }

  return output;
}
