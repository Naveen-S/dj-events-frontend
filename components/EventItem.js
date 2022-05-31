import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';
const EventItem = ({ evt }) => {
  const getThumbnail = (evt) => {
    console.log(
      'url ==> ',
      evt.image?.data?.attributes?.formats?.thumbnail?.url
    );
    return (
      evt.image?.data?.attributes?.formats?.thumbnail?.url ||
      '/images/event-default.png'
    );
  };
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? getThumbnail(evt) : '/images/event-default.png'}
          width={200}
          height={120}
          alt='event image'
          className={styles.img}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.evtTime}>{`${moment(evt.date).format(
          'MMMM Do YYYY'
        )} at ${evt.time}`}</div>
        <div className={styles.evtTitle}>{evt.name}</div>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.id}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
