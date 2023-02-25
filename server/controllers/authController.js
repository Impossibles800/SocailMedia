const {error, success} = require("../utils/responseWrapper");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");


const signupController = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        if (!email || !password || !name) {
            return res
                .status(400)
                .json(error(400, "All fields are required"));
        }

        const oldUser = await User.findOne({email});
        if (oldUser || await User.findOne({name})) {
            return res.send(error(409, "User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const newUser = await User.findById(user._id);

        return res.json({
            status: "success",
            statusCode: 201,
            message: "User created successfully",
        });
    } catch (e) {
        console.log(e);
    }
};

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.send(error(400, "Please provide email and password"));
        }
        const user = await User.findOne({email}).select("+password");
        if (!user) {
            return res.send(error(404, "User not found"))
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send(error(400, "Invalid password"));
        }

        const accessToken = generateAccessToken({id: user._id});
        const refreshToken = generateRefreshToken({id: user._id});

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
        });
        console.log(`Logged in`);
        return res.send(success(200, "User logged in successfully", {accessToken}));

    } catch (err) {
        console.log(err);
    }
};
const RefreshAccessTokenController = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies.jwt) {
        return res.send(error(404, "Refresh token in Cookie is missing"));
    }
    const refreshToken = cookies.jwt;
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);

        const accessToken = generateAccessToken({id: decoded.id});
        // console.log(`New Access token: ${accessToken}`)
        return res.send(success(201, "Access token generated successfully", {accessToken}));
    } catch (e) {
        console.log(e);
        return res.send(error(401, "Invalid refresh token"));
    }

}

// internal function
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {expiresIn: '7d'});
        // console.log(`Access token: ${token}`);
        return token;
    } catch (e) {
        console.log(e);
    }
}
const generateRefreshToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {expiresIn: '1y'});
        // console.log(`Refresh token: ${token}`);
        return token;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    signupController,
    loginController,
    RefreshAccessTokenController
};
