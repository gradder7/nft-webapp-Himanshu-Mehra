import React, { useEffect, useState } from "react";
import fetchAssets from "@/utils/fetchAssets";
const AssetViewer = ({ address }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetchAssets(address).then((data) => {
      console.log(data);
      setTokens(data.tokens);
    });
  }, [address]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl text-center font-medium text-gray-900">
        Top Tokens:
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <a
              href={token.tokenInfo.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex p-6">
                <div className="w-16 h-16">
                  <img
                    src={token.tokenInfo.logoUrl || { logo }}
                    alt={`${token.tokenInfo.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {token.tokenInfo.name}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-lg font-medium text-gray-900">
                        <span>Quote Rate:</span> $
                        {numberWithCommas(
                          Math.round(token.tokenInfo.price * 100) / 100
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quote:{" "}
                        {numberWithCommas(
                          Math.round(token.tokenInfo.volume * 100) / 100
                        )}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium text-gray-900">Balance:</span>{" "}
                    ${Math.round(token.balance * 100) / 100} ({token.network})
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetViewer;
