import axios from "axios";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { contractABI } from "./contractABI";
import { contractAddress } from "./contractAddress";

let provider: ethers.providers.Web3Provider;
let signer: ethers.providers.JsonRpcSigner;
let contract: ethers.Contract;

if ((window as any).ethereum) {
  provider = new ethers.providers.Web3Provider((window as any).ethereum);
  signer = provider.getSigner("0x0000000000000000000000000000000000000000");
  contract = new ethers.Contract(contractAddress, contractABI, signer);
} else {
  const error = "Please install Metamark!";
  toast.error(error);
}

export const getContractName = async () => {
  const name: string = await contract.name();
  return name;
};

export const getNFTBalance = async (address: string) => {
  const balance: number = await contract.balanceOf(address);
  return balance;
};

export const getSymbol = async () => {
  const symbol: string = await contract.symbol();
  return symbol;
};

export const getOwner = async () => {
  const owner: string = await contract.owner();
  return owner;
};

export const getOwnerOf = async (tokenId: number) => {
  const ownerOf: string = await contract.ownerOf(tokenId);
  return ownerOf;
};

export const getBaseURIExtended = async () => {
  const uri: string = await contract._baseURIextended();
  return uri;
};

export const getTokenURI = async (tokenId: number) => {
  const uri: string = await contract.tokenURI(tokenId);
  return uri;
};

export const getAllNFTIds = async () => {
  let newIds = [];
  if (contract) {
    const ids = await contract.getAllTokenId();
    for (let i = 0; i < ids.length; i++) {
      newIds.push(ids[i].toNumber());
    }
  }
  return newIds;
};

export const getNFTImageUrlMetadata = async (tokenId: number) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_API_URL as string}/${tokenId}.json`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data.image;
  } catch (error: any) {
    const errorMessage = "Failed to load resource";
    toast.error(errorMessage);
  }
};

export const mintNFT = async (address: string) => {
  try {
    const signer = provider.getSigner();
    const mintNft = await contract.connect(signer).safeMint(address);
    const receipt = await provider.waitForTransaction(mintNft.hash);
    return receipt;
  } catch (err: any) {
    const errorMessage = "Transaction signature was denied";
    toast.error(errorMessage);
  }
};
