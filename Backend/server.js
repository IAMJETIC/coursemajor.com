require('dotenv').config({ path: "../.env" });
require('dotenv').config();
const path = require('path'); //Load file path

const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

//Connect to DB
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Routes
const coursesRouter = require('./routes/courses');
const reviewsRouter = require('./routes/reviews');
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');
const orderRouter = require('./routes/orderRouter.js');
const playlistRouter = require('./routes/videoPlaylist.js');
const privateRouter = require('./routes/private');
const routes = require('./routes/paypal.js');

app.use('/api/paypal', routes());
app.use('/api/courses', coursesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/auth', usersRouter);
app.use('/api/order', orderRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
);



app.use('/api/private', privateRouter);

//Error Handler (Should be the last piece of middleware)
app.use(errorHandler);

// ROUTES
//app.get('/', (req, res) => {
//    res.send('/ page');
//})

const PORT = process.env.PORT || 5000;

//Listening to server
const server = app.listen(PORT, () => { console.log(`Server has started on port ${PORT}`) })

//Handling Server Errors in a nice, readable way
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})
