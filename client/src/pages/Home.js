import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ username, isLoggedIn, onLogout, onLogin }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [gallery, setGallery] = useState([
    { src: `${process.env.PUBLIC_URL}/Styles/images/image1.jpg`, artist: 'Bobby Joe', title: 'Eye See You' },
    { src: `${process.env.PUBLIC_URL}/Styles/images/image2.jpg`, artist: 'Carol Danvers', title: 'Mystical Religion' },
    { src: `${process.env.PUBLIC_URL}/Styles/images/image3.jpg`, artist: 'Jason Voorhees', title: 'Purple David' },
    { src: `${process.env.PUBLIC_URL}/Styles/images/image4.jpg`, artist: 'Elon Musk', title: 'Impaled Spaceman' },
    { src: `${process.env.PUBLIC_URL}/Styles/images/image5.jpg`, artist: 'John Coffey', title: 'Mam' },
    { src: `${process.env.PUBLIC_URL}/Styles/images/image6.jpg`, artist: 'Stephen King', title: 'Retro It' },
  ]);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const openImageModal = (imageSrc) => {
    setClickedImage(imageSrc);
    setComments(['Great artwork!', 'Amazing colors!']); // Mock comments
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setClickedImage(null);
    setComments([]);
    setNewComment('');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.artFile;
    const artTitle = e.target.elements.artTitle.value;

    if (fileInput.files.length > 0) {
      const newArt = {
        src: URL.createObjectURL(fileInput.files[0]),
        artist: username, // User's first and last name from registration
        title: artTitle
      };

      setGallery([newArt, ...gallery]); // Add new artwork to the beginning of the gallery
      closeUploadModal(); // Close the modal after upload
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Mock sign-in logic
    if (email === 'user@example.com' && password === 'password') {
      onLogin('John Doe'); // Assuming you pass in the username from the parent component
      closeSignInModal();
    } else {
      alert('Sign in failed. Please check your email and password.');
    }
  };

  return (
    <div>
      <header>
        <nav>
          <div className="nav-container">
            <div className="logo-title">
              <img src={`${process.env.PUBLIC_URL}/Styles/images/logo.png`} alt="Art Studio Logo" className="logo" />
              <h1 className="gradient-text">
                <span>V</span><span>i</span><span>v</span><span>i</span><span>d</span> 
                <span>A</span><span>r</span><span>t</span> 
                <span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span>
              </h1>
            </div>
            <div className="nav-buttons">
              {isLoggedIn ? (
                <>
                  <span className="user-greeting">Hello, {username}</span>
                  <button onClick={onLogout} className="logout-button">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={openSignInModal} className="sign-in-button">Sign In</button>
                  <Link to="/register">
                    <button id="registerButton" className="register-button">Register</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <section id="about">
        <h2>Welcome to the Vivid Art Studio</h2>
        <p>Explore, Create, and be Inspired!</p>
        <p>Enjoy thousands of Digital Artworks from different artists with their own unique styles.</p>
        <p>Feel free to use any of the artworks from our site, as well as post your very own artworks for others to use. Enjoy!</p>
      </section>

      {isLoggedIn && (
        <div className="upload-button-container">
          <button onClick={openUploadModal} className="upload-button">Upload Art</button>
        </div>
      )}

      <section id="gallery">
        <h2>Gallery</h2>
        <div className="gallery-container">
          {gallery.map((art, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={art.src}
                alt={art.title}
                onClick={() => openImageModal(art.src)}
              />
              <p><strong>Artist:</strong> {art.artist}</p>
              <p><strong>Artwork Title:</strong> {art.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign-In Modal */}
      {isSignInModalOpen && (
        <div id="signInModal" className={`modal open`}>
          <div className="modal-content">
            <span className="close close-button" onClick={closeSignInModal}>&times;</span>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}> {/* onSubmit goes here */}
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div id="imageModal" className={`modal open`}>
          <div className="modal-content">
            <span className="close close-button" onClick={closeImageModal}>&times;</span>
            <img src={clickedImage} alt="Clicked Artwork" />
            <div id="commentsSection">
              <h3>Comments</h3>
              <ul id="commentsList">
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              {isLoggedIn ? (
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    id="newComment"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                    required
                  />
                  <button id="postCommentButton" type="submit">Post Comment</button>
                </form>
              ) : (
                <p>Please sign in to add comments.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Art Modal */}
      {isUploadModalOpen && (
        <div id="uploadModal" className={`modal open`}>
          <div className="modal-content">
            <span className="close close-button" onClick={closeUploadModal}>&times;</span>
            <h2>Upload Your Artwork</h2>
            <form onSubmit={handleUpload}>
              <label htmlFor="artFile">Choose File:</label>
              <input type="file" id="artFile" name="artFile" required />
              <label htmlFor="artTitle">Artwork Title:</label>
              <input type="text" id="artTitle" name="artTitle" required />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2024 Art Studio.</p>
      </footer>
    </div>
  );
};

export default Home;
