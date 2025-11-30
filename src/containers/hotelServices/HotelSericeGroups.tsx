import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/shared/Accordion';
import BlockContainer from '../public/BlockContainer';
import SystemServiceTypes from './SystemServiceTypes';
import { SystemServiceGroup } from '../../types';

interface HotelSericeGroupsProps {
  serviceGroups?: SystemServiceGroup[];
}
const HotelSericeGroups = ({ serviceGroups }: HotelSericeGroupsProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {serviceGroups?.map((group) => (
        <div key={group.id} className="mb-4">
          <BlockContainer shadow={false}>
            <AccordionItem key={group.id} value={`group-${group.id}`} className='border-none'>
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