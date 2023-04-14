export async function GET(request) {
  // const { endpoint, owner, contactAddress } = request.query;
  return new Response(
    JSON.stringify({
      name: "Jim Halpert",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export async function POST(request) {
  const body = await request.json();

  const { endpoint, owner, contractAddress } = body;
  let data = [];
  let error = "";
  try {
    if (owner) {
      if (contractAddress) {
        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
        ).then((data) => data.json());
      } else {
        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&withMetadata=true&pageKey=nextPage&pageSize=16`
        ).then((data) => data.json());
      }
    }
  } catch (err) {
    error = err;
  }

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    let resultData = [];

    if (data.ownedNfts.length) {
      resultData = await getNFTsMetadata(data.ownedNfts, endpoint);
    }
    return new Response(JSON.stringify(resultData), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

const getNFTsMetadata = async (NFTS, endpoint) => {
  const NFTsMetadata = Promise.allSettled(
    NFTS.map(async (NFT) => {
      const metadata = await fetch(
        `${endpoint}/v1/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
      ).then((data) => data.json());
      let image;

      if (metadata.media[0].gateway.length) {
        image = metadata.media[0].gateway;
      } else {
        image = "https://via.placeholder.com/500";
      }

      return {
        id: NFT.id.tokenId,
        contractAddress: NFT.contract.address,
        image,
        // name
        title: metadata.metadata.name,
        description: metadata.metadata.description,
        attributes: metadata.metadata.attributes,
        floorPrice: metadata.contractMetadata.openSea.floorPrice,
      };
    })
  );

  return NFTsMetadata;
};
