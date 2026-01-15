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


        getHotelAvailabilityWithDatesByPartnerid: build.query<HotelAvailability[], { hotelId: string }>({
            query: ({ hotelId }) => ({
                url: `${ApiEnum.GUESTS}/hotelAvailability/dates`,
                params: {  hotelId }
            }),
        }),

        getHotelInfoByAvailabilityId: build.query<{
            hotelName: string;
            city: string;
            state: string;
            userEmail: string;
        }, { availabilityId: string }>({
            query: ({ availabilityId }) => ({
                url: `${ApiEnum.GUESTS}/availability/${availabilityId}/hotel-info`,
            }),
        }),
    })
})



export const {
    useGetPartnerInformationQuery,
    useAcceptPartnerShipMutation,
    useGetHotelAvailabilityWithDatesByPartneridQuery,
    useGetHotelInfoByAvailabilityIdQuery,
} = GuestService;

