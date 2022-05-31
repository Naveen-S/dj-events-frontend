import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import Link from 'next/link';

const PER_PAGE = 5;
export default function Events({ events, all }) {
  console.log(events);
  console.log('all ', all);
  const { pagination } = all?.meta;
  console.log(pagination);
  return (
    <div>
      <Layout>
        {events.length === 0 && <h3> No upcoming events</h3>}
        {events.map(({ id, attributes: evt }) => {
          return (
            <h3 key={id}>
              <EventItem key={id} evt={{ ...evt, id }} />
            </h3>
          );
        })}
        {pagination?.page > 1 && (
          <Link href={`/events?page=${pagination.page - 1}`}>
            <a className='btn-secondary mx-2'>Prev</a>
          </Link>
        )}
        {pagination?.page < pagination?.pageCount && (
          <Link href={`/events?page=${pagination.page + 1}`}>
            <a className='btn-secondary mx-2'>Next</a>
          </Link>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  // const start = parseInt(page) === 1 ? 0 : parseInt(page) * PER_PAGE;
  console.log('page', page);
  const res = await fetch(
    `${API_URL}/api/events?populate[0]=image&pagination[pageSize]=${PER_PAGE}&pagination[page]=${page}`
  ); // Image is not populate by default in strapi4.

  const events = await res.json();
  return {
    props: { events: events.data, all: events },
  };
}
