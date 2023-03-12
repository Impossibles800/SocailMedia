import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosClient} from "../../utils/axiosClient";


export const getMyInfo = createAsyncThunk('user/getMyInfo', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('/user/getMyInfo');
        console.log('Api Called Data :',response.data);
        return response.data;
    } catch (e) {
        return Promise.reject(e.response.data);
    } finally {
        thunkAPI.dispatch(setLoading(false));
    }
});

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        myProfile: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload.user;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload;
        })
    }
});

export default appConfigSlice.reducer;
export const {setLoading} = appConfigSlice.actions;

