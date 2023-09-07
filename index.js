import { createSmartAccountProvider } from "./utils/createSmartAccountProvider.js";
import {
  UNISWAP_V2_CONTRACT_ADDRESS,
  WMATIC_ADDRESS,
} from "./utils/constants.js";
import {
  encodeApprove,
  encodeSwapExactTokensForTokens,
} from "./utils/encode.js";
import { ask } from "./utils/ask.js";

async function main() {
  console.log("");
  console.log("########################################");
  console.log("##   STEP 1 - Create a Smart Wallet   ##");
  console.log("########################################");
  console.log("");
  // The SmartAccountProvider
  // https://docs.alchemy.com/reference/account-abstraction-sdk#core-components

  const smartAccountProvider = createSmartAccountProvider();
  let smartWallet = "";
  try {
    // The first time it is executed, this fails and the Smart Wallet is created.
    // This is a hack to get the address of the Smart Wallet
    await smartAccountProvider.sendUserOperation({
      target: UNISWAP_V2_CONTRACT_ADDRESS,
      data: "",
      value: 0,
    });
  } catch (e) {
    const jsonPart = e.metaMessages[1].replace("Request body: ", "");
    const { sender } = JSON.parse(jsonPart).params[0];
    smartWallet = sender;
  }

  console.log("");
  console.log("---------------------------------------------------------");
  console.log("Smart Wallet: ", smartWallet);
  console.log("---------------------------------------------------------");
  console.log("");

  console.log("");
  console.log("############################################################");
  console.log("##   STEP 2 - Approve the Smart Wallet to spend WMATIC   ##");
  console.log("##   Deposit MATIC and WMATIC in the Smart Wallet        ##");
  console.log("###########################################################");
  console.log("");
  const depositFunds = await ask({
    msj: "Have MATIC and WMATIC been deposited into the smart wallet?  (Y/N): ",
  });

  if (!depositFunds)
    throw new Error(`Deposit funds first in the Smart Wallet: ${smartWallet}`);

  const approveEncodeData = encodeApprove();
  const respApproveEncodeData = await smartAccountProvider.sendUserOperation({
    target: WMATIC_ADDRESS,
    data: approveEncodeData,
    value: 0,
  });
  console.log("");
  console.log("---------------------------------------------------------");
  console.log("respApproveEncodeData: ", respApproveEncodeData);
  console.log("---------------------------------------------------------");
  console.log("");

  console.log("");
  console.log("########################################################");
  console.log("##   STEP 3 - Swap MATIC for WMATIC                  ##");
  console.log("##   We need to comment the STEP 2 or it will fail   ##");
  console.log("#######################################################");
  console.log("");
  const commentStep2 = await ask({
    msj: "Do you comment the STEP 2 and uncomment the STEP 3?  (Y/N): ",
  });

  if (!commentStep2)
    throw new Error(`Comment STEP 2 first and uncomment STEP 3`);

  // const encodeSwapExactTokensForTokensData =
  //   encodeSwapExactTokensForTokens(smartWallet);

  // const respSwap = await smartAccountProvider.sendUserOperation({
  //   target: UNISWAP_V2_CONTRACT_ADDRESS,
  //   data: encodeSwapExactTokensForTokensData,
  //   value: 0,
  // });

  // console.log("");
  // console.log("---------------------------------------------------------");
  // console.log("respSwap: ", respSwap);
  // console.log("---------------------------------------------------------");
  // console.log("");
}

main();
