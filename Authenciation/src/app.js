const express = require('express');
const authRoutes = require('./routes/auth.route');
const psotRoutes = require('./routes/post.route');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json());

// Use auth routes they will be prefixed with /api/auth this means that all routes defined in auth.route.js will be accessed with /api/auth prefix
app.use('/api/auth', authRoutes);

app.use('/api/post', psotRoutes);



module.exports = app;