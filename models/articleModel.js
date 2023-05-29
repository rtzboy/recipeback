const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const commentSchema = new Schema({
	id_user: {
		type: String,
		require: true
	},
	author: {
		type: String,
		require: true,
		trim: true
	},
	comment: {
		type: String,
		require: true,
		trim: true
	}
});

const articleSchema = new Schema(
	{
		id_article: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		comments: [commentSchema]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
