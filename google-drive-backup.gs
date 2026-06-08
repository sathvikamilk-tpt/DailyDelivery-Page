/**
 * Optional Google Apps Script backup endpoint.
 * Deploy as a Web App. The front-end can POST JSON backup data here.
 * This stores each backup as a file in Google Drive.
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const name = 'milk-backup-' + stamp + '.json';
    DriveApp.createFile(name, JSON.stringify(payload, null, 2), MimeType.PLAIN_TEXT);
    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
