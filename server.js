import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// routes
import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("err", error);
  }
};

// app.use(cors({ credentials: true }));
// app.use(cors({ origin: "*", credentials: true }));
app.use(
  cors({ origin: "https://fiverr-test.onrender.com", credentials: true })
);
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// const hostname = "0.0.0.0";
// const port = 3000;

app.listen(process.env.PORT || 5000, () => {
  connection();
  console.log("Backend server is running...");
});
// app.listen(8800, () => {
//   connection();
//   console.log("Backend server is running...");
// });
