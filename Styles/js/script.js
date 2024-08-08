document.addEventListener('DOMContentLoaded', function() {
  // Mock authentication status (replace this with actual authentication logic)
  const isLoggedIn = false;  // Change to true to simulate a logged-in user

  // Sign In and Register button navigation
  document.getElementById('signInButton').addEventListener('click', function() {
      window.location.href = '/login';
  });

  document.getElementById('registerButton').addEventListener('click', function() {
      window.location.href = '/register';
  });

  // Modal functionality for image pop-out with comments
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const commentsList = document.getElementById('commentsList');
  const newComment = document.getElementById('newComment');
  const postCommentButton = document.getElementById('postCommentButton');
  const closeButton = document.querySelector('.close-button');
  
  // Placeholder for comments (in a real application, you'd fetch these from a server)
  const comments = {
      'image1.jpg': ['Great artwork!', 'Amazing colors!'],
      'image2.jpg': ['I love this piece!', 'So inspiring!'],
      // Add more entries for other images
  };

  function openModal(imageSrc) {
      modal.style.display = 'block';
      modalImage.src = imageSrc;

      commentsList.innerHTML = '';
      const imageComments = comments[imageSrc.split('/').pop()] || [];
      imageComments.forEach(comment => {
          const li = document.createElement('li');
          li.textContent = comment;
          commentsList.appendChild(li);
      });

      // Disable the comment box and button if the user is not logged in
      if (!isLoggedIn) {
          newComment.disabled = true;
          newComment.placeholder = "You must be logged in to post a comment.";
          postCommentButton.disabled = true;
      } else {
          newComment.disabled = false;
          newComment.placeholder = "Add a comment...";
          postCommentButton.disabled = false;
      }
  }

  function closeModal() {
      modal.style.display = 'none';
  }

  const galleryItems = document.querySelectorAll('.gallery-item img');
  galleryItems.forEach(item => {
      item.addEventListener('click', function() {
          openModal(this.src);
      });
  });

  closeButton.addEventListener('click', closeModal);

  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });

  if (isLoggedIn) {
      postCommentButton.addEventListener('click', function() {
          const commentText = newComment.value.trim();
          if (commentText) {
              const li = document.createElement('li');
              li.textContent = commentText;
              commentsList.appendChild(li);
              newComment.value = '';

              const imageSrc = modalImage.src.split('/').pop();
              if (!comments[imageSrc]) {
                  comments[imageSrc] = [];
              }
              comments[imageSrc].push(commentText);
          }
      });
  }
});
