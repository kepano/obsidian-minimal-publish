publish.registerMarkdownPostProcessor(async (el, ctx) => {
  const images = el.querySelectorAll('.internal-embed');
  images.forEach(image => {
    image.addEventListener('click', function() {

      const lightboxDiv = document.createElement('div');
      lightboxDiv.classList.add('lightbox');

      const contentToMove = this.cloneNode(true);
      lightboxDiv.appendChild(contentToMove);

      document.body.appendChild(lightboxDiv);

      const removeLightbox = () => {
        document.body.removeChild(lightboxDiv);
        document.removeEventListener('keydown', escapeKeyListener);
      };

      lightboxDiv.addEventListener('click', removeLightbox);
      const escapeKeyListener = (event) => {
        if (event.key === "Escape") {
          removeLightbox();
        }
      };
      document.addEventListener('keydown', escapeKeyListener);
    });
  });
});
