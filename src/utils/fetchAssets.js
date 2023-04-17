import {
  REACT_APP_COVALENT_API_KEY,
  REACT_APP_COVALENT_API_END_POINT,
} from "./getEndPoints";

export default async function fetchAssets(address) {
  address = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
  const endPoint = `${REACT_APP_COVALENT_API_END_POINT}/1/address/${address}/balances_v2/?key=${REACT_APP_COVALENT_API_KEY}&nft=false&no-nft-fetch=true&quote-currency=USD&page-size=1000`;
  let response = {};

  try {
    response = await fetch("/api/getUserAssets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ endPoint }),
    }).then((res) => res.json());
    console.log('=<>',response);
  } catch (err) {
    console.log(err);
  }

  return response;
}
