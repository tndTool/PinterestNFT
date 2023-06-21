import LazyLoad from "react-lazy-load";
import { toast } from "react-toastify";
import React, { useState, useEffect, useMemo, Suspense } from "react";

import Loading from "./Loading";
import ViewImageModal from "./ViewImageModal";
import { getNFTImageUrlMetadata } from "../contracts/index";

interface PinProps {
  tokenId: number;
}

interface ImageData {
  tokenId: number;
  image: string;
}

const Pin: React.FC<PinProps> = ({ tokenId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getNFTImageUrlMetadata(tokenId)
      .then((image) => {
        setImageData({
          tokenId: tokenId,
          image: image,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [tokenId]);

  const imageUrl = useMemo(
    () => (imageData?.image ? `${imageData.image}` : ""),
    [imageData]
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!imageData) {
    return null;
  }

  return (
    <>
      <div className="d-flex">
        <div className="cursor-zoom-in border-box mb-3" onClick={openModal}>
          <LazyLoad>
            <Suspense fallback={<Loading isLoading={true} />}>
              <img
                className={`d-flex h-100 w-100 border-radius-1 object-fit-cover hover-opacity-80 ${
                  isLoading ? "d-none" : ""
                }`}
                src={imageUrl}
                alt={`Galverse art ${tokenId}`}
                onLoad={() => setIsLoading(false)}
              />
            </Suspense>
          </LazyLoad>
        </div>
      </div>
      {isModalOpen && (
        <ViewImageModal tokenId={tokenId} closeModal={closeModal} />
      )}
    </>
  );
};

export default Pin;
