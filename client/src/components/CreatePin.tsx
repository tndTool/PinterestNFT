import LazyLoad from "react-lazy-load";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, Suspense } from "react";

import Loading from "../components/Loading";
import { mintNFT } from "../contracts/index";

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
      const imagePromises = [];
      for (let i = 1; i <= 1; i++) {
        const response = await fetch(`http://localhost:5000/${i}.json`);
        const nft = await response.json();
        const imageUrl = nft.image;
        imagePromises.push({
          tokenId: i,
          image: imageUrl,
        });
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

      const receipt = await mintNFT(accounts[0]);
      console.log(receipt);
      // Perform other actions as needed
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  const handleModalNo = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Loading isLoading={isLoading} />
      {imageData.map((data) => (
        <LazyLoad>
          <Suspense fallback={<Loading isLoading={true} />}>
            <img
              className="hover-opacity-80 cursor-pointer"
              style={{ height: "400px", width: "auto" }}
              src="https://allthings.how/content/images/wordpress/2021/12/allthings.how-what-does-it-mean-to-mint-an-nft-mint-nft.png"
              alt={`NFT`}
              onClick={() => handleButtonClick(data.tokenId)}
            />
          </Suspense>
        </LazyLoad>
      ))}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you want to mint this image?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have selected NFT</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalNo}>
            No
          </Button>
          <Button variant="danger" onClick={handleModalYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePin;
