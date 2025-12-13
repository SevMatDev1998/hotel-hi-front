import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/shared/Accordion';
import SystemServices from "./SystemServices";
import { useGetSystemServiceTypesByGroupIdQuery } from "../../services/hotelService";
import { useTranslation } from '../../hooks/useTranslation';

interface Props {
  groupId: number;
}

const SystemServiceTypes = ({ groupId }: Props) => {
  const { data: serviceTypes } = useGetSystemServiceTypesByGroupIdQuery({ groupId });
  const { t } = useTranslation();


  return (
    <div>

    <Accordion type="single" collapsible className="pl-4 ">
      {serviceTypes?.map((type) => (
        <AccordionItem key={type.id} value={`type-${type.id}`} className='border-none'>
          <AccordionTrigger>{t(`services_t.types.${type.name}`)}</AccordionTrigger>
          <AccordionContent>
            <SystemServices typeId={type.id} />
          </AccordionContent>
        </AccordionItem>
      ))}

    </Accordion>
    </div>

  );
};

export default SystemServiceTypes;
