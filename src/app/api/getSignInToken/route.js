import getCustomToken from "./firebaseAdmin";
import initializeAdmin from "@/utils/firebaseAdmin/firebaseAdmin";

// let ADMIN_ = null;

export async function POST(request) {
  try {
    // console.log(ADMIN_);
    const body = await request.json();
    const { address } = body;
    // if (!ADMIN_) ADMIN_ = initializeAdmin();

    const token = await getCustomToken(address);
    console.log(token);
    const response = { token };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}
