import React from "react";
import "./Feed.scss";
import Post from "../post/Post";
import Follower from "../follower/Follower";
function Feed(){

    return (
        <div className="Feed">
            <div className="container">
               <div className="left-part">
                   <Post/>
                   <Post/>
                   <Post/>
                   <Post/>
               </div>
                <div className="right-part">
                    <div className="mt-8 mx-10">
                        <h3 className="mb-4">
                            You are Following
                        </h3>
                        <Follower/>
                    </div>
                    <div className="mt-12 mx-10">
                        <h3 className="mb-4">Suggested For You</h3>
                        <Follower/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;