// displaying the contents of the database -Post

const Post = require('/models/Post');


const print = async () => {
    const post = await Post.find();
    console.log(post);
}

print();