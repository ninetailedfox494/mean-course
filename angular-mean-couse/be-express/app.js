const express = require("express");
const mongoose = require('mongoose');

const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");

const { log } = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");

const app = express();
const username = encodeURIComponent("admin");
const password = encodeURIComponent("gWCRg9B8OBac6Wtd");
const cluster = "cluster0.6hfz6.mongodb.net";

const dbName = "node-angular";
//take note: db mongo is cloud
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

app.use("/api/posts", postsRoutes);

module.exports = app;
