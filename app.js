require('dotenv').config();
const express = require('express');
const path = require ('node:path');
const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require('./routers/indexRouter.js');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true} ));
app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});