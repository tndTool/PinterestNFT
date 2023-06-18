import { FC, Suspense } from "react";
import LazyLoad from "react-lazy-load";
import Loading from "./Loading";

interface Props {
  imageUrls: string[];
}

const ImageList: FC<Props> = ({ imageUrls }) => {
  return (
    <div className="d-flex justify-content-center w-100 h-100 mt-1 overflow-hidden">
      <div className="home-container">
        {imageUrls.map((url, index) => (
          <div key={index} className="d-flex">
            <div className="cursor-zoom-in border-box mb-3">
              <LazyLoad>
                <Suspense fallback={<Loading isLoading={true} />}>
                  <img
                    className="d-flex h-100 w-100 border-radius-1 object-fit-cover hover-opacity-80"
                    src={url}
                    alt=""
                  />
                </Suspense>
              </LazyLoad>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
