import React from "react";
import userImg from "../../assets/user.png";
import './Avatar.scss'
function Avatar({src}) {
    return (
        <div className="Avatar">
            <img className="" src={src ? src : userImg} alt="Avatar"/>

        </div>
    );
}
export default Avatar;