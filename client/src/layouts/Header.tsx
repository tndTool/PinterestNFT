import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { AiFillMessage } from "react-icons/ai";
import { FaPinterest, FaSearch } from "react-icons/fa";
import { IoIosNotifications, IoMdExit } from "react-icons/io";

import blockies from "ethereum-blockies-base64";
import { Web3Provider } from "@ethersproject/providers";

import Avatar from "../components/Avatar";

const LOGIN_TIMESTAMP_KEY = "loginTimestamp";
const LOGIN_EXPIRATION_TIME = 12 * 60 * 60 * 1000;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

  useEffect(() => {
    const loginTimestamp = localStorage.getItem(LOGIN_TIMESTAMP_KEY);
    if (loginTimestamp) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(loginTimestamp);
      if (elapsedTime > LOGIN_EXPIRATION_TIME) {
        localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
        localStorage.removeItem("isLoggedIn");
      } else {
        setIsConnected(true);
      }
    } else {
      setIsConnected(false);
    }
  }, [location]);

  useEffect(() => {
    if (isSignedOut) {
      setIsConnected(false);
    }
  }, [isSignedOut]);

  const toggleWalletConnection = async () => {
    try {
      const provider = new Web3Provider(window.ethereum);
      if (isConnected) {
        await window.ethereum.request({ method: "eth_logout" });
        setIsConnected(false);
        localStorage.setItem("isLoggedIn", "false");
      } else {
        await provider.send("wallet_requestPermissions", [
          { eth_accounts: {} },
        ]);
        setIsConnected(true);
        localStorage.setItem(LOGIN_TIMESTAMP_KEY, Date.now().toString());
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleConnect = async () => {
    toggleWalletConnection();
  };

  const onSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem(LOGIN_TIMESTAMP_KEY);
    setIsSignedOut(true);
    navigate("/");
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const ownerAddress = accounts[0].toLowerCase();

          const avatarDataUrl = blockies(ownerAddress);
          setAvatar(avatarDataUrl);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (isConnected) {
      getAddress();
    }
  }, [isConnected]);

  return (
    <div className="d-flex align-items-center p-3 text-dark bg-light">
      <div className="mx-3">
        <FaPinterest
          className="text-primary fs-1 pointer cursor-pointer h-2  circle-hover"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="md-display-none mx-1">
        <button
          className="d-flex h-3 w-6 align-items-center justify-content-center border-radius-2 bg-dark"
          onClick={() => navigate("/")}
        >
          <span className="text-white font-weight-bold">Home</span>
        </button>
      </div>

      <NavDropdown title="Create" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => navigate("/create")}>
          Create pin
        </NavDropdown.Item>
      </NavDropdown>

      <div className="flex-075 IconSearchPC">
        <form className="d-flex flex-1 px-1 border-secondary border-radius-4">
          <div className="d-flex align-items-center h-3 w-100 border-radius-4 ml-1 border-none bg-light px-1 cursor-pointer">
            <FaSearch className="m-2" />
            <input
              className="w-100 border-none bg-light h-100 border-radius-4 outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
        </form>
      </div>

      <div className="flex-075 IconSearchMobile">
        <FaSearch className="fs-4 cursor-pointer text-secondary mx-2 circle-hover" />
      </div>

      <div className="d-flex align-items-center justify-content-around ml-1 flex-025">
        <div className="cursor-pointer position-relative">
          <IoIosNotifications
            title="Notifications"
            className="fs-1 cursor-pointer text-secondary circle-hover mx-2"
          />
        </div>

        <div className="cursor-pointer position-relative">
          <AiFillMessage
            title="Message"
            className="fs-1 cursor-pointer text-secondary circle-hover mx-2"
          />
        </div>

        {isConnected ? (
          <>
            <Avatar
              src={avatar}
              alt="Avatar"
              className="rounded-circle circle-hover h-2  mx-2"
              title="Profile"
              onClick={() => navigate("/profile")}
            />

            <div className="cursor-pointer position-relative">
              <IoMdExit
                title="Exit"
                className="fs-1 cursor-pointer text-secondary circle-hover mx-2"
                onClick={onSignOut}
              />
            </div>
          </>
        ) : (
          <button
            className="d-flex h-3 mx-2 w-6 align-items-center justify-content-center border-radius-2 bg-danger border-none"
            onClick={handleConnect}
          >
            <span className="text-white font-weight-bold">Connect</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
