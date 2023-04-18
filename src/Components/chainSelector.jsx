const ChainSelector = ({ setBlockchain, chain }) => {
  return (
    <>
      <h1 className="mt-3">
        Please select the newtork to fetch the NFT's only.
      </h1>
      <div className="flex gap-6 md:gap-12 items-center text-white my-4">
        <div className="flex flex-col md:flex-row items-center">
          <input
            onChange={(e) => setBlockchain(e.target.value)}
            className="mr-1"
            type="radio"
            name="blockchain"
            value="Ethereum"
            checked={chain == "Ethereum"}
          />
          <label htmlFor="Eth">Ethereum</label>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <input
            onChange={(e) => setBlockchain(e.target.value)}
            className="mr-1"
            type="radio"
            name="blockchain"
            value="Polygon"
            checked={chain == "Polygon"}
          />
          <label htmlFor="Polygon">Polygon</label>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <input
            onChange={(e) => setBlockchain(e.target.value)}
            className="mr-1"
            type="radio"
            name="blockchain"
            value="Arbitrum"
            checked={chain == "Arbitrum"}
          />
          <label htmlFor="Arbitrum">Arbitrum</label>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <input
            onChange={(e) => setBlockchain(e.target.value)}
            className="mr-1"
            type="radio"
            name="blockchain"
            value="Optimism"
            checked={chain == "Optimism"}
          />
          <label htmlFor="Optimism">Optimism</label>
        </div>
      </div>
    </>
  );
};

export default ChainSelector;
