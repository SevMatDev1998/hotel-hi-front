import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from "../components/shared/Button";
import { useTranslation } from "../hooks/useTranslation";

// Настройка worker для pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface IPDFPreviewModalProps {
  availabilityId: string;
  title?: string;
}

const PDFPreviewModal: ModalFC<IPDFPreviewModalProps> = ({ availabilityId, title }) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const pdfUrl = `${apiUrl}/api/v1/hotel-availability/pdf/${availabilityId}`;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${pdfUrl}?download=true`;
    link.download = `availability-${availabilityId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-[900px]">
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
      
      <div className="flex-1 px-6 pb-6 overflow-auto">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Загрузка PDF...</p>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-4 ">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            error={
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500 mb-4">Ошибка загрузки PDF</p>
                <Button onClick={handleDownload} variant="primary">
                  {t("common.download")} PDF
                </Button>
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="border border-gray-300 rounded-lg mb-4"
                width={800}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;
