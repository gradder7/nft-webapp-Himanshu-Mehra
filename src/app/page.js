"use client";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/Components/Loader";
import TypewriterComponent from "typewriter-effect";
import Image from "next/image";
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});
import metamaskLogo from "../assets/MetaMask_Fox.png";
function LoginWrapper() {
  return (
    <WagmiConfig client={client}>
      <Login />
    </WagmiConfig>
  );
}
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { auth } from "@/utils/authService/firebase";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [doSignInFlow, setDoSignInFlow] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const getSignInToken = async (address) => {
    try {
      const res = await fetch("/api/getSignInToken", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const token = await res.json();
      console.log(token);
      return token?.token;
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithToken = async (token) => {
    console.log(token);
    try {
      const user = await signInWithCustomToken(auth, token);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
    return;
  };

  useEffect(() => {
    // initializeAdmin();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log(user);
        router.replace("/myProfile/");
      } else {
        disconnect();
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const login = async () => {
      console.log(address);
      setLoading(true);
      // const token = await getSignInToken(address);
      // const user = await signInWithToken(token);
      router.replace("/myProfile/");
      setLoading(false);
      console.log(user);
    };

    if (isConnected && doSignInFlow) login().then().catch();
  }, [isConnected, doSignInFlow]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="bg-gray-900 h-screen flex flex-col items-center justify-center gap-2 ">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-5xl font-extrabold mb-10 text-center leading-tight">
            Welcome to the world of web3 dapp
          </h1>

          <h1 className="text-white text-4xl font-bold mb-10">
            <TypewriterComponent
              options={{
                strings: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <div className="flex items-center">
            <Image src={metamaskLogo} alt="metamask" width={70} height={70} />
            <h1 className="text-white text-3xl font-bold mb-5 ml-5">Login</h1>
          </div>
        </div>

        <div className="w-1/2 md:w-1/3">
          <button
            className="py-3 w-full bg-white rounded-sm hover:bg-slate-100"
            onClick={() => {
              connect();
              setDoSignInFlow(true);
            }}
          >
            Connect to Wallet
          </button>
        </div>
      </div>
    </>
  );
};
export default LoginWrapper;
