import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { CreateRoomPricePolicyDto, GetRoomPricePolicyResponse } from "../../types/pricePolicyDto";

const PricePolicyService = ApiInstance.injectEndpoints({
  endpoints: build => ({

    getRoomPricePolicy: build.query<GetRoomPricePolicyResponse, { hotelAvailabilityId: number; roomId: number }>({
      query: ({ hotelAvailabilityId, roomId }) => ({
        url: `${ApiEnum.PRICE_POLICY}/rooms/${hotelAvailabilityId}/${roomId}`,
      }),
      providesTags: [ApiEnum.PRICE_POLICY]
    }),

    createRoomPricePolicy: build.mutation<void, CreateRoomPricePolicyDto>({
      query: (body) => ({
        url: `${ApiEnum.PRICE_POLICY}/rooms`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [ApiEnum.PRICE_POLICY]
    }),

  }),
})

export const {
  useGetRoomPricePolicyQuery,
  useCreateRoomPricePolicyMutation
} = PricePolicyService;
