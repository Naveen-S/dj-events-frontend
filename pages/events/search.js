import qs from 'qs';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';

export default function Search({ events }) {
  console.log(events);
  return (
    <div>
      <Layout>
        <Link href='/events'>
          <a className='link'>{'<'} Go back</a>
        </Link>
        {events.length === 0 && <h3> No event with the search term. :(</h3>}
        {events.map(({ id, attributes: evt }) => {
          return (
            <h3 key={id}>
              <EventItem key={id} evt={{ ...evt, id }} />
            </h3>
          );
        })}
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },
        {
          performers: {
            $contains: term,
          },
        },
        {
          description: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
      ],
    },
  });

  // http://localhost:1337/api/events?populate[0]=image&filters[$or][0][name][$contains]=boom

  const res = await fetch(`${API_URL}/api/events?populate[0]=image&${query}`); // Image is not populate by default in strapi4.
  const events = await res.json();
  return {
    props: { events: events.data },
  };
}
