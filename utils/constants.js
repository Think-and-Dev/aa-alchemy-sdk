import { ethers } from "ethers";

import erc20abi from "../abis/ABIERC20.json" assert { type: "json" };
import abiUniV2 from "../abis/ABIUniSwapRouterV2.json" assert { type: "json" };

export const UNISWAP_V2_CONTRACT_ADDRESS =
  "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
export const WMATIC_ADDRESS = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";
export const WETH_ADDRESS = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";

export const erc20Interface = new ethers.Interface(erc20abi);
export const abiUniV2Interface = new ethers.Interface(abiUniV2);
