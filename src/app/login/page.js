"use client";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { useRouter } from "next/navigation";
import Link from "next/link";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function LoginWrapper() {
  return (
    <WagmiConfig client={client}>
      <Login />
    </WagmiConfig>
  );
}

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // const [{ data, error }, connect] = useConnect();
  // const navigate = useNavigate();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected) {
      console.log(address);
      router.replace("/myProfile/" + address);
    }
  }, []);

  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center justify-center gap-2 ">
      <h1 className="text-white text-3xl -mt-24 font-bold mb-12">Login</h1>

      <div className="w-2/6">
        <button
          className="py-3 w-full bg-white rounded-sm hover:bg-slate-100"
          onClick={() => {
            connect();
          }}
        >
          Connect to Wallet
        </button>
      </div>

      {/* {error && <div>{error?.message ?? "Failed to connect"}</div>} */}
      <div className="text-white text-center mt-8 ">
        <p>or continue without</p>
        <Link className="font-bold" href={"/explore"}>
          {" "}
          logging in
        </Link>
      </div>
    </div>
  );
};
export default LoginWrapper;
