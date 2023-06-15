import { getOwnerOf, getAllNFTIds, getNFTImageUrlMetadata } from "./index";

// Get the owner of a specific NFT token ID
async function getNFTOwner(tokenId: number): Promise<string> {
  return await getOwnerOf(tokenId);
}

// Get the balance of NFTs owned by an address
async function getNFTBalance(address: string): Promise<number> {
  return await getNFTBalance(address);
}

// Get an array of all NFT token IDs
async function getAllNFTTokenIds(): Promise<number[]> {
  return await getAllNFTIds();
}

// Get the IPFS URL of the image for a specific NFT token ID
async function getNFTImageUrl(tokenId: number): Promise<string> {
  const imageUrlMetadata = await getNFTImageUrlMetadata(tokenId);
  return `${imageUrlMetadata}`;
}

export { getNFTOwner, getAllNFTTokenIds, getNFTImageUrl, getNFTBalance };
