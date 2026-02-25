//userSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoading: false,
    isAuthChecked: false, // ⭐ new flag
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthChecked = true;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export const { setUserData, setIsLoading, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;





















// //info.jsx
// import axios from "axios";
// import {createContext, useEffect, useState, useContext } from "react";

// //step 1

// export const InfoContext = createContext();

// //step 2

// export const InfoProvider = ({children}) =>{
//     const [userdata, setUserdata] = useState(null);
   
//     const userInfo = async()=>{
//         try {
//             const response = await axios.get("http://localhost:8000/api/auth/user",{
                   
//                 withCredentials: true
//             });
              
//               if(response.status === 200){
//                 console.log("user data", response.data);
//                 setUserdata(response.data);
//               }

              
//         } catch (error) {
//             console.log("Error fetching user info:", error);
//         }
//     }
//         useEffect(()=>{
//             userInfo();
//         },[]);

//         return(
//             <InfoContext.Provider value={{userdata}}>
//                    {children}
//             </InfoContext.Provider>
//         )
    
// }

// export const useInfo = ()=>{
//     return useContext(InfoContext);
// }

