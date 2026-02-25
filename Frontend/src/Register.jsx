import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setIsLoading } from './redux/userSlice';
import bgImage from "./assets/Netflix-Background.jpg";

function Register() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.user.isLoading);

  const [info, setInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInfo({
        ...info,
        [name]: value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    try {
      const response = await axios.post(
        "https://netflix-clone-backend-r3mc.onrender.com/api/auth/register",
        info,
        { withCredentials: true }
      );
      console.log(response.data.user);
      dispatch(setUserData(response.data.user));
      toast.success(response.msg);
      navigate("/home");
    } catch (error) {
      toast.error(response.data.msg);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-cover bg-center"
     style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="p-3 bg-gray-800 rounded" name="username" placeholder="Username" onChange={handleInput} />
          <input className="p-3 bg-gray-800 rounded" name="email" placeholder="Email" onChange={handleInput} />
          <input className="p-3 bg-gray-800 rounded" name="phone" placeholder="Phone" onChange={handleInput} />
          <input className="p-3 bg-gray-800 rounded" name="password" placeholder="Password" onChange={handleInput} />

          <button className="bg-[#E50914] py-3 rounded font-semibold hover:bg-red-700">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-300">
          Already have an account?
          <Link to="/" className="text-[#E50914] ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
