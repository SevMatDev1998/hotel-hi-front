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

const PDFPreviewModal: ModalFC<IPDFPreviewModalProps> = ({ availabilityId }) => {
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
      <div className="flex justify-end items-center m-4">
        <Button onClick={handleDownload} variant="outline" className="w-[200px]">
            {t("common.download")} PDF
        </Button>
      </div>
      
      <div className="flex-1 px-6 pb-6 overflow-auto">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Загрузка PDF...</p>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-1 ">
        <h3 className="">{t("price_policy.price_list")}</h3>

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
              <div key={`page_${index + 1}`} >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={800}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;
