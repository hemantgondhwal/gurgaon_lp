/**
 * The XL Academy - Gurgaon Landing Page Lead Capture Script
 * Attach this script to your Google Sheet:
 * https://docs.google.com/spreadsheets/d/1mpcBofOGIbRVas1fhMLTRkJ6kdwWKPgITUCX5hNvc6o/edit
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Mobile Number",
        "Email Address",
        "Course Interested In",
        "City",
        "Enquiry Type",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
        "UTM Term / Keyword",
        "Google Click ID (GCLID)",
        "Page URL"
      ]);
      sheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#1B2B6B").setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var course = data.course || "";
    var city = data.city || "Gurgaon";
    var action_type = data.action_type || "Enquiry / Demo";
    var utm_source = data.utm_source || "";
    var utm_medium = data.utm_medium || "";
    var utm_campaign = data.utm_campaign || "";
    var utm_term = data.utm_term || "";
    var gclid = data.gclid || "";
    var page_url = data.page_url || "";

    // Append lead row
    sheet.appendRow([
      timestamp,
      name,
      phone,
      email,
      course,
      city,
      action_type,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      gclid,
      page_url
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "sheet": "Gurgaon Leads" }))
    .setMimeType(ContentService.MimeType.JSON);
}
