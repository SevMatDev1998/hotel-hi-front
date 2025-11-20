import { useTranslation } from "../../hooks/useTranslation";

interface FoodPrice {
  hotelFood: {
    foodType: string;
    hotelFoodOfferTypes?: Array<{ offerType: { name: string } }>;
    hotelFoodCuisines?: Array<{ cuisine: { name: string } }>;
    startDate: string;
    endDate: string;
  };
  price: number;
  includedInPrice: boolean;
  hotelAgeAssignment?: {
    fromAge: number;
    toAge: number;
  } | null;
}

interface RoomFoodPricesSectionProps {
  foodPrices: FoodPrice[];
}

const RoomFoodPricesSection = ({ foodPrices }: RoomFoodPricesSectionProps) => {
  const { t } = useTranslation();

  if (!foodPrices || foodPrices.length === 0) return null;

  const includedFoods = foodPrices.filter(fp => fp.includedInPrice);
  const paidFoods = foodPrices.filter(fp => !fp.includedInPrice);

  const groupedByFood = paidFoods.reduce((acc, fp) => {
    const foodType = fp.hotelFood.foodType;
    if (!acc[foodType]) {
      acc[foodType] = [];
    }
    acc[foodType].push(fp);
    return acc;
  }, {} as Record<string, FoodPrice[]>);

  return (
    <div className="p-4">
      <h4 className="font-semibold text-base mb-3">{t("foods.food")}</h4>
      
      {includedFoods.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-green-700 mb-2">
            {t("price_policy.included_food_in_room_price")}
          </p>
          <div className="flex flex-wrap gap-2">
            {includedFoods.map((fp, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {t(`foods.${fp.hotelFood.foodType}`)}
              </span>
            ))}
          </div>
        </div>
      )}

      {Object.keys(groupedByFood).length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">{t("price_policy.food_types")}</th>
                {paidFoods.length > 0 && paidFoods[0].hotelAgeAssignment && (
                  <>
                    {Array.from(new Set(paidFoods.map(fp => 
                      fp.hotelAgeAssignment ? `${fp.hotelAgeAssignment.fromAge}-${fp.hotelAgeAssignment.toAge}` : null
                    ))).filter(Boolean).map((ageRange, index) => (
                      <th key={index} className="border px-3 py-2 text-center">
                        {ageRange}{t("price_policy.annual")}
                      </th>
                    ))}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedByFood).map(([foodType, prices]) => (
                <tr key={foodType}>
                  <td className="border px-3 py-2">{t(`foods.${foodType}`)}</td>
                  {prices.map((fp, index) => (
                    <td key={index} className="border px-3 py-2 text-center">
                      {Number(fp.price).toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoomFoodPricesSection;
