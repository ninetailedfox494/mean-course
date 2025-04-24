const express = require("express");
const multer = require("multer");

const PostModel = require("../models/postModel");
const { log } = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");
const MINE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
}

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "be-express/images");    
    },
    filename: (req, file, cb) => { 
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MINE_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.post("",multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then(data => {
        res.status(201).json({ message: "Post added successfully!!", post: {
            ...data,
            id : data._id,
        }});
    });

});

router.put("/:id",multer({storage: storage}).single('image'), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const post = new PostModel({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    PostModel.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Post updated successfully!!", imagePath: imagePath });
    });
}
);

router.get("", (req, res, next) => {
    PostModel.find().then(data => {
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