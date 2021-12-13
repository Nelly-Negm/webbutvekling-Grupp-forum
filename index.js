const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const router = require("./api/API")
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "client")))

//The connection key to the databas.
mongoose.connect("mongodb+srv://OtakuForumJensen:rEx9nAGlVclnBv1w@otaku-forum-db.8xpz5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
    () => console.log("Connected to db")
  );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));