const express = require("express");

const PostModel = require("../models/postModel");

const router = express.Router();

router.post("", (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
    });
    post.save().then(data => {
        res.status(201).json({ message: "Post added successfully!!", postId: data._id });
    });

});

router.put("/:id", (req, res, next) => {
    const post = new PostModel({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
    });
    PostModel.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Post updated successfully!!" });
    });
}
);

router.get("", (req, res, next) => {
    PostModel.find().then(data => {
        console.log(data);
        res.status(200).json({ message: "Post fetched successfully!!", data });
    });
});

router.delete("/:id", (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then(data => {
        res.status(201).json({ message: "Post delete successfully!!" });
    });
});

router.get("/:id", (req, res, next) => {
    PostModel.findById(req.params.id).then(data => {
        if (data) {
            res.status(200).json({ message: "Post fetched successfully!!", data });
        } else {
            res.status(404).json({ message: "Post not found!!" });
        }
    });
}
);

module.exports = router;