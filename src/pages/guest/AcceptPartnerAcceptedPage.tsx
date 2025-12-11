import { useTranslation } from "../../hooks/useTranslation";

const AcceptPartnerAcceptedPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-dusty-teal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-dusty-teal sm:text-5xl">
          {t("partners.thank_you")}!
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 sm:text-3xl">
          {t("partners.partner_accepted")}
        </h2>
        <p className="mt-4 text-gray-600 text-center max-w-md mx-auto">
          {t("partners.confirmation_received")}
        </p>
       
      </div>
    </div>
  );
};

export default AcceptPartnerAcceptedPage;
