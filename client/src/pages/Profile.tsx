import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { ethers } from "ethers";
import blockies from "ethereum-blockies-base64";

import {
  getNFTOwner,
  getAllNFTTokenIds,
  getNFTImageUrl,
} from "../contracts/getNFTContracts";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import ImageList from "../components/ImageList";

const Profile = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const memoizedImageUrls = useMemo(() => {
    const getImageUrls = async () => {
      const tokenIds = await getAllNFTTokenIds();
      const ownerTokenIds = await Promise.all(
        tokenIds.map(async (id) => {
          const owner = await getNFTOwner(id);
          return owner.toLowerCase() === address ? id : null;
        })
      );
      const urls = await Promise.all(
        ownerTokenIds
          .filter((id) => id !== null)
          .map(async (id) => {
            return await getNFTImageUrl(id as number);
          })
      );
      return urls;
    };
    return getImageUrls();
  }, [address]);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const getAddress = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const ownerAddress = accounts[0].toLowerCase();
          setAddress(ownerAddress);

          const balanceInWei = await window.ethereum.request({
            method: "eth_getBalance",
            params: [ownerAddress, "latest"],
          });
          const balanceInEther = ethers.utils.formatEther(balanceInWei);
          setBalance(balanceInEther);

          const urls = await memoizedImageUrls;
          setImageUrls(urls);

          // Generate avatar based on account address
          const avatarDataUrl = blockies(ownerAddress);
          setAvatar(avatarDataUrl);

          setIsLoading(false);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    getAddress();

    return () => {
      setImageUrls([]);
    };
  }, [isLoggedIn, navigate, memoizedImageUrls]);

  return (
    <div className="h-100">
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-12 col-xl-4">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <div className="mt-3 mb-4">
                <Avatar
                  src={avatar}
                  alt="Avatar"
                  className="rounded-circle img-fluid w-25"
                />
              </div>
              <h5 className="mb-4">{address}</h5>
              <p className="text-dark mb-4">
                Balance: <span className="text-danger"> {balance} ETH</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <Loading isLoading={isLoading} />
      <ImageList imageUrls={imageUrls} />
    </div>
  );
};

export default Profile;
