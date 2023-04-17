// import { useAccount, useDisconnect } from "wagmi";
import { ClipboardIcon } from "@heroicons/react/outline";
import { useRouter } from "next/navigation";
import ProfileImage from "./profileImages";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/authService/firebase";

const Nav = ({ address }) => {
  const router = useRouter();
  // const { address, isConnected } = useAccount();

  // const { disconnect } = useDisconnect();

  const handleLogout = async () => {
    // disconnect();

    signOut(auth)
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="top-0 z-30 w-full sticky flex-grow flex bg-white shadow-xl shadow-black-600/20  justify-end mr-12 -mb-20 sm:px-4 px-2 py-2 md:py-0">
      {address ? (
        <div className="flex items-center py-2">
          <div className="flex mr-4 text-black gap-4">
            <Link className="mr-2 text-sm md:text-lg " href={`/myProfile`}>
              Home
            </Link>
            <Link
              className="mr-2 text-sm md:text-lg"
              href={`/explore/${address}`}
            >
              Explore
            </Link>

            <div className="flex items-center">
              <p className="text-sm w-[100px] md:w-max overflow-hidden text-ellipsis whitespace-nowrap md:text-lg">
                {address}
              </p>
              <ClipboardIcon
                onClick={() => navigator.clipboard.writeText(address)}
                className="h-4 w-4 -mt-2 text-slate-200 cursor-pointer"
              ></ClipboardIcon>
            </div>
          </div>
          <button
            className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center md:mr-5"
            onClick={handleLogout}
          >
            Disconnect
          </button>
          <div></div>
          <Link href="/">
            <ProfileImage width={"63"} rounded={true} />
          </Link>
        </div>
      ) : (
        {
          /* <Link className="py-2 px-4 rounded-lg bg-red" to={"/login"}>
          Connect
        </Link> */
        }
      )}
    </div>
  );
};

export default Nav;
