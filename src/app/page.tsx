import { getWars } from '@/lib/data';
import { WarTimelinePage } from '@/components/war-timeline-page';

export default async function Home() {
  const wars = getWars();

  return <WarTimelinePage wars={wars} />;
}
