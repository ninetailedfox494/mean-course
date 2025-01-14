const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization"
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH , PUT, DELETE, OPTIONS');
    next();
});

app.post("/api/posts", (req, res, next) => {
    const params = req.body;
    console.log(params);
    res.status(201).json({ message: "Post added successfully!!" });
});

app.get("/api/posts", (req, res, next) => {
    const data = [
        {
            id: 1,
            title: "First Post",
            content: "This is the first post!",
        },
        {
            id: 2,
            title: "Second Post",
            content: "This is the second post!",
        },
        {
            id: 3,
            title: "Third Post",
            content: "This is the third post!",
        },
    ];

    res.status(200).json({ message: "Post fetched successfully!!", data });
});

module.exports = app;
