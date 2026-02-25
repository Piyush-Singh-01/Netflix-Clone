import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setAuthChecked } from "../redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8000/api/user/current",
          { withCredentials: true }
        );
        dispatch(setUserData(result.data));
      } catch (error) {
        if (error.response?.status !== 401) {
          console.log("Error Fetching user:", error);
        }
        // ⭐ mark auth check completed even if not logged in
        dispatch(setAuthChecked());
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;