// 1. ask if the user wants to install the app on a user or
//organization repo (this will determine the link we send the post request to)
// 2. Create and start a simple server to listen for requests to localhost:3000
// or whatever. When it receives a request it should:
//     1. parse the code
//     2. send the code to the manifest endpoint
//     3. parse the response from the end point:
//         - store the variables in a .env file
// 3.  Send the post request to either the User URL or the ORG url, with the
// manifest document

import fs from "fs";
import express from "express";
import inquirer from "inquirer";
import { debug } from "console";
const app = express();
const port = 3000;
let server; // stores server object once started, used to close it later

app.use("/register", express.static("public"));

function rlog(message) {
  console.log("\x1b[33m%s\x1b[0m", `=> ${message}`);
}

function makeENVfile(body) {
  const content = `APP_ID=${body.id}
PRIVATE_KEY="${body.pem}"
CLIENT_ID=${body.client_id}
CLIENT_SECRET=${body.client_secret}
WEBHOOK_SECRET=${body.webhook_secret}`;

  if (!fs.existsSync("outputs")) {
    rlog("Creating outputs directory.");
    fs.mkdirSync("outputs", { recursive: true });
  }

  rlog("Writing files.");
  fs.writeFileSync("outputs/.env", content);
  fs.writeFileSync("outputs/raw.json", JSON.stringify(body, null, 2));
}

function terminateServer() {
  rlog("Process completed. Closing server.");
  server.close(() => {
    rlog("Server closed.");
  });
}

async function retrieveAppInfo(code) {
  const URL = `https://api.github.com/app-manifests/${code}/conversions`;
  rlog("Sending request for app info...");
  const response = await fetch(URL, { method: "POST" });
  rlog("Received response.");
  let body = await response.json();
  makeENVfile(body);
  rlog(".env file created.");
  terminateServer();
}

app.get("/", (req, res) => {
  if (req.query.code) {
    retrieveAppInfo(req.query.code); // none-blocking
    res.send(
      "<p> Thanks! You can now close this page and continue in the terminal. </p>"
    );
  } else {
    res.send(
      "<p>We expected a query parameter code but no code was received 😢</p>"
    );
  }
});

async function main() {
  let registerPage;

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "userType",
      message:
        "Are you installing the app as a personal user or an organization?",
      choices: ["Personal", "Organization"],
    },
  ]);

  if (answer.userType === "Organization") {
    let answer = await inquirer.prompt([
      {
        type: "input",
        name: "orgName",
        message: "Enter the name of your organization: ",
      },
    ]);

    appRegisterUrl = `https://github.com/organizations/${answer.orgName}/settings/apps/new`;
    registerPage = `org.html`; // how do i dynamically change this so that it posts to the correct URL (above?)
  } else {
    registerPage = `user.html`;
  }
  rlog(`Installing as a ${answer.userType}`);

  server = app.listen(port, () => {
    rlog(
      `Please head over to http://localhost:${port}/register/${registerPage} to complete the process.`
    );
  });
}

export default main;