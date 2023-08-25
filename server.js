const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const cors = require("cors");
app.use(cors());

// app.get("/", cors(), function (req, res) {
//     res.send("Hello World!");
// });

app.post("/uploadresume", async function (req, res) {
    console.log("upload function");

    const { name } = req.body;
    const { uid } = req.body;
    const { file } = req.body;

    try {
        console.log(`backend: ${name} ${uid} ${typeof (file)}`);
        res.status(200).json({ message: `${name}` });
    } catch (e) {
        res.status(200).json({ message: 'error' });
        console.log(`backend: ${e}`);
    }
    // res.redirect("/home");
});

app.get("/viewresume", cors(), async function (req, res) {
    res.send("Hello World!");
    const { name } = req.body || "file received";

    try {

    } catch (e) {
        console.log(e);
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log(`Server started successfully ${PORT}`);
});

