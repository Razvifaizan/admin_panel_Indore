import React, { useState } from 'react';
import axios from 'axios';

const AddMedia = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [type, setType] = useState('image'); // manual dropdown value

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append('media', file);
    formData.append('caption', caption);
    formData.append('type', type); // manual type from dropdown

    try {
      const res = await axios.post('https://indore-corpo-backed-4.onrender.com/media/add-media', formData);
      alert("Uploaded successfully");
      setFile(null);
      setCaption('');
      setType('image'); // reset type
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add to Gallery</h2>

      <label className="block mb-2 font-medium">Select Media Type:</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      <label className="block mb-2 font-medium">Select File:</label>
      <input
        type="file"
        accept={type === 'image' ? 'image/*' : 'video/*'}
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 w-full"
      />

      <label className="block mb-2 font-medium">Caption:</label>
      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default AddMedia;
