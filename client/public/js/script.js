document.addEventListener('DOMContentLoaded', function() {
  const signInButton = document.getElementById('signInButton');
  if (signInButton) {
    signInButton.addEventListener('click', function() {
      window.location.href = '/login';
    });
  }

  const registerButton = document.getElementById('registerButton');
  if (registerButton) {
    registerButton.addEventListener('click', function() {
      window.location.href = '../public/register.html';
    });
  }

  // Modal functionality for image pop-out with comments
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const commentsList = document.getElementById('commentsList');
  const newComment = document.getElementById('newComment');
  const postCommentButton = document.getElementById('postCommentButton');
  const closeButton = document.querySelector('.close-button');

  // Define isLoggedIn (you need to dynamically set this based on your app's logic)
  const isLoggedIn = false; // Set to true if user is logged in

  // Placeholder for comments
  const comments = {
    'image1.jpg': ['Great artwork!', 'Amazing colors!'],
    'image2.jpg': ['I love this piece!', 'So inspiring!'],
    // Add more entries for other images
  };

  function openModal(imageSrc) {
    if (modal && modalImage) {
      modal.style.display = 'block';
      modalImage.src = imageSrc;

      commentsList.innerHTML = '';
      const imageComments = comments[imageSrc.split('/').pop()] || [];
      imageComments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentsList.appendChild(li);
      });

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
  }

  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
    }
  }

  const galleryItems = document.querySelectorAll('.gallery-item img');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      openModal(this.src);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  if (isLoggedIn && postCommentButton) {
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

  // PWA Install banner
  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e; // Save the event for later use
    document.getElementById('installBanner').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
        document.getElementById('installBanner').style.display = 'none';
        deferredPrompt.prompt(); // Show the install prompt

        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        deferredPrompt = null; // Reset the deferredPrompt variable
    }
});

document.getElementById('dismissButton').addEventListener('click', () => {
    document.getElementById('installBanner').style.display = 'none';
});


  // iOS specific banner
  if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      const iosInstallBanner = document.getElementById('iosInstallBanner');
      if (iosInstallBanner) {
          iosInstallBanner.style.display = 'block';
      }
  }

  const dismissIosBanner = document.getElementById('dismissIosBanner');
  if (dismissIosBanner) {
      dismissIosBanner.addEventListener('click', () => {
          const iosInstallBanner = document.getElementById('iosInstallBanner');
          if (iosInstallBanner) {
              iosInstallBanner.style.display = 'none';
          }
      });
  }

});
