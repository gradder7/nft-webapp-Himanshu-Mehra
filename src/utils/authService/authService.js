import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

export async function connectWeb3() {
  if (!window.ethereum) {
    throw new Error("Web3 wallet not found");
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    throw new Error("Web3 wallet connection failed");
  }
}

export async function disconnectWeb3() {
  if (!window.ethereum) {
    throw new Error("Web3 wallet not found");
  }

  try {
    await window.ethereum.request({ method: "eth_logout" });
  } catch (error) {
    throw new Error("Web3 wallet disconnection failed");
  }
}

export default web3;
