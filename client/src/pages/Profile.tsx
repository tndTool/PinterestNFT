import LazyLoad from "react-lazy-load";
import { useEffect, useState, useMemo, Suspense } from "react";
import {
  getNFTOwner,
  getAllNFTTokenIds,
  getNFTImageUrl,
} from "../contracts/getNFTContracts";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import Loading from "../components/Loading";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
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

  const [imageUrls, setImageUrls] = useState<string[]>([]);

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

          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
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
                <img
                  src="https://www.scoliosis-rehabilitation.com/mymedia/2016/06/no-face.png"
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
      <br />
      <div className="d-flex justify-content-center w-100 h-100 mt-1 overflow-hidden">
        <div className="home-container">
          <Loading isLoading={isLoading} />
          {imageUrls.map((url, index) => (
            <div key={index} className="d-flex">
              <div className="cursor-zoom-in border-box mb-3">
                <LazyLoad>
                  <Suspense fallback={<Loading isLoading={true} />}>
                    <img
                      className="d-flex h-100 w-100 border-radius-1 object-fit-cover hover-opacity-80"
                      src={url}
                      alt={`NFT ${index}`}
                    />
                  </Suspense>
                </LazyLoad>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
