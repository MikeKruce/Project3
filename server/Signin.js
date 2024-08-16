document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById("signInModal");
  
    // Get the button that opens the modal
    const btn = document.querySelector(".sign-in-button");
  
    // Get the <span> element that closes the modal
    const span = document.querySelector(".close");
  
    // Get all the images in the gallery
    const galleryImages = document.querySelectorAll(".gallery-item img");
  
    // Check if the elements exist
    if (btn && modal) {
      // When the user clicks the button, open the modal 
      btn.onclick = function() {
        modal.style.display = "block";
      }
    }
  
    if (span) {
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  
    // Add click event listeners to each image in the gallery
    galleryImages.forEach(function(img) {
      img.onclick = function() {
        // Example action: Alert the image's alt text
        alert('You clicked on: ' + img.alt);
        
        // You can add code here to open a modal, display a larger version of the image, etc.
      }
    });
  });
  