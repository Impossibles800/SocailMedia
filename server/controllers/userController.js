const User = require('../models/User');
const Post = require('../models/Post');
const {error, success} = require('../utils/responseWrapper');
const {raw} = require("express");
const followUnfollowUserController = async (req, res) => {
    const {userIdToFollow} = req.body;
    const currUserId = req._id;

    try {
        const userToFollow = await User.findById(userIdToFollow);
        const currUser = await User.findById(currUserId);
        if (!userToFollow) {
            return res.send(error(404, "User not found"));
        }
        if (currUserId === userIdToFollow) {
            return res.send(error(409, "You cannot follow yourself"));
        }
        if (currUser.followings.includes(userIdToFollow)) {
            const followingIndex = currUser.followings.indexOf(userIdToFollow);
            currUser.followings.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(currUserId);
            userToFollow.followers.splice(followerIndex, 1);

            await userToFollow.save();
            await currUser.save();

            return res.send(success(200, "User Unfollowed", currUser));
        } else {
            userToFollow.followers.push(currUserId);
            currUser.followings.push(userIdToFollow);
            await currUser.save();
            await userToFollow.save();
            return res.send(success(200, "User Followed", currUser));
        }

    } catch (e) {
        console.log(e);
        return res.send(error(500, "Something went wrong"));
    }
}
const getPostsOfFollowingsController = async (req, res) => {

    try {
        const currUserId = req._id;
        const currUser = await User.findById(currUserId);
        const posts = await Post.find({
            'owner': {
                '$in': currUser.followings
            }
        }).populate('likes');
        return res.send(success(200, "Posts of followings", posts));
    } catch (e) {
        console.log(e);
        return res.send(error(500, "Something went wrong"));
    }
}
const getMyPostsController = async (req, res) => {
    try {
        const currUserId = req._id;
        const allPosts = await Post.find({
            owner: currUserId
        }).populate('likes');
        return res.send(success(201, " ", allPosts));
    } catch (e) {
        console.log(e);
    }
}
const getUserPost = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.send(error(400, "User Id is required"));
        }
        const allUserPost = await Post.find({
            owner: userId
        }).populate('likes');
        return res.send(success(201, "", allUserPost))

    } catch (e) {
        console.log(e)
    }
}
const deleteMyProfile = async (req, res) => {
    try {
        const userId = req._id;
        const currUser = await User.findById(userId);

        //   delete all Posts
        await Post.deleteMany({
            owner: currUser
        })

        currUser.followers.forEach(async (followerId) => {
            const follower = await User.findById(followerId);
            const index = follower.followings.indexOf(currUser);
            if (index !== -1) {
                follower.followings.splice(index, 1);
                await follower.save();
            }
        });
        currUser.followings.forEach(async (followingId) => {
            const following = await User.findById(followingId);
            const index = following.followers.indexOf(currUser);
            if (index !== -1) {
                following.followers.splice(index, 1);
                await following.save();
            }
        });

        // removing likes
        const allPosts = await Post.find();
        allPosts.forEach(async (post) => {
                const index = post.likes.indexOf(currUser);
                if (index !== -1) {
                    post.likes.splice(index, 1);
                    await post.save();
                }
            }
        );

        await currUser.remove();

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(201, "User deleted"));

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    followUnfollowUserController,
    getPostsOfFollowingsController,
    getMyPostsController,
    getUserPost,
    deleteMyProfile
};
