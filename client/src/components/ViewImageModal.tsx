import { useState, useEffect, useMemo, useRef } from "react";
import Loading from "./Loading";
import { RootState } from "../redux/store";

import { useDispatch, useSelector } from "react-redux";
import { setViewedTokenId } from "../redux/image-modal/imageModalSlice";
import { getOwnerOf } from "../contracts/index";

interface Metadata {
  tokenId: number;
  name?: string;
  description?: string;
  image?: string;
}

interface ViewImageModalProps {
  tokenId: number;
  closeModal: () => void;
}

interface ImageModalState extends RootState {
  imageModal: {
    value: number | null;
    viewedTokenId: number | null;
  };
}

const ViewImageModal = ({
  tokenId: propsTokenId,
  closeModal,
}: ViewImageModalProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ownerOf, setOwnerOf] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const tokenId = useSelector(
    (state: ImageModalState) => state.imageModal.viewedTokenId
  );

  useEffect(() => {
    if (tokenId === null) {
      dispatch(setViewedTokenId(propsTokenId));
    }

    setIsLoading(true);
    Promise.all([
      getOwnerOf(propsTokenId),
      fetch(`http://localhost:5000/${propsTokenId.toString()}.json`).then(
        (response) => response.json()
      ),
    ])
      .then(([owner, metadata]) => {
        setOwnerOf(owner);
        setMetadata(metadata);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [dispatch, propsTokenId, tokenId]);

  const memoizedMetadata = useMemo(() => metadata, [metadata]);
  const memoizedOwnerOf = useMemo(() => ownerOf, [ownerOf]);

  const { name, description, image } = memoizedMetadata ?? {};

  const handleImageClick = () => {
    dispatch(setViewedTokenId(propsTokenId));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal, modalRef]);

  return (
    <>
      <Loading isLoading={isLoading && tokenId === propsTokenId} />
      <div className="modal fade show" style={{ display: "block" }}>
        <div
          className="modal-dialog modal-dialog-centered modal-lg "
          ref={modalRef}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  {memoizedMetadata && (
                    <img
                      src={image}
                      alt={`NFT ${propsTokenId}`}
                      className="img-fluid rounded"
                      style={{ height: "400px", width: "auto" }}
                      onClick={handleImageClick}
                    />
                  )}
                </div>
                <div className="col-md-6">
                  {memoizedMetadata && (
                    <>
                      <h2>{name}</h2>
                      <p>{description}</p>
                      <p className="font-weight-bold">
                        Owner: {memoizedOwnerOf}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ViewImageModal;
