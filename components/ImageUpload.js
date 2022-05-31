import React, { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const ImageUpload = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit clicked');
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'api::event.event'); // Which collection.
    formData.append('refId', evtId); // Id of the entry in the collection as to where this image should go.
    formData.append('field', 'image'); // Field name in the event.

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: 'Bearer ' + token },
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    console.log('File change clicked', e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
};

export default ImageUpload;
