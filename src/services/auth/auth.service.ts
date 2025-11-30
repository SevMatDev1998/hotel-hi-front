import ApiInstance from "../../api/api";
import { LoginDTO, LoginResponse, SignUpDTO } from "./auth.types";
import ApiEnum from "../../enums/api.enum";

const AuthService = ApiInstance.injectEndpoints({
    endpoints: build => ({
        getInfo: build.query<any, void>({
            query: () => ({
                url: ApiEnum.GET_ME,
            })
        }),
        getNavigationAccessStep: build.query<{ navigationAccessStep: number }, { hotelId?: string }>({
            query: ({ hotelId }) => ({
                url: `${ApiEnum.NAVIGATION_ACCESS}/${hotelId}`,
            }),
            providesTags:[ApiEnum.NAVIGATION_ACCESS]
        }),

        setNavigationAccessStep: build.mutation<{ navigationAccessStep: number }, { hotelId?: string, stepNumber: number }>({
            query: ({ hotelId, stepNumber }) => ({
                url: `${ApiEnum.NAVIGATION_ACCESS}/${hotelId}`,
                method: "PATCH",
                body: { stepNumber }
            }),
            invalidatesTags:[ApiEnum.NAVIGATION_ACCESS]
        }),
        login: build.mutation<LoginResponse, LoginDTO>({
            query: (body) => ({
                url: ApiEnum.AUTH_LOGIN,
                method: "POST",
                body
            }),
            extraOptions: {
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
    useGetNavigationAccessStepQuery,
    useSetNavigationAccessStepMutation,
    useLoginMutation,
    useSignUpMutation,
    useVerifyRegistrationQuery,
    useResetPasswordMutation,
    useSetNewPasswordMutation
} = AuthService;
export const { endpoints: { getInfo, login } } = AuthService

// useSetNavigationAccessStepMutation.