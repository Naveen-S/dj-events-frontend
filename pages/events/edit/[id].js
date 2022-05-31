import moment from 'moment';
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { ToastContainer } from 'react-toastify';
import { FaImage } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookie } from '@/helpers/index';

const EditPage = ({ evt, id, token }) => {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  console.log('token ', token);
  useEffect(() => {
    console.log('edit value ', evt);
    setValues(evt?.attributes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit ', values);
    //validation
    const hasEmptyField = Object.values(values).some((ele) => ele === '');
    if (hasEmptyField) {
      toast.error('Please fill in all values');
    }

    const payload = { data: values };
    payload.data.image = values.image.attributes; // No need to send id so removing that by only sending attribute here.

    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status == 403) {
        toast.error('Unathorized');
        return;
      }
      toast.error('Something went wrong');
      console.log('err ', res);
    } else {
      const evt = await res.json();
      console.log(evt);
      if (evt?.data?.id) {
        router.push(`/events/${evt.data.id}`);
      }
    }
  };
  const imageUploaded = async () => {
    console.log('Image uploaded');
    const res = await fetch(`${API_URL}/api/events/${id}?populate[0]=image`);
    const data = await res.json();
    console.log('---> ', data);
    setValues(data?.data?.attributes);
    setShowModal(false);
  };

  const getThumbnail = () => {
    console.log(
      'url ==> ',
      values?.image?.data?.attributes?.formats?.thumbnail?.url
    );
    return (
      values?.image?.data?.attributes?.formats?.thumbnail?.url ||
      '/images/event-default.png'
    );
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
      <h1>Edit event</h1>
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
              value={moment(values.date).format('yyyy-MM-DD')}
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
        <input type='submit' value='Update Event' className='btn btn-primary' />
      </form>
      <div className=''>
        <h3>Event Image</h3>
        <Image
          src={values.image ? getThumbnail(evt) : '/images/event-default.png'}
          width={200}
          height={120}
          alt='event image'
          className={styles.img}
        />
        <div>
          <button
            className='btn btn-secondary flex'
            onClick={() => {
              setShowModal(true);
            }}>
            <FaImage className='mx-2' />
            Set Image
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ImageUpload evtId={id} imageUploaded={imageUploaded} token={token} />
      </Modal>
    </Layout>
  );
};

export default EditPage;

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate[0]=image`);
  const evt = await res.json();
  console.log(evt);
  console.log('cookie: ', req.headers.cookie);
  const { token } = parseCookie(req);
  return {
    props: { evt: evt.data, id: id, token },
  };
}
