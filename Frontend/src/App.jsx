import Register from "./Register";
import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";

function App() {
  useGetCurrentUser();

  const { userData, isAuthChecked } = useSelector((store) => store.user);

  // ⏳ Wait until auth check completes
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={userData ? <Navigate to="/home" /> : <Login />} />
      <Route
        path="/register"
        element={userData ? <Navigate to="/home" /> : <Register />}
      />
      <Route
        path="/home"
        element={userData ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path="/search"
        element={userData ? <Search /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;