import React from "react";
import Avatar from "../avatar/Avatar";
import './Follower.scss'
function Follower(){
    return (
        <div className="flex justify-between mb-10">
            <Avatar/>
            <h4>Robin</h4>
            <h5 className="hover-link follow-link">Follow</h5>
        </div>
    )
}
export default Follower;