const {success, error} = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");

const createPostController = async (req, res) => {
    try {
        const {caption} = req.body;
        if (!caption) return res.send(error(400, "Caption is required"));
        const owner = req._id;
        const user = await User.findById(req._id);
        const post = await new Post({
            owner,
            caption,
        });
        // console.log(post);

        user.posts.push(post._id);
        await post .save();
        await user.save();
        // console.log(`User email ${user.email}`);
        // console.log(`User posts ${user.posts}`);

        return res.send(success(201, "Post created", post));

    } catch (err) {
        return res.send(error(500, err));
    }
}
const LikeAndUnlikePostController = async (req, res) => {
    const {postId} = req.body;
    const post = await Post.findById(postId);
    const currUserId = req._id;
    try{
        if(!post){
            return res.send(error(404, "Post not found"));
        }
        if(post.likes.includes(currUserId)) {
            const index = post.likes.indexOf(currUserId);
            post.likes.splice(index, 1);
            await post.save();
            return res.send(success(200, "Post unliked", post));
        }
        else{
            post.likes.push(currUserId);
            await post.save();
            return res.send(success(200, "Post liked", post));
        }
    }catch (e) {
        console.log(e);
        return res.send(error(500, "Something went wrong"));
    }
}
const updatePostController = async (req, res) => {
    try {
        const {postId} = req.body;
        const currUserId = req._id;

        const post = await Post.findById(postId);
        if(!post){
            return res.send(error(404, "Post not found"));
        }
        if(post.owner.toString() !== currUserId){
            return res.send(error(403, "You are not authorized to update this post"));
        }
        const {caption} = req.body;
        if(!caption){
            return res.send(error(400, "Caption is required"));
        }
        post.caption = caption;
        await post.save();
        return res.send(success(200, "Post updated", post));
    } catch (e) {
        console.log(e);
        return res.send(error(500, "Something went wrong"));
    }
}
const deletePostController = async (req, res) => {
    try{
        const {postId} = req.body;
        const currUserId = req._id;
        const currUser = await User.findById(currUserId);
        const post = await Post.findById(postId);
        if(!post){
            return res.send(error(404, "Post not found"));
        }
        if(post.owner.toString() !== currUserId){
            return res.send(error(403, "You are not authorized to delete this post"));
        }
        const index = currUser.posts.indexOf(postId);
        currUser.posts.splice(index, 1);
        await currUser.save();
        await post.remove();
        return res.send(success(200, "Post deleted", post));
    }catch (e) {
        console.log(e);
        return res.send(error(500, "Something went wrong"));
    }
}

module.exports = {
    createPostController,
    LikeAndUnlikePostController,
    updatePostController,
    deletePostController
};