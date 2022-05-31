import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookie } from '@/helpers/index';
const Add = ({ token }) => {
  console.log('token', token);
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit ', values);
    //validation
    const hasEmptyField = Object.values(values).some((ele) => ele === '');
    if (hasEmptyField) {
      toast.error('Please fill in all values');
    }

    const payload = { data: values };
    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 403) {
        toast.error('Unauthorized');
      } else {
        toast.error('Something went wrong');
      }
      console.log('err ', res);
    } else {
      const evt = await res.json();
      console.log(evt);
      if (evt?.id) {
        router.push(`/events/${evt.id}`);
      }
    }
  };
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Layout title='Add New Event'>
      <ToastContainer />

      <Link href='/events'>
        <a className='link'>{'<'} Go back</a>
      </Link>
      <h1>Add event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              id='date'
              name='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'> Event Description</label>
          <textarea
            name='description'
            id='description'
            cols='30'
            rows='10'
            type='text'
            value={values.description}
            onChange={handleInputChange}></textarea>
        </div>
        <input type='submit' value='Add Event' className='btn btn-primary' />
      </form>
    </Layout>
  );
};

export default Add;

export async function getServerSideProps({ req }) {
  const token = parseCookie(req);
  return {
    props: { token: token?.token },
  };
}
