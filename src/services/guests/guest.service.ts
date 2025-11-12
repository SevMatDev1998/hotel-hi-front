import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { Partner } from "../../types";

const GuestService = ApiInstance.injectEndpoints({
    endpoints: build => ({
        getPartnerInformation: build.query<any, { partnerId: string }>({
            query: ({ partnerId }) => ({
                url: `${ApiEnum.GUESTS}/partners/${partnerId}`,
            })
        }),
        acceptPartnerShip: build.mutation<void, { data: Partial<Partner>, partnerId: string }>({
            query: ({ data, partnerId }) => ({
                url: `${ApiEnum.GUESTS}/partners/${partnerId}`,
                method: "POST",
                body: data
            })
        })
    })
})

export const {
    useGetPartnerInformationQuery,
    useAcceptPartnerShipMutation
} = GuestService;