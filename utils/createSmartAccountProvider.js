import {
  SimpleSmartContractAccount,
  SmartAccountProvider,
} from "@alchemy/aa-core";
import { mnemonicToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const createSmartAccountProvider = () => {
  const { ALCHEMY_MUMBAI_RPC, MNEMONIC } = process.env;

  const RPC = `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_RPC}`;
  const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
    "0x9406Cc6185a346906296840746125a0E44976454";
  const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

  // 1. define the EOA owner of the Smart Account
  // This is just one example of how to interact with EOAs, feel free to use any other interface
  const ownerAccount = mnemonicToAccount(MNEMONIC);

  // All that is important for defining an owner is that it provides a `signMessage` and `getAddress` function
  const owner = {
    signMessage: async (msg) => {
      if (typeof msg === "string" && !isHex(msg)) {
        return ownerAccount.signMessage({
          message: msg,
        });
      } else {
        return ownerAccount.signMessage({
          message: {
            raw: msg,
          },
        });
      }
    },
    getAddress: async () => ownerAccount.address,
  };

  // 2. initialize the provider and connect it to the account
  const provider = new SmartAccountProvider(
    RPC,
    ENTRY_POINT_ADDRESS,
    polygonMumbai
  ).connect(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRY_POINT_ADDRESS,
        chain: polygonMumbai,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient,
        owner,
      })
  );

  return provider;
};
