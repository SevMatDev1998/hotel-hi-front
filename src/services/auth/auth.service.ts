import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { LoginResponse } from "./auth.types";
import { User } from "../../types";

const AuthService = ApiInstance.injectEndpoints({
    endpoints: build => ({
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