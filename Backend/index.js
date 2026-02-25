// //index.js
// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./utils/Database");
// const authRoute = require('./router/auth-router');
// const userRouter = require("./router/user-router")
// const cookieParser = require("cookie-parser");
// const app = express();
// const cors = require("cors");

// const corsOptions = {
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true
// }

// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.json());

// app.use("/api/auth", authRoute);
// app.use("/api/user", userRouter)

// const PORT = process.env.PORT || 3000

// connectDB().then(()=>{
//    app.listen(PORT, ()=>{
//     console.log(`Backend is running on port ${PORT}`);
// })})

require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/Database");
const authRoute = require('./router/auth-router');
const userRouter = require("./router/user-router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
});