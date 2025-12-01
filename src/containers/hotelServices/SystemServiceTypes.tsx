import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/shared/Accordion';
import SystemServices from "./SystemServices";
import { useGetSystemServiceTypesByGroupIdQuery } from "../../services/hotelService";

interface Props {
  groupId: number;
}

const SystemServiceTypes = ({ groupId }: Props) => {
  const { data: serviceTypes } = useGetSystemServiceTypesByGroupIdQuery({ groupId });


  return (
    <div>

    <Accordion type="single" collapsible className="pl-4 ">
      {serviceTypes?.map((type) => (
        <AccordionItem key={type.id} value={`type-${type.id}`} className='border-none'>
          <AccordionTrigger>{type.name}</AccordionTrigger>
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
