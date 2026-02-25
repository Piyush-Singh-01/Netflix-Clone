import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setUserData } from "./redux/userSlice";
import bgImage from "./assets/Netflix-Background.jpg";

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.user.isLoading);

  const [info, setInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    if (!info.email || !info.password) {
      toast.warning("All fields are required");
      dispatch(setIsLoading(false));
      return;
    }

    try {
      const response = await axios.post(
        "https://netflix-clone-backend-r3mc.onrender.com/api/auth/login",
        info,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(setUserData(response.data.user));
        toast.success("Login Successful");
        navigate("/home");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
   <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>   
     <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-3 rounded bg-gray-800 focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            value={info.email}
            onChange={handleInput}
          />
          <input
            className="p-3 rounded bg-gray-800 focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
            value={info.password}
            onChange={handleInput}
          />

          <button
            className="bg-[#E50914] py-3 rounded font-semibold hover:bg-red-700 transition"
            type="submit"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 text-center">
          New to Netflix?
          <Link to="/register" className="text-[#E50914] ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
