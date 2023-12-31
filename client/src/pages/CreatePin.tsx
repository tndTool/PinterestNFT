import LazyLoad from "react-lazy-load";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Suspense, useRef, useMemo } from "react";

import Loading from "../components/Loading";
import { getAllNFTIds, mintNFT } from "../contracts";
import ViewCreatePinModal from "../components/ModalCreatePin";

interface ImageData {
  tokenId: number;
  image: string;
}

const CreatePin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  const navigate = useNavigate();
  const hasDisplayedToast = useRef<boolean>(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn && !hasDisplayedToast.current) {
      toast.error("Sign in first!");
      navigate("/");
      hasDisplayedToast.current = true;
    }
  }, [isLoggedIn, navigate]);

  const memoizedImageData = useMemo(() => imageData, [imageData]);

  useEffect(() => {
    async function fetchData() {
      const ownedTokenIds = await getAllNFTIds();

      const imagePromises = [];
      for (let i = 1; i <= 100; i++) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL as string}/${i}.json`
        );
        const nft = await response.json();
        const imageUrl = nft.image;

        if (!ownedTokenIds.includes(i)) {
          imagePromises.push({
            tokenId: i,
            image: imageUrl,
          });
        }
      }

      const imageData = await Promise.all(imagePromises);

      setImageData(imageData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleButtonClick = (tokenId: number) => {
    setSelectedToken(tokenId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalYes = async () => {
    setShowModal(false);
    if (!selectedToken) {
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await mintNFT(accounts[0]);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleModalNo = () => {
    setShowModal(false);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="d-flex justify-content-center w-100 h-100 mt-1 overflow-hidden">
        <div className="home-container">
          {memoizedImageData.map(({ tokenId, image }, index) => (
            <div key={tokenId} className="d-flex">
              <div className="cursor-zoom-in border-box mb-3">
                <LazyLoad>
                  <Suspense fallback={<Loading isLoading={true} />}>
                    <img
                      className="d-flex h-100 w-100 border-radius-1 object-fit-cover hover-opacity-80"
                      src={image}
                      alt={`NFT ${index}`}
                      onClick={() => handleButtonClick(tokenId)}
                    />
                  </Suspense>
                </LazyLoad>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ViewCreatePinModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        handleModalNo={handleModalNo}
        handleModalYes={handleModalYes}
      />
    </>
  );
};

export default CreatePin;
