const User = require('../models/User');
const Post = require('../models/Post');
const {error, success} = require('../utils/responseWrapper');
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
            'owner':{
                '$in': currUser.followings
            }
        });
        return res.send(success(200, "Posts of followings", posts));
    } catch (e) {
        console.log(e);
        return res.send(error(500, "Something went wrong"));
    }
}


module.exports = {followUnfollowUserController, getPostsOfFollowingsController};

//getMyPostsController
//getUsersPostsController
//deletePostController