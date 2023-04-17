// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import {
  REACT_APP_ALCHEMY_ARBITITUM_ENDPOINT,
  REACT_APP_ALCHEMY_ETHEREUM_ENDPOINT,
  REACT_APP_ALCHEMY_OPTIMISM_ENDPOINT,
  REACT_APP_ALCHEMY_POLYGUN_ENDPOINT,
  REACT_APP_COVALENT_API_END_POINT,
  REACT_APP_COVALENT_API_KEY,
} from "./getEndPoints";
import { ChevronLeftIcon } from "@heroicons/react/outline";

const getEndpoint = (chain) => {
  switch (chain) {
    case "Ethereum":
      return REACT_APP_ALCHEMY_ETHEREUM_ENDPOINT;

    case "Polygon":
      return REACT_APP_ALCHEMY_POLYGUN_ENDPOINT;

    case "Optimism":
      return REACT_APP_ALCHEMY_OPTIMISM_ENDPOINT;

    case "Arbitrum":
      return REACT_APP_ALCHEMY_ARBITITUM_ENDPOINT;
  }
};

const fetchNFTs = async (
  owner,
  setNFTs,
  chain,
  contractAddress,
  setLoading
) => {
  let endpoint = getEndpoint(chain);

  const data = { owner, contractAddress, endpoint };

  setLoading(true);
  let result = await fetch("/api/getNFTsAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((res) => res.json());

  if (result.error) {
    setNFTs(null);
    toast.warn("No NFTs are in this address!");
    setLoading(false);
  } else if (result.length) {
    let fullfilledNFTs = result.filter((NFT) => NFT.status == "fulfilled");

    setNFTs(fullfilledNFTs);
    setLoading(false);
  } else {
    toast.warning("No NFTs are in this address!");
    setLoading(false);
    setNFTs(null);
  }
};

export { fetchNFTs };
