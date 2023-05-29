require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('../routes/articleRouter');
const morgan = require('morgan');
const app = express();

// middleware
app.use(express.json());
app.use(morgan('short'));
app.use(cors());

// routes
app.use('/articles', blogRouter);

// connect mongodb and listen
mongoose
	.connect(process.env.DBURL)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('Connected to the database and start server on port', process.env.PORT);
		});
	})
	.catch(err => console.log(err));
