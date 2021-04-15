const express = require("express");
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use("/dist", express.static(path.join(__dirname, '../src')) )

app.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
});
