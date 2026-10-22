const joi = require("joi");

const ArticleModel = require("../models/article.model");

const postArticle = async (req, res, next) => {
  try {
    const newArticle = new ArticleModel({
      title: req.body.title,
      content: req.body.content,
      author: req.user.user.id, // Use the userId from the authenticated user
    });

    await newArticle.save();

    return res.status(200).json({
      message: "Article created",
      data: newArticle,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllArticles = async (req, res, next) => {
  try {
    console.log(req.user); // Log the user object to verify it's available
    const articles = await ArticleModel.find();
    return res.status(200).json({
      message: "Articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllArticleById = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: `Article with id ${req.params.id} not found`
      });
    }
    return res.status(200).json({
      message: "article found",
      data: article,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {
  const articleSchema = joi.object({
    title: joi.string().min(5).optional(),
    content: joi.string().min(20).optional(),
    author: joi.string().optional(),
  });

  const { error, value } = articleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (Object.keys(value).length === 0) {
  return res.status(400).json({ message: "At least one field is required to update" });
}

  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedArticle) {
      return res.status(404).json({
        message: `Article with id ${req.params.id} not found`,
      });
    }

    return res.status(200).json({
      message: "Article updated successfully",
      data: updatedArticle,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      // ✅ FIX: 404 when not found, not 200
      return res.status(404).json({
        message: `Article with id ${req.params.id} not found`,
      });
    }

    // ✅ FIX: return success response when deleted
    return res.status(200).json({
      message: "Article deleted successfully",
      data: deletedArticle,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  postArticle,
  getAllArticles,
  getAllArticleById,
  updateArticleById,
  deleteArticleById,
};