import { useTranslation } from "../../hooks/useTranslation";
import { HotelFood } from "../../types";

interface FoodPrice {
  hotelFood:HotelFood
  price: number;
  includedInPrice: boolean;
}

interface FoodPricesSectionProps {
  foodPrices: FoodPrice[];
}

const FoodPricesSection = ({ foodPrices }: FoodPricesSectionProps) => {
  const { t } = useTranslation();

  if (!foodPrices || foodPrices.length === 0) return null;

  return (
    <div className=" p-4">
      <h3 className="font-semibold text-lg mb-3">{t("foods.food")}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">{t("foods.type")}</th>
            <th className="text-left p-2">{t("foods.offer_types")}</th>
            <th className="text-left p-2">{t("foods.cuisines")}</th>
            <th className="text-center p-2">{t("foods.times")}</th>
          </tr>
        </thead>
        <tbody>
          {foodPrices.map((foodPrice, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">
                {t(`${foodPrice.hotelFood.foodType}`)}
              </td>
              <td className="p-2">
                {foodPrice.hotelFood.hotelFoodOfferTypes && foodPrice.hotelFood.hotelFoodOfferTypes.length > 0
                  ? foodPrice.hotelFood.hotelFoodOfferTypes.map((o) => t(`${o.offerType.name}`)).join(', ')
                  : '-'}
              </td>
              <td className="p-2">
                {foodPrice.hotelFood.hotelFoodCuisines && foodPrice.hotelFood.hotelFoodCuisines.length > 0
                  ? foodPrice.hotelFood.hotelFoodCuisines.map((c) => t(`${c.cuisine.name}`)).join(', ')
                  : '-'}
              </td>
              <td className="p-2 text-center">{foodPrice.hotelFood.startDate}-{foodPrice.hotelFood.endDate}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodPricesSection;
