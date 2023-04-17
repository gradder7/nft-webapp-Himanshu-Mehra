import { ClipboardIcon } from "@heroicons/react/outline";

const NftCard = ({
  image,
  id,
  title,
  address,
  description,
  attributes,
  floorPrice,
}) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 h-full py-2">
      <div className="bg-white rounded-md overflow-hidden shadow h-full cursor-pointer hover:shadow-2xl transition-shadow duration-300">
        <img
          className="w-full h-64 object-cover"
          key={id}
          src={image}
          alt={title}
        />
        <div className="p-4 h-full">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium mr-2">
              {title ? title : "No title"}
            </h3>
            <p className="text-sm text-gray-500">{`${id.slice(
              0,
              4
            )}...${id.slice(id.length - 4)}`}</p>
          </div>
          <p className="text-sm text-gray-600 h-16 overflow-hidden">
            {description ? description.slice(0, 100) : "No Description"}
          </p>
          {/*  */}
          <p className=" text-gray-600 h-16 overflow-hidden text-md font-extrabold">
            Floor Price:
            {floorPrice ? " " + floorPrice + " ETH" : "Not available"}
          </p>
        </div>
        <div className="bg-green-300 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-gray-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 2h4a6 6 0 1 1-4.472 10.472l-1.28 1.281A4 4 0 1 0 8 2zm-1 6a4 4 0 1 0 6.906 2.75L14.11 11.4A6 6 0 1 1 10 4h-.746L9 5.248V8H7V5.414L5.414 4H4v2H2V2h2v1h1v5zm9 5a1 1 0 0 0 0 2h-1.586l-1.707 1.707A1 1 0 0 0 12 15a1 1 0 0 0 .707-.293l2-2A1 1 0 0 0 15 12zm-5 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600 text-sm mr-2">
              {address
                ? `${address.slice(0, 4)}...${address.slice(
                    address.length - 4
                  )}`
                : "No address"}
            </p>
            <ClipboardIcon
              onClick={() => navigator.clipboard.writeText(address)}
              className="h-4 w-4 text-gray-500 cursor-pointer"
            />
          </div>
          <div className="text-sm font-medium text-gray-700">
            {attributes?.length > 0 ? (
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 text-gray-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0V5zm4 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0V5zm4 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0V5zM4 7h12v2H4V7z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M5 11a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zM4 13h12v2H4v-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{attributes.length} attributes</p>
              </div>
            ) : (
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 text-gray-500 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm0 2h16v8H2V4zm2 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>No attributes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
