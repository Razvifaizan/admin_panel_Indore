import { useState } from 'react';
import axios from 'axios';
import '../assets/Style/Admin.css';
// import '../assets/style/main.css' // Import the CSS file for styling
import Header from './AdminHeader';
import OurPost from './OurPost';
import GetVideo from './GetVideo';
import AddVideo from './Addvideo';

function PostForm() {
  const [post, setPost] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("media", image);

    try {
      await axios.post("https://indore-corpo-backed-4.onrender.com/api/add-media", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Post uploaded successfully!");
      setPost({ title: '', content: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while posting.");
    }
  };

  return (
    <>
    <Header/>
    <main className="main">

  <OurPost/>
    <div className="form-container" id='createPost'>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="input-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="input-field"
          />
        </div>
        
        <div className="input-group">
          <textarea
            placeholder="Content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input"
          />
          {image && <p className="file-name">{image.name}</p>}
        </div>

        <button type="submit" className="submit-button">Post</button>
      </form>
    </div>
    <GetVideo/>
    <AddVideo/>
    </main>

    </>
  );
}

export default PostForm;
