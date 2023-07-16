import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null, 
    jwt: null,
    posts: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode: (state) =>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.jwt = action.payload.jwt;
        },
        setLogout: (state) => {
            state.user = null;
            state.jwt = null;
        },
        setFriends: (state, action) => {
           if(state.user){
            state.user.friends = action.payload.friends;
           } else {
            console.error("User friends non-existent");
           }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
           const updatedPost = state.posts.map((post) => {
              if(post._id === action.payload.post_id) return action.payload.post;
              return post;
           });
           state.posts = updatedPost;
        },

    }
})

export default authSlice.reducer;

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;