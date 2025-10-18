import ApiInstance from "../../api/api";
import ApiEnum from "../../enums/api.enum";

const HotelSericesService = ApiInstance.injectEndpoints({
  endpoints: build => ({
    getSystemServiceGroups: build.query<void,void>({
      query: () => ({
        url: `${ApiEnum.SYSTEM_SERVICE_GROUPS}`,
      })
    }),
  }),
})

export const {
  useGetSystemServiceGroupsQuery,
} = HotelSericesService;

