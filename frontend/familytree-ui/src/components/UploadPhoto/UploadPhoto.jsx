import React, { useState } from 'react';
import { uploadPhoto } from '../services/api';

const UploadPhoto = ({ memberId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    await uploadPhoto(memberId, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default UploadPhoto;
