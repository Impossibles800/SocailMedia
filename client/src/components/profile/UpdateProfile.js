import React from "react";
import userImg from "../../assets/user.png";

function UpdateProfile() {


    return (
        <div className="UpdateProfile">
            <div className="flex pt-10 ">
                <div className="flex-[1] rounded-[50%] ml-40 text-center">
                    <img className="flex items-center justify-center rounded-[50%]" src={userImg} alt=""/>
                </div>
                <div className=" flex-[3] mr-40">
                    <form className="border border-[color:var(--border-color)] rounded p-5 border-solid">
                        <input
                            className="w-full block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid"
                            type="text" placeholder="Your Name"/>
                        <input
                            className="w-full block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid"
                            type="text" placeholder="Your Bio"/>
                        <input
                            className="w-fit block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid btn-primary"
                            type="submit"/>
                    </form>
                    <button className = "w-fit block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid btn-delete hover:bg-red-500">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;