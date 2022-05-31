import Layout from '@/components/Layout';
import React from 'react';
import { API_URL } from '@/config/index';
import { parseCookie } from '@/helpers/index';
import DashboardEvent from '@/components/DashboardEvent';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = (props) => {
  console.log(props);
  const { events, token } = props;

  const router = useRouter();
  const deleteEvent = async (evt) => {
    console.log(evt);
    let res;
    if (confirm('Are you sure?')) {
      res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  return (
    <Layout title='Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  console.log(token);
  const res = await fetch(`${API_URL}/api/events/me?populate[0]=image`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const events = await res.json();

  return {
    props: {
      // evt: { ...event?.data?.attributes, id: event?.data?.id },
      events,
      token,
    },
  };
}
export default Dashboard;
