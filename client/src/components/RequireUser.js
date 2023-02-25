import React from 'react';
import {getItem, KEY_ACCESS_TOKEN} from "../utils/localStorageManager";
import {Navigate, Outlet} from "react-router";

function RequireUser(){
    const user = getItem(KEY_ACCESS_TOKEN);

    return (
      user ? <Outlet /> : <Navigate to={'/signup'}/>
    )
}
export default RequireUser;