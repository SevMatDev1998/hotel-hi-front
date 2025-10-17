import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import {  AddHotelFoodDto, Cuisine, FoodOfferType, HotelFood } from "../../types";

const FoodsService = ApiInstance.injectEndpoints({
  endpoints: build => ({

    // get hotel foods by hotel id
    getHotelFoodsByHotelId: build.query<HotelFood[], { hotelId: string }>({
      query: ({ hotelId }) => ({
        url: `${ApiEnum.HOTEL_FOODS}/hotel/${hotelId}`,
      })
    }),

    getFoodOfferTypes: build.query<FoodOfferType[], void>({
      query: () => ({
        url: ApiEnum.FOOD_OFFER_TYPES,
      })
    }),
    getCuisine: build.query<Cuisine[], void>({
      query: () => ({
        url: ApiEnum.CUISNESSE,
      })
    }),
    addHotelFood: build.mutation<void, { body: AddHotelFoodDto, hotelId: string }>({
      query: ({ body, hotelId }) => ({
        url: `${ApiEnum.HOTEL_FOODS}/${hotelId}`,
        method: 'PUT',
        body,
      }),
    }),

  }),
})

export const {
  useGetHotelFoodsByHotelIdQuery,
  useGetFoodOfferTypesQuery,
  useGetCuisineQuery,
  useAddHotelFoodMutation
} = FoodsService;

