import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { LoginDTO, LoginResponse, SignUpDTO } from "./auth.types";

const AuthService = ApiInstance.injectEndpoints({
    endpoints: build => ({
        getInfo: build.query<any, void>({
            query: () => ({
                url: ApiEnum.GET_ME,
            })
        }),
        login: build.mutation<LoginResponse, LoginDTO>({
            query: (body) => ({
                url: ApiEnum.AUTH_LOGIN,
                method: "POST",
                body
            }),
            extraOptions:{
                action: 'LOGIN'
            }
        }),
        signUp: build.mutation<LoginResponse, SignUpDTO>({
            query: (body) => ({
                url: ApiEnum.REGISTER,
                method: "POST",
                body
            })
        }),
        verifyRegistration: build.query<void, { token: string }>({
            query: ({ token }) => ({
                url: `${ApiEnum.VERIFY_REGISTRATION}/${token}`,
                method: "GET",
            })
        }),
        resetPassword: build.mutation<void, { email: string }>({
            query: (body) => ({
                url: ApiEnum.RESET_PASSWORD,
                method: "POST",
                body
            })
        }),
        setNewPassword: build.mutation<void, { token: string; newPassword: string }>({
            query: ({ token, newPassword }) => ({
                url: `${ApiEnum.SET_NEW_PASSWORD}/${token}`,
                method: "POST",
                body: { newPassword }
            })
        }),
    })
})

export const {
    useGetInfoQuery,
    useLoginMutation,
    useSignUpMutation,
    useVerifyRegistrationQuery,
    useResetPasswordMutation,
    useSetNewPasswordMutation
} = AuthService;
export const { endpoints: {getInfo, login } } = AuthService