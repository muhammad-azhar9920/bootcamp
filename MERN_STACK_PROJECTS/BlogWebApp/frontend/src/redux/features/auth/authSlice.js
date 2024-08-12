import { createSlice } from "@reduxjs/toolkit"; 

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: JSON.parse(localStorage.getItem('user')) || null},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user,
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logout: (state, action) =>{
            localStorage.removeItem('user')
        }
    }
})

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;