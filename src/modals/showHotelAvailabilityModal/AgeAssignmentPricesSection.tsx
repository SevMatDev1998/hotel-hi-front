import { useTranslation } from "../../hooks/useTranslation";

interface AgeAssignmentPrice {
  price: number;
  hotelAgeAssignment: {
    fromAge: number;
    toAge: number;
  };
}

interface AgeAssignmentPricesSectionProps {
  ageAssignmentPrices: AgeAssignmentPrice[];
}

const AgeAssignmentPricesSection = ({ ageAssignmentPrices }: AgeAssignmentPricesSectionProps) => {
  const { t } = useTranslation();

  if (!ageAssignmentPrices || ageAssignmentPrices.length === 0) return null;

  return (
    <div className="p-4">
      <h4 className="font-semibold text-base mb-3">{t("price_policy.age_assignment_prices")}</h4>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              {ageAssignmentPrices.map((item, index) => (
                <th key={index} className="border px-3 py-2 text-center">
                  {item.hotelAgeAssignment.fromAge}-{item.hotelAgeAssignment.toAge}
                  {t("price_policy.annual")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {ageAssignmentPrices.map((item, index) => (
                <td key={index} className="border px-3 py-2 text-center font-medium">
                  {Number(item.price).toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgeAssignmentPricesSection;
