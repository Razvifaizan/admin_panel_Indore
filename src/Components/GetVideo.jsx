import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetMediaGallery = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    axios.get('https://indore-corpo-backed-4.onrender.com/media/getMedia')
      .then(res => {
        const allMedia = res.data.data || [];
        const imageOnly = allMedia.filter(item => item.type === 'image');
        const videoOnly = allMedia.filter(item => item.type === 'video');
        setImages(imageOnly);
        setVideos(videoOnly);
        console.log(allMedia)
      })
      .catch(err => console.error("Error fetching media:", err));
  }, []);

  const openModal = (media) => {
    setActiveMedia(media);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveMedia(null);
  };

  const deleteGallary = async (postId) => {
    try {
      const response = await axios.delete(`https://indore-corpo-backed-4.onrender.com/media/deleteMedia/${postId}`);
      if (response.status === 200) {
        // setPosts(posts.filter(post => post._id !== postId));
        alert("Post deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Error deleting Media!");
    }
  };

  return (
    <div className="gallery-container" id="getGallery">
      {/* Image Gallery Section */}
      <h2 className="gallery-heading">Image Gallery</h2>
      <div className="media-grid">
        {images.length > 0 ? (
          images.map((item) => (
            <div key={item._id || item.mediaUrl} className="media-card" onClick={() => openModal(item)}>
              <img
                src={`https://indore-corpo-backed-4.onrender.com${item.mediaUrl}`}
                alt={item.caption || 'Image'}
                className="media-thumb"
              />
              <div className="d-flex justify-content-between">
              <p className="media-caption">{item.caption}</p>
              <button
                    onClick={() => deleteGallary(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
              </div>
              
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>

      {/* Video Gallery Section */}
      <h2 className="gallery-heading mt-10">Video Gallery</h2>
      <div className="media-grid">
        {videos.length > 0 ? (
          videos.map((item) => (
            <div key={item._id || item.mediaUrl} className="media-card" onClick={() => openModal(item)}>
              <video className="media-thumb" muted>
                <source src={`https://indore-corpo-backed-4.onrender.com${item.mediaUrl}`} type="video/mp4" />
              </video>
              <p className="media-caption">{item.caption}</p>
              <button
                    onClick={() => deleteGallary(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && activeMedia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            {activeMedia.type === 'video' ? (
              <video controls autoPlay className="modal-media">
                <source src={`https://indore-corpo-backed-4.onrender.com${activeMedia.mediaUrl}`} type="video/mp4" />
              </video>
            ) : (
              <img
                src={`https://indore-corpo-backed-4.onrender.com${activeMedia.mediaUrl}`}
                alt={activeMedia.caption || 'Image'}
                className="modal-media"
              />
            )}
            <p className="modal-caption">{activeMedia.caption}</p>
            <button
                    onClick={() => deleteGallary(activeMedia._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMediaGallery;
