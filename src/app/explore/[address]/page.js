"use client";
import { useState } from "react";

import ChainSelector from "@/Components/chainSelector";
import NftCard from "@/Components/nftcard";
import { fetchNFTs } from "@/utils/fetchNFTs";
import { toast } from "react-toastify";
import Nav from "@/Components/nav";

const Explore = (props) => {
  const [owner, setOwner] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [NFTs, setNFTs] = useState("");
  const [chain, setBlockchain] = useState("Ethereum");
  const [loading, setLoading] = useState(false);

  const { address } = props.params;

  const handleClick = async () => {
    if (owner === "") {
      toast.error("Please Enter the address!");
      return;
    } else {
      setLoading(true);
      toast("Getting NFT please...");
      await fetchNFTs(owner, setNFTs, chain, contractAddress, setLoading);
    }
  };
  return (
    <div>
      <Nav address={address} />
      <header className=" py-24 w-full bg-gray-900">
        <div className="flex-grow flex justify-end mr-12 mb-12"></div>
        <div className="flex flex-col items-center mb-12">
          <div className="mb-16 text-white text-center">
            <h1 className="text-5xl md:text-8xl font-bold font-body mb-10">
              NFT - Explorer
            </h1>
            <p>
              Find NFTs by owner and contract address{" "}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 w-3/4 md:w-1/3 gap-y-2 ">
            <input
              className="border rounded-sm focus:outline-none py-2 px-3 w-full"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Insert your wallet address"
            ></input>
            <br />
            <input
              className="focus:outline-none rounded-sm py-2 px-3 w-full mb-2"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Insert NFT address (optional)"
            ></input>
            <ChainSelector setBlockchain={setBlockchain} chain={chain} />
          </div>
          <div className="w-2/6 flex justify-center">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
      </header>
      <section className="flex flex-wrap justify-center">
        {loading ? (
          <h1>Loading...</h1>
        ) : NFTs ? (
          NFTs.length ? (
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
          )
        ) : null}
      </section>
    </div>
  );
};

export default Explore;
