import LazyLoad from "react-lazy-load";
import { toast } from "react-toastify";
import { useState, useEffect, Suspense } from "react";

import Loading from "../components/Loading";
import { getAllNFTIds, mintNFT } from "../contracts";
import ViewCreatePinModal from "../components/ViewCreatePinModal";

interface ImageData {
  tokenId: number;
  image: string;
}

const CreatePin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

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
          {imageData.map((data, index) => (
            <div key={index} className="d-flex">
              <div className="cursor-zoom-in border-box mb-3">
                <LazyLoad>
                  <Suspense fallback={<Loading isLoading={true} />}>
                    <div className="position-relative">
                      <img
                        className="d-flex h-100 w-100 border-radius-1 object-fit-cover hover-opacity-80"
                        src={data.image}
                        alt={`NFT ${index}`}
                        onClick={() => handleButtonClick(data.tokenId)}
                      />

                      <div className="position-absolute top-0 right-0 mx-3 bg-danger text-white p-1 badge">
                        {data.tokenId}
                      </div>
                    </div>
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
