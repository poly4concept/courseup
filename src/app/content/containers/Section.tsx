import { Box, Center, Divider, Heading, Spinner } from '@chakra-ui/react';

import { ClassScheduleListing, Seat, Term, useSeats, useSections } from '../../../shared/fetchers';
import { getReadableTerm } from '../../shared/utils/terms';
import { SectionInfo } from '../components/Section';

function Sections({ sections, seats }: { sections: ClassScheduleListing[]; seats?: Seat[] | null }): JSX.Element {
  return (
    <>
      {sections.map(({ sectionType, crn, sectionCode, instructionalMethod, additionalNotes, meetingTimes }) => (
        <SectionInfo
          section={sectionType}
          crn={crn}
          key={crn}
          sectionCode={sectionCode}
          instructionalMethod={instructionalMethod}
          additionalNotes={additionalNotes}
          meetingTimes={meetingTimes}
          seat={seats?.find((e) => e.crn === crn)}
        />
      ))}
    </>
  );
}

export interface SectionsContainerProps {
  term: Term;
  subject: string;
  code: string;
}

export function SectionsContainer({ term, subject, code }: SectionsContainerProps): JSX.Element {
  const { data: sections, loading, error: sectionsError } = useSections({ term, queryParams: { subject, code } });
  const { data: seats, error: seatsError } = useSeats({ term, queryParams: { subject, code } });

  if (loading) {
    return (
      <Center width="100%">
        <Spinner bg="white" colorScheme="black" size="xl" color="gray" />
      </Center>
    );
  }

  // we can't just look at sectionsError since it returns an empty array upon "not finding" any sections.
  if (seatsError || sectionsError || sections?.length === 0 || seats?.length === 0) {
    return (
      <Center>
        <Heading size="md" color="gray">
          Unable to find sections for{' '}
          <Box as="span" color="black">
            {getReadableTerm(term)}
          </Box>
        </Heading>
      </Center>
    );
  }

  const sectionTypes: { sn: string; pl: string; type: string }[] = [
    { sn: 'Lecture', pl: 'Lectures', type: 'lecture' },
    { sn: 'Lecture Topic', pl: 'Lecture Topics', type: 'lecture topic' },
    { sn: 'Lab', pl: 'Labs', type: 'lab' },
    { sn: 'Gradable Lab', pl: 'Gradable Labs', type: 'gradable lab' },
    { sn: 'Tutorial', pl: 'Tutorials', type: 'tutorial' },
    { sn: 'Practicum', pl: 'Practicums', type: 'practicum' },
  ];

  const categorizedSections = sectionTypes.map(({ type, sn: singular, pl: plural }) => {
    return { singular, plural, sections: sections?.filter((s) => (s.sectionType as string) === type) };
  });

  return (
    <Box>
      {categorizedSections.map((c, i) => {
        if (c.sections && c.sections.length > 0) {
          return (
            <Box key={i}>
              <Heading size="xl" color="black" my="2">
                {c.sections.length > 1 ? c.plural : c.singular}
              </Heading>
              <Sections sections={c.sections} seats={seats} />
              <Divider />
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
}
