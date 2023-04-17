var admin = require("firebase-admin");

var serviceAccount = require("./security-key.json");

export default function initializeAdmin() {
  console.log("this is called ");
  if (!admin.apps.length) {
    console.log("this is called inside");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
}
initializeAdmin();
