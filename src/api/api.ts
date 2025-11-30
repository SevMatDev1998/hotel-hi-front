import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { clearTokens, getJwtToken, getRefreshToken, setJwtToken, setRefreshToken } from "../utils/tokenUtil.ts";
import ApiEnum from '../enums/api.enum.ts';

const mutex = new Mutex();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const tokenData = getJwtToken();
        headers.set('Authorization', `Bearer ${tokenData}`);
        // headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'plain/text, application/json');
        return headers;
    },
});

export const baseQueryInstance: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError, { action?: string }> = async (args, api, options) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, options);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            const refresh = getRefreshToken()
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/auth/refresh',
                        method: 'POST',
                        body: { refreshToken: refresh },
                    },
                    api,
                    options,
                );
                if (refreshResult.data) {
                    const { accessToken, refreshToken } = refreshResult.data as { accessToken: string; refreshToken: string };
                    setJwtToken(accessToken);
                    setRefreshToken(refreshToken);
                    result = await baseQuery(args, api, options);
                    // If there is Have Error same one
                    if (result.error && result.error.status === 401) {
                        clearTokens();
                        // window.location.href = '/login';
                    }
                } else {
                    clearTokens();
                    // window.location.href = '/login';
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, options);
        }
    }
    return result;

};

const tagTypes = Object.values(ApiEnum)

const ApiInstance = createApi({
    reducerPath: 'api-instance',
    baseQuery: baseQueryInstance,
    tagTypes: tagTypes,
    endpoints: () => ({}),
});

export default ApiInstance
