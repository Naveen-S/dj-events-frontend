import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import { toast } from 'react-toastify';
import EventMap from '@/components/EventMap';

const EventPage = ({ evt }) => {
  const router = useRouter();
  console.log('slug ', router.query.slug);
  console.log('evt ', evt);

  const deleteEvent = async (e) => {
    console.log(e);
    let res;
    if (confirm('Are you sure?')) {
      res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'DELETE',
      });
    }
    const data = await res.json();
    console.log('---> data ', data);
    if (!res.ok) {
      toast.error(data.message);
    } else {
      router.push('/events');
    }
  };

  const getThumbnail = (evt) => {
    console.log('url ==> ', evt.image?.data?.attributes?.formats?.large?.url);
    return (
      evt.image?.data?.attributes?.formats?.large?.url ||
      evt.image?.data?.attributes?.formats?.small?.url ||
      '/images/event-default.png'
    );
  };

  return (
    <Layout title='Event'>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`} alt='Edit'>
            <a className={styles.edit}>
              <FaPencilAlt className={styles.icon} /> Edit
            </a>
          </Link>
          {/* <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes className={styles.icon} /> Delete Event
          </a> */}
        </div>
        <span>
          {`${moment(evt.date).format('MMMM Do YYYY')} at ${evt.time}`}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image ? getThumbnail(evt) : '/images/event-default.png'}
              alt='evt'
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <EventMap evt={evt} />
        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  console.log(ctx);
  const { slug } = ctx?.query;
  const res = await fetch(`${API_URL}/api/events/${slug}?populate[0]=image`);
  const event = await res.json();

  return {
    props: {
      evt: { ...event?.data?.attributes, id: event?.data?.id },
    },
  };
}
export default EventPage;
