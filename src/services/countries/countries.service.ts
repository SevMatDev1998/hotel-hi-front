import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { Country } from "../../types";

const CountriesService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getCountries: build.query<Country[],void>({
      query: () => ({
        url: `${ApiEnum.COUNTRIES}`,
      })
    }),
  })
})

export const {
  useGetCountriesQuery
} = CountriesService;