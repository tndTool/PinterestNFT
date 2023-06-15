import axios from "axios";
import { ethers } from "ethers";
import { contractABI } from "./contractABI";
import { contractAddress } from "./contractAddress";

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner("0x0000000000000000000000000000000000000000");
const contract = new ethers.Contract(contractAddress, contractABI, signer);

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
  const ids = await contract.getAllTokenId();
  let newIds = [];
  for (let i = 0; i < ids.length; i++) {
    newIds.push(ids[i].toNumber());
  }

  return newIds;
};

export const getNFTImageUrlMetadata = async (tokenId: number) => {
  // const baseUrl = await getBaseURIExtended();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:5000/${tokenId.toString()}.json`,
    headers: {},
  };
  return await axios
    .request(config)
    .then((response) => response.data.image)
    .catch((error) => console.log(error));
};

export const mintNFT = async (address: string) => {
  try {
    const signer = provider.getSigner();
    const mintNft = await contract.connect(signer).safeMint(address);
    const receipt = await provider.waitForTransaction(mintNft.hash);
    return receipt;
  } catch (err) {
    alert("This account cannot mint, pls change the account!");
  }
};
