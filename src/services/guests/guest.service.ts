import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { HotelAvailability, Partner } from "../../types";

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
        }),
        // ste petqa sned anenq hotelid u partner id 
        // u stananq data 


        getHotelAvailabilityWithDatesByPartnerid: build.query<HotelAvailability[], { hotelId: string, partnerId: string }>({
            query: ({ hotelId, partnerId }) => ({
                url: `${ApiEnum.GUESTS}/hotelAvailability/dates`,
                params: { partnerId, hotelId }
            }),
        }),
    })
})



export const {
    useGetPartnerInformationQuery,
    useAcceptPartnerShipMutation,
    useGetHotelAvailabilityWithDatesByPartneridQuery
} = GuestService;

