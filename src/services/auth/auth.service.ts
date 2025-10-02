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
    })
})

export const {
    useGetInfoQuery,
    useLoginMutation,
    useSignUpMutation   
} = AuthService;
export const { endpoints: {getInfo, login } } = AuthService