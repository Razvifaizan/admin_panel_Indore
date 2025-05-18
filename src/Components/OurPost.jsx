import React, { useEffect, useState } from "react";
import axios from "axios";
// import '../assets/style/main.css'; // Optional: use if you have custom styles

const OurPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get("https://indore-corpo-backed-4.onrender.com/api/getMedia")
      .then((res) => {
        setPosts(res.data.data || []); // Safe fallback
        console.log("Response:", res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  const openImage = (imgPath) => {
    setSelectedImage(imgPath);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`https://indore-corpo-backed-4.onrender.com/api/deleteMedia/${postId}`);
      if (response.status === 200) {
        setPosts(posts.filter(post => post._id !== postId));
        alert("Post deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Error deleting post!");
    }
  };

  return (
    <section id="OurPost" className="py-5">
      <div className="container mb-4">
        <h2 className="text-center">Our Posts</h2>
      </div>

      <div className="container">
        <div className="row">
          {posts.map((post, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex">
              <div className="card w-100">
                <img
                  src={`https://indore-corpo-backed-4.onrender.com${post.post_image}`}
                  className="card-img-top"
                  alt={post.title || "Post Image"}
                  style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                    cursor: "pointer"
                  }}
                  onClick={() => openImage(`https://indore-corpo-backed-4.onrender.com${post.post_image}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title || "Untitled"}</h5>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fullscreen-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <button
            className="btn btn-light"
            onClick={closeImage}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              fontSize: '2rem'
            }}
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Full View"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />
        </div>
      )}
    </section>
  );
};

export default OurPost;
