// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { ToastContainer, toast,Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // ✅ must import styles
// import store from './redux/store.jsx'
// import {Provider} from "react-redux"


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    <BrowserRouter>
//      <Provider store={store}>
//        <App />
//        <ToastContainer
//          position="top-center"
//          autoClose={300}
//          hideProgressBar={false}
//          newestOnTop={false}
//          closeOnClick={false}
//          rtl={false}
//          // pauseOnFocusLoss
//          draggable
//          pauseOnHover
//          theme="colored"
//          transition={Bounce}
//          />
//       </Provider>
     
//    </BrowserRouter>
//   </StrictMode> 


// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store.jsx';
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={300}
          theme="colored"
          transition={Bounce}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
