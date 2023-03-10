import React from "react";
import Post from "../post/Post";
import userImg from "../../assets/user.png";
import "./Profile.scss";
import {useNavigate} from "react-router-dom";

function Profile() {

    function navigate() {
        window.location.href = '/update-profile';
    }
    return (
        <div className="Profile">
            <div className="container">
                <div className="left-part">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img className="user-img" src={userImg} alt=""/>
                        <h2 className="username">Username</h2>
                        <div className="bio">
                            <p className="text-sm mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, adipisci, alias,
                                amet
                            </p>
                        </div>
                        <div className="follower-info ">
                            <h4>40 Followers</h4>
                            <h4>40 Following</h4>
                        </div>
                        <div className="">
                            <button className="follow-btn btn-primary">Follow</button>
                            <button className="update-profile btn-secondary" onClick={() => navigate()}>Update Profile
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;