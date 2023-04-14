// import { useDisconnect } from "wagmi";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const { disconnect } = useDisconnect();
  // const router = useRouter();
  return (
    <div className="bg-gray-900 h-screen flex flex-col items-center justify-center gap-2 ">
      <h1 className="text-white text-3xl -mt-24 font-bold mb-12">Home</h1>

      <div className="w-2/6">
        <button
          className="py-3 w-full bg-white rounded-sm hover:bg-slate-100"
          // onClick={() => {
          //   disconnect();
          // }}
        >
          disconnect
        </button>
      </div>
    </div>
  );
}
