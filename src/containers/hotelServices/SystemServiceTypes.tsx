import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { useGetSystemServiceTypesByGroupIdQuery } from "../../services/hotelService";
import SystemServices from "./SystemServices";

interface Props {
  groupId: number;
}

const SystemServiceTypes = ({ groupId }: Props) => {
  const { data: serviceTypes, isLoading, error } = useGetSystemServiceTypesByGroupIdQuery({ groupId });

  if (isLoading) return <p>Loading service types...</p>;
  if (error) return <p>Failed to load service types</p>;

  return (
    <Accordion type="single" collapsible className="pl-4 ">
      {serviceTypes?.map((type) => (
        <AccordionItem key={type.id} value={`type-${type.id}`}>
          <AccordionTrigger>{type.name}</AccordionTrigger>
          <AccordionContent>
            <SystemServices typeId={type.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SystemServiceTypes;
