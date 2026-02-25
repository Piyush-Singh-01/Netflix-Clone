import axios from "axios";
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

  const logoutHandler = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {}, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  const toggleHandler = () => {
    const newValue = !isSearchOpen;
    setIsSearchOpen(newValue);
    navigate(newValue ? "/search" : "/home");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl md:text-3xl font-bold text-[#E50914] tracking-widest">
          NETFLIX
        </h1>

        <div className="flex items-center gap-4">
          <h2 className="hidden sm:block text-gray-300 font-medium">
            {userData?.username || "Hero"}
          </h2>

          <button
            onClick={toggleHandler}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition"
          >
            {isSearchOpen ? "Home" : "Search"}
          </button>

          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-[#E50914] hover:bg-red-700 rounded-md text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;