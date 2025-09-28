import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { LoginDTO, LoginResponse, SignUpDTO } from "./auth.types";

const AuthService = ApiInstance.injectEndpoints({
    endpoints: build => ({
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
    })
})

export const {
    useLoginMutation,
    useSignUpMutation   
} = AuthService;
export const { endpoints: { login } } = AuthService