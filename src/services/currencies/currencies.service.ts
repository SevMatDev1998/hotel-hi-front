import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";
import { Currency } from "../../types";

const CurrenciesService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getCurrencies: build.query<Currency[],void>({
      query: () => ({
        url: `${ApiEnum.CURRENCIES}`,
      })
    }),
  })
})

export const {
  useGetCurrenciesQuery
} = CurrenciesService