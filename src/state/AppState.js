import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    name: "",
    email: "",
    token: "",
    role:"",
    userData:""
    // other states
}

export const AppSlice = createSlice({
    name: "AppData",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        
            state.userData = action.payload.userData;
           
        },
        setLogout: (state) => {
            state.name = null;
            state.email = null;
            state.token = null;
            state.role = null;
          
            state.userData = null;
           
           
        },
    //    other reducers
    
    }
})

export const { setLogout, setLogin} = AppSlice.actions;

export default AppSlice.reducer;