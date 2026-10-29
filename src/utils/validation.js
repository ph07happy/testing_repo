/**
 * Validation and normalization helpers for Google Form submissions
 */

/**
 * Normalizes header keys to lowercase alphanumeric characters.
 * E.g., "Message To", "message to ", "MESSAGE  TO" -> "messageto"
 */
export function normalizeHeaderKey(header) {
  if (!header || typeof header !== 'string') return '';
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Finds the corresponding value for a canonical key among object properties,
 * matching flexibly while avoiding field collisions (e.g., between "message" and "message by").
 * 
 * Supported semantic field types:
 * - 'messageto'       -> Recipient
 * - 'messageby'       -> Sender name / author who filled the form
 * - 'message'         -> The actual message text / wishes
 * - 'uploadpictures'  -> Uploaded photo links
 */
export function extractFieldValue(rowObj, fieldType) {
  if (!rowObj || typeof rowObj !== 'object') return '';

  const normTarget = normalizeHeaderKey(fieldType);
  const entries = Object.entries(rowObj)
    .map(([key, value]) => ({
      rawKey: key,
      normKey: normalizeHeaderKey(key),
      value: value !== undefined && value !== null ? String(value).trim() : '',
    }))
    .filter((entry) => entry.value !== '');

  // 1. Direct exact normalized match
  for (const entry of entries) {
    if (entry.normKey === normTarget) {
      return entry.value;
    }
  }

  // 2. Field-specific semantic matching with collision prevention
  if (normTarget === 'messageto') {
    // Matches keys like "messageto", "to", "recipient", avoiding "by"
    for (const entry of entries) {
      if (
        entry.normKey === 'messageto' ||
        entry.normKey === 'to' ||
        entry.normKey.includes('recipient')
      ) {
        return entry.value;
      }
    }
    for (const entry of entries) {
      if (
        entry.normKey.includes('messageto') ||
        (entry.normKey.includes('to') && !entry.normKey.includes('by') && !entry.normKey.includes('photo'))
      ) {
        return entry.value;
      }
    }
  }

  if (normTarget === 'messageby') {
    // Matches keys like "messageby", "by", "sender", "author", "from", "name", avoiding pure "message"
    for (const entry of entries) {
      if (
        entry.normKey === 'messageby' ||
        entry.normKey === 'by' ||
        entry.normKey === 'sender' ||
        entry.normKey === 'from' ||
        entry.normKey === 'author' ||
        entry.normKey === 'whofilled'
      ) {
        return entry.value;
      }
    }
    for (const entry of entries) {
      if (
        (entry.normKey.includes('messageby') ||
          entry.normKey.includes('sender') ||
          entry.normKey.includes('from') ||
          entry.normKey.includes('author') ||
          entry.normKey.includes('whofilled')) &&
        !entry.normKey.includes('to')
      ) {
        return entry.value;
      }
    }
  }

  if (normTarget === 'message') {
    // Matches strictly the message body: "message", "wishes", "birthdaymessage"
    // Must NOT match "messageby", "messageto", or "upload"
    for (const entry of entries) {
      if (
        entry.normKey === 'message' ||
        entry.normKey === 'wishes' ||
        entry.normKey === 'birthdaymessage' ||
        entry.normKey === 'msg' ||
        entry.normKey === 'yourmessage'
      ) {
        return entry.value;
      }
    }
    for (const entry of entries) {
      if (
        (entry.normKey.includes('message') || entry.normKey.includes('wish')) &&
        !entry.normKey.includes('by') &&
        !entry.normKey.includes('to') &&
        !entry.normKey.includes('upload') &&
        !entry.normKey.includes('picture') &&
        !entry.normKey.includes('photo')
      ) {
        return entry.value;
      }
    }
  }

  if (normTarget === 'uploadpictures' || normTarget === 'uploadpicture' || normTarget === 'pictures') {
    for (const entry of entries) {
      if (
        entry.normKey.includes('upload') ||
        entry.normKey.includes('picture') ||
        entry.normKey.includes('photo') ||
        entry.normKey.includes('image')
      ) {
        return entry.value;
      }
    }
  }

  // 3. Fallback partial substring match if no semantic match hit
  for (const entry of entries) {
    // Never allow 'message' target to match 'messageto', 'messageby', or picture fields
    if (
      normTarget === 'message' &&
      (entry.normKey.includes('to') || entry.normKey.includes('by') || entry.normKey.includes('upload') || entry.normKey.includes('picture'))
    ) {
      continue;
    }
    // Never allow 'messageto' to match 'messageby'
    if (normTarget === 'messageto' && entry.normKey.includes('by')) {
      continue;
    }
    // Never allow 'messageby' to match 'messageto'
    if (normTarget === 'messageby' && entry.normKey.includes('to')) {
      continue;
    }

    if (entry.normKey.includes(normTarget) || normTarget.includes(entry.normKey)) {
      return entry.value;
    }
  }

  return '';
}

/**
 * Validates a single response object
 */
export function isValidResponse(response) {
  if (!response || typeof response !== 'object') return false;
  if (!response.id) return false;
  // A response is valid if it has message, messageBy, messageTo, or pictures
  const hasText = Boolean(
    (response.message && response.message.trim()) ||
    (response.messageBy && response.messageBy.trim()) ||
    (response.messageTo && response.messageTo.trim() && response.messageTo !== 'Birthday Star')
  );
  const hasPictures = Boolean(Array.isArray(response.pictures) && response.pictures.length > 0);
  return hasText || hasPictures;
}
