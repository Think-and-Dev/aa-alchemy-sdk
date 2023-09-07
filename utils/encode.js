import {
  UNISWAP_V2_CONTRACT_ADDRESS,
  WMATIC_ADDRESS,
  WETH_ADDRESS,
  erc20Interface,
  abiUniV2Interface,
} from "../utils/constants.js";

export const encodeApprove = () => {
  const amount = "100000000000000000000";
  const encodedABI = erc20Interface.encodeFunctionData("approve", [
    UNISWAP_V2_CONTRACT_ADDRESS,
    amount,
  ]);

  return encodedABI;
};

export const encodeSwapExactTokensForTokens = (wallet) => {
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const amountToSend = 1000000000000000n;
  const minAmountToReceive = 1;

  const encodedABI = abiUniV2Interface.encodeFunctionData(
    "swapExactTokensForTokens",
    [
      amountToSend,
      minAmountToReceive,
      [WMATIC_ADDRESS, WETH_ADDRESS],
      wallet,
      deadline,
    ]
  );

  return encodedABI;
};
