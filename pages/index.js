import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';


export default function Home({ events }) {
  console.log(events);
  return (
    <div>
      <Layout>
        <h1>Upcoming Events</h1>
        {events.length === 0 && <h3> No upcoming events</h3>}
        {events.map(({ id, attributes: evt }) => {
          return (
            <h3 key={id}>
              <EventItem key={id} evt={{ ...evt, id }} />
            </h3>
          );
        })}
        {events.length > 0 && (
          <Link href='/events'>
            <a className='btn-secondary'> View all Events</a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate[0]=image`); // Image is not populate by default in strapi4.
  const events = await res.json();
  console.log('--->', events.data);
  return {
    props: { events: events.data.slice(0, 3) },
  };
}
