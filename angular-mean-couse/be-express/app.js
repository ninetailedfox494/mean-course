const express = require("express");
const mongoose = require('mongoose');

const bodyParser = require("body-parser");

const PostModel = require("./models/postModel");
const { log } = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");

const app = express();
const username = encodeURIComponent("admin");
const password = encodeURIComponent("gWCRg9B8OBac6Wtd");
const cluster = "cluster0.6hfz6.mongodb.net";

const dbName = "node-angular";

let uri = `mongodb+srv://${username}:${password}@${cluster}/node-angular?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(uri)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
    });


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
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
    });
    post.save().then(data => {
        res.status(201).json({ message: "Post added successfully!!", postId: data._id });
    });

});

app.get("/api/posts", (req, res, next) => {
    PostModel.find().then(data => {
        console.log(data);
        res.status(200).json({ message: "Post fetched successfully!!", data });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then(data => {
        res.status(201).json({ message: "Post delete successfully!!" });
    });
});

module.exports = app;
