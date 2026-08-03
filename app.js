const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const companiesRouter = require("./routes/companiesRouter");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/home", indexRouter);
app.use("/companies", companiesRouter)
app.get("/", (req, res) => {
  res.redirect("/home");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}`);
});