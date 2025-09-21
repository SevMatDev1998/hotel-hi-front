import { createSlice } from "@reduxjs/toolkit";
// import { User } from "../../types";
// import { getInfo, login } from "../../services/auth/auth.service";
import { clearTokens, setJwtToken, setRefreshToken } from "../../utils/tokenUtil";

interface IAuthState {
    user: Partial<User> | null,
    isLogin: boolean
}

const initialState: IAuthState = {
    user: null,
    isLogin: false
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        logOut: () => {
            clearTokens()
            return initialState
        }
    },
    // extraReducers: builder => {
    //     builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
    //         const { accessToken, refreshToken } = payload
    //         setJwtToken(accessToken);
    //         setRefreshToken(refreshToken);
    //         state.isLogin = true

    //     })
    //     builder.addMatcher(
    //         getInfo.matchFulfilled,
    //         (state, { payload: { user } }) => {
    //             state.user = user;
    //             state.isLogin = true;
    //         }
    //     );
    //     //   builder.addMatcher(
    //     //     getInfo.matchRejected,
    //     //     (state) => {
    //     //         state.isLogin = false;
    //     //       state.user = null;
    //     //     }
    //     //   );
    //     // builder.addMatcher(getInfo.matchFulfilled, (state, { payload }) => {
    //     //     state.user = payload
    //     // })


    // }
})

export const { logOut } = authSlice.actions
export default authSlice.reducer

