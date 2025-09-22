import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { User } from "../../types";
import {  LoginResponse,  } from "../auth";


const AuthService = ApiInstance.injectEndpoints({
    endpoints: build => ({
        // getInfo: build.query<GetInfoResponse, void>({
        //     query: () => ({
        //         url: ApiEnum.GET_ME,
        //     })
        // }),
        login: build.mutation<LoginResponse, Partial<User>>({
            query: (body) => ({
                url: ApiEnum.AUTH_LOGIN,
                method: "POST",
                body
            })
        }),
      
    })
})

export const {
    useLoginMutation,
} = AuthService;
export const { endpoints: { login } } = AuthService