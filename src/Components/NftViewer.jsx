import NftCard from "./nftcard";

import { fetchNFTs } from "@/utils/fetchNFTs";
import { useEffect, useState } from "react";

function NftViewer({ address, chain }) {
  const [NFTs, setNFTs] = useState();
  const [loading, setLoading] = useState(false);
  

  //for testing purposes this data
  // let user = "0x928c2909847B884ba5Dd473568De6382b028F7b8"; //etherium
  // let user = "0x928c2909847B884ba5Dd473568De6382b028F7b8";//polygun//arbititum//etherium
  // let user = "0xE618772486bca061e13dAf25cDee0371BAd1CE12"; //opmitism

  const resfuc = useEffect(() => {
    if (address) {
      fetchNFTs(address, setNFTs, chain, "", setLoading)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("loadnig=>",loading);
    }
  }, [address, chain]);

  return (
    <>
      <div className="mt-4 "></div>
      {loading ? (
        <h1>Loading...</h1>
      ) : NFTs ? (
        NFTs.map((NFT) => {
          return (
            <NftCard
              key={NFT.value.id + NFT.value.contractAddress + "data"}
              image={NFT.value.image}
              id={NFT.value.id}
              title={NFT.value.title}
              description={NFT.value.description}
              address={NFT.value.contractAddress}
              attributes={NFT.value.attributes}
              floorPrice={NFT.value.floorPrice}
            ></NftCard>
          );
        })
      ) : (
        <div>No NFTs found</div>
      )}
    </>
  );
}

export default NftViewer;
