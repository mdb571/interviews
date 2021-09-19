import { google } from "googleapis";
import marked from "marked";
const renderer = new marked.Renderer();
renderer.link = (name,company , position,selected) =>
  `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${
    name || ""
  }">${company}</a>`;

export async function getWhyNextReasons() {
  try {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      // we need to replace the escaped newline characters
      // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
      process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes
    );
   
    console.log(process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"));
    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "exp",
    });

    const rows = response.data.values.slice(1,);
    console.log(rows);
    if (rows.length) {
      return rows.map((row) => ({
        name: row[1],
        technical: marked(row[4].replace(/\n/g, "<br />"), { renderer }),
        hr: marked(row[5].replace(/\n/g, "<br />"), { renderer }),
        company: row[2] || null,
        status:row[9],
        suggestion: marked(row[8].replace(/\n/g, "<br />"), { renderer }),
      }));
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}
