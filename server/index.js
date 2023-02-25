const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const morgan = require('morgan');
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config('./.env');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// routes
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
const PORT = process.env.PORT || 4000;

dbConnect().then(() => {

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



