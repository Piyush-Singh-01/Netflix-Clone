// Header.jsx
import axios from "axios";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.user.userData);

  // Logout User
  const logoutHandler = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error?.response?.data?.message || "Logout Failed");
    }
  };

  // Toggle Search Page
  const toggleHandler = () => {
    const newValue = !isSearchOpen;
    setIsSearchOpen(newValue);
    navigate(newValue ? "/search" : "/home");
  };

  return (
    <nav className="navbar">
      <div className="head">
        <h1 className="netflix-text">NETFLIX</h1>

        <div className="info">
          <h2>{userData?.username || "Hero"}</h2>

          <div className="btn">
            <button
              className="head-btn"
              onClick={logoutHandler}
              type="button"
            >
              Logout
            </button>

            <button
              onClick={toggleHandler}
              className="head-btn"
              type="button"
            >
              {isSearchOpen ? "Home" : "Search Movie"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;