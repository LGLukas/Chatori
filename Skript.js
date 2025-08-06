const fileInput = document.getElementById('fileInput');
const image = document.getElementById('image');
const cropButton = document.getElementById('cropButton');
const resultCanvas = document.getElementById('resultCanvas');
const ctx = resultCanvas.getContext('2d');

let cropper;

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    image.style.display = 'block';

    if (cropper) cropper.destroy();

    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomOnWheel: true,
      movable: true,
      dragMode: 'move',
      autoCropArea: 1,
      responsive: true,
      cropBoxResizable: false,
      cropBoxMovable: false,
    });
  };
  reader.readAsDataURL(file);
});

cropButton.addEventListener('click', () => {
  if (!cropper) return;

  const croppedCanvas = cropper.getCroppedCanvas({
    width: 256,
    height: 256,
    imageSmoothingQuality: 'high'
  });

  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  ctx.drawImage(croppedCanvas, 0, 0, resultCanvas.width, resultCanvas.height);

  const link = document.createElement('a');
  link.download = 'profile.png';
  link.href = resultCanvas.toDataURL('image/png');
  link.click();
});
