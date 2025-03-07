import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Content } from '../../app/index';
import Landing from '../../app/landing';
import { Term } from '../../shared/fetchers';
import { SidebarTemplate } from '../../shared/SidebarTemplate';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();

  const pid = searchParams.get('pid');

  return (
    <SidebarTemplate title="Calendar" term={term as Term}>
      {pid ? <Content term={term as Term} /> : <Landing />}
    </SidebarTemplate>
  );
}
