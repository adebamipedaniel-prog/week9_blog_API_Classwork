const express = require("express");

const { 
    postArticle, 
    getAllArticles, 
    getAllArticleById, 
    updateArticleById, 
    deleteArticleById
} = require("../controllers/article.controller.js");

const router = express.Router();

router.post ("/articles",postArticle);

router.get ("/articles",getAllArticles);

router.get ("/articles/:id", getAllArticleById);

router.put ("/articles/:id", updateArticleById);

router.delete ("/articles/:id", deleteArticleById);

module.exports = router;
