const express = require("express");

const requireAuth = require("../middlewares/requireAuth.js");
const { 
    postArticle, 
    getAllArticles, 
    getAllArticleById, 
    updateArticleById, 
    deleteArticleById
} = require("../controllers/article.controller.js");

const router = express.Router();

router.post ("/articles", requireAuth, postArticle);

router.get ("/articles", requireAuth, getAllArticles);

router.get ("/articles/:id", requireAuth, getAllArticleById);

router.put ("/articles/:id", updateArticleById);

router.delete ("/articles/:id", deleteArticleById);

module.exports = router;
