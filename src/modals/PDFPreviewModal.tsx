import { Button } from "../components/shared/Button";
import { useTranslation } from "../hooks/useTranslation";

interface IPDFPreviewModalProps {
  availabilityId: string;
  title?: string;
}

const PDFPreviewModal: ModalFC<IPDFPreviewModalProps> = ({ availabilityId, title }) => {
  const { t } = useTranslation();
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const pdfUrl = `${apiUrl}/api/v1/hotel-availability/pdf/${availabilityId}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `availability-${availabilityId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-6 pt-6">
        <h2 className="text-xl font-bold">{title || t("price_policy.price_list")}</h2>
        <Button onClick={handleDownload} variant="outline">
          <div className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {t("common.download")} PDF
          </div>
        </Button>
      </div>
      
      <div className="flex-1 px-6 pb-6">
        <iframe
          src={pdfUrl}
          className="w-full h-full border border-gray-300 rounded-lg"
          title="PDF Preview"
          style={{ minHeight: '70vh' }}
        />
      </div>
    </div>
  );
};

export default PDFPreviewModal;
