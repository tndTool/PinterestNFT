import React, { useEffect, useState } from "react";
import Pin from "../components/Pin";
import { getAllNFTIds } from "../contracts";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [ids, setIds] = useState([] as number[]);

  useEffect(() => {
    const getAllIds = async () => {
      const ids = await getAllNFTIds();
      setIds(ids);
    };
    getAllIds();
  }, [ids.length]);

  return (
    <div className="d-flex justify-content-center w-100 h-100 mt-1 overflow-hidden">
      <div className="home-container">
        {ids.map((tokenId) => (
          <Pin key={tokenId} tokenId={tokenId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
