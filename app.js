const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const cors = require("cors");
const authController = require("./controllers/authController");

const app = express();

// middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://shatokens:xFRfXTsUnvzynC40@cluster0.1wwlcgx.mongodb.net/nft?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected to db!"))
  .catch((err) => console.log(err));

// routes
app.post("/validatecoupon", authController.checkCoupon);
app.post("/addwallet", authController.addWallet);
app.post("/addUserLinks", authController.addLink);
app.post("/checkuser", requireAuth);
app.get("/test", (req, res) => res.send("Working"));
app.use(authRoutes);

// server port
app.listen(8000, () => {
  console.log("Server up and running on port 8000..");
});
