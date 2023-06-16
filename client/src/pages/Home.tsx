import { useEffect, useState } from "react";

import Pin from "../components/Pin";
import Loading from "../components/Loading";
import { getAllNFTIds } from "../contracts";

const Home = () => {
  const [ids, setIds] = useState([] as number[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllIds = async () => {
      setIsLoading(true);
      const ids = await getAllNFTIds();
      setIds(ids);
      setIsLoading(false);
    };
    getAllIds();
  }, [ids.length]);

  return (
    <div className="d-flex justify-content-center w-100 h-100 mt-1 overflow-hidden">
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <div className="home-container">
          {ids.map((tokenId) => (
            <Pin key={tokenId} tokenId={tokenId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
