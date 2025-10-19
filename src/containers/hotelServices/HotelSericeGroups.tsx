import { SystemServiceGroup } from '../../types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/shared/Accordion';
import SystemServiceTypes from './SystemServiceTypes';
import BlockContainer from '../public/BlockContainer';

interface HotelSericeGroupsProps {
  serviceGroups?: SystemServiceGroup[];
}
const HotelSericeGroups = ({ serviceGroups }: HotelSericeGroupsProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {serviceGroups?.map((group) => (
        <div key={group.id} className="mb-4">
        <BlockContainer shadow={false}>
          <AccordionItem key={group.id} value={`group-${group.id}`}>
            <AccordionTrigger>{group.name}</AccordionTrigger>
            <AccordionContent>
              <SystemServiceTypes groupId={group.id} />
            </AccordionContent>
          </AccordionItem>
        </BlockContainer>
</div>
      ))}
    </Accordion>
  );
};

export default HotelSericeGroups;