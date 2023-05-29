const ArticleModel = require('../models/articleModel');

const getArticle = async (req, res) => {
	const { id } = req.params;
	try {
		const blogFind = await ArticleModel.findOne({ id_article: id });
		if (!blogFind)
			return res
				.status(400)
				.json({ success: false, comments: undefined, error: 'Not articles found!' });
		res.status(200).json({ success: true, comments: blogFind.comments, error: undefined });
	} catch (error) {
		res.status(400).json({ success: false, comments: undefined, error: error.message });
	}
};

const updateArcticle = async (req, res) => {
	const { id_user: iduser, author, comment } = req.body;
	const { idArticle } = req.params;

	const isValidAuthor = validateName(author);
	const isValidComment = validateComment(comment);

	if (isValidAuthor) return res.status(400).json({ success: false, error: isValidAuthor });
	if (isValidComment) return res.status(400).json({ success: false, error: isValidComment });

	try {
		const blog = await ArticleModel.updateOne(
			{ id_article: idArticle },
			{ $push: { comments: { id_user: iduser, author, comment } } }
		);
		if (blog.modifiedCount === 1) return res.status(200).json({ success: true, error: undefined });
		res.status(400).json({ success: true, error: "Somenthing happened, could'nt insert comment" });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
};

const validateName = name => {
	if (name.length < 4 || name.length > 16) return 'Name between 4 and 16 characters';
	if (!/^[a-z0-9]+$/.test(name)) return 'Name only lowercase letters and numbers';
	return '';
};

const validateComment = comment => {
	if (comment.length < 5 || comment.length > 150) return 'Comment between 5 and 150 characters';
	return '';
};

module.exports = { getArticle, updateArcticle };
