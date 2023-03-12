import React, {useEffect, useState} from "react";
import userImg from "../../assets/user.png";
import {useSelector} from "react-redux";
import './UpdateProfile.scss';

function UpdateProfile() {
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [userImage, setUserImgage] = useState("");


    useEffect(() => {
        setName(myProfile?.name);
        setBio(myProfile?.bio);
        setUserImgage(myProfile?.avatar?.url);
    }, [myProfile]);

    function handleUserImageChange(event) {
        const file = event.target.files[0];
        const FileReader = new FileReader();
        FileReader.readAsDataURL(file);
        FileReader.onload = () => {
            if(FileReader.readyState === FileReader.DONE){
                setUserImgage(FileReader.result);
            }
        }
    }

    return (
        <div className="UpdateProfile">
            <div className="flex pt-10 ">
                <div className="flex-[1] rounded-[50%] ml-40 text-center">
                    {/*<img className="flex items-center justify-center rounded-[50%]" src={userImg} alt=""/>*/}
                    <div className="input-user-img">
                        <label htmlFor="userImage" className="lableImg">
                            <img src={userImage} alt={name}/>
                        </label>
                        <input type="file" className="InputImg" accept="image/*" onChange={handleUserImageChange}/>
                    </div>
                </div>
                <div className=" flex-[3] mr-40">
                    <form className="border border-[color:var(--border-color)] rounded p-5 border-solid">
                        <input
                            className="w-full block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid"
                            type="text" placeholder="Your Name" value={name}
                            onChange={(event) => setName(event.target.value)}/>
                        <input
                            className="w-full block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid"
                            type="text" placeholder="Your Bio" value={bio}
                            onChange={(event) => setBio(event.target.value)}/>
                        <input
                            className="w-fit block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid btn-primary"
                            type="submit"/>
                    </form>
                    <button
                        className="w-fit block rounded border border-[color:var(--border-color)] mt-4 px-4 py-2 border-solid btn-delete hover:bg-red-500">Delete
                        Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;