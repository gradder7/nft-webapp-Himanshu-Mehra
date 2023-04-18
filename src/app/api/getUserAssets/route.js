import { formatUnits } from "@ethersproject/units";

function formatDataAndSort(data) {
  return data?.data?.items
    ?.filter((token) => token.balance > 0)
    ?.map((token) => {
      const decimals = token.supports_erc.includes("erc20")
        ? token.contract_decimals
        : 0;
      // const balance = decimals
      //   ? formatUnits(token.balance, decimals)
      //   : token.balance;

      const valueBal = decimals ? token.balance / 10 ** decimals : token.balance;
      const balance= valueBal * token.quote_rate;
      console.log("my balance=>", balance);

      return {
        tokenInfo: {
          name: token.contract_ticker_symbol,
          symbol: token.contract_ticker_symbol,
          decimals: token.contract_decimals,
          logoUrl: token.logo_url,
          price: token.quote_rate,
          volume: token.quote,
        },

        balance,
      };
    })
    ?.sort((a, b) => b.balance - a.balance);
}

export async function POST(request) {
  const body = await request.json();

  const { endPoint } = body;

  let tokens = [];
  try {
    tokens = await fetch(endPoint).then((res) => res.json());

    tokens = formatDataAndSort(tokens);
  } catch (err) {
    console.log(err);
  }

  //   const allTokens = tokens.flat();

  return new Response(
    JSON.stringify({
      tokens,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
