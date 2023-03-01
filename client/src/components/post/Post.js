import React from 'react';
import Avatar from "../avatar/Avatar";
import './Post.scss'
import backgroundImg from '../../assets/nature.png'
import {AiOutlineHeart} from "react-icons/ai";

function Post() {
    return (
        <div className="Post p-8 ">
            <div className=" flex mt-2 items-center mx-7 ml-3 gap-2 m-7 p-1 h-16">
                <Avatar/>
                <h4>Abhiraj</h4>
            </div>
            <div className="flex items-center">
                <img src={backgroundImg} alt="nature"/>
            </div>
            <div className="p-2 mt-4">
                <div className="flex items-center gap-3">
                    <AiOutlineHeart className=""/>
                    <h4>4 likes</h4>
                </div>
            </div>
            <p className="mt-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci doloremque, quis. Adipisci architecto
                est excepturi illo impedit modi nisi sequi sint! A at eos magni nobis quidem quisquam repellendus
                rerum.</p>
            <h6 className="text-blue-200 mt-4 text-sm">4 hrs ago</h6>
        </div>
    );
}

export default Post;