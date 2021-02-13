const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

/* app.use(express.static(path.join(__dirname, 'client/build'))); */
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

require("./routes/routes.js")(app);

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
}); */

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
