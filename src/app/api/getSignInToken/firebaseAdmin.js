var admin = require("firebase-admin");

export default async function getCustomToken(address) {
  return new Promise((res, rej) => {
    admin
      .auth()
      .createCustomToken(address)
      .then((token) => {
        res(token);
      })
      .catch((err) => {
        rej(err);
      });
  });
}
