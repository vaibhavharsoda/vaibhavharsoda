const video = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const mirrorButton = document.getElementById('mirrorButton');

let isMirrored = false;


navigator.mediaDevices.getUserMedia({
        video: {
            width: { ideal: 3840 }, // Adjust the ideal width to your needs
            height: { ideal: 2160 } // Adjust the ideal height to your needs
        }
    })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        };
    })
    .catch(error => {
        console.error('Error accessing camera:', error);
    });

function generateUniqueFilename() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    return `captured_image_${timestamp}.jpeg`;
}
mirrorButton.addEventListener('click', () => {
    isMirrored = !isMirrored;
    video.style.transform = isMirrored ? 'scaleX(-1)' : 'scaleX(1)';
});

captureButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // const dataURL = canvas.toDataURL('image/png');
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = generateUniqueFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
