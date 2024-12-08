// Constants for Google Drive API
const API_KEY = 'AIzaSyCgkQ2GWpKqy-z0eZqmSA0t13QCxm5r9DY';
const FOLDER_ID = '1UGM6jngyRxueLFILwucp3pqU-1vv1NMz';
const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/files';

let imageList = []; // To store the list of images for navigation
let currentIndex = 0; // Track the current image index
let isZoomed = false; // Track zoom state
let isDragging = false; // Track dragging state
let startX = 0, startY = 0; // Start positions for dragging
let offsetX = 0, offsetY = 0; // Track drag offsets
let currentSortOption = 'name-asc'; // Default sort option
let currentLayoutOption = 'grid'; // Default layout option

// Fetch photos from Google Drive
async function fetchPhotosFromDrive(nextPageToken = null) {
    try {
        const queryParams = new URLSearchParams({
            key: API_KEY,
            q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed=false`,
            fields: 'nextPageToken, files(id, name, webContentLink, thumbnailLink, createdTime)',
            pageSize: 100,
        });

        if (nextPageToken) {
            queryParams.append('pageToken', nextPageToken);
        }

        const response = await fetch(`${DRIVE_API_URL}?${queryParams}`);
        if (!response.ok) {
            throw new Error('Failed to fetch files from Google Drive.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching photos:', error.message);
        return { files: [], nextPageToken: null };
    }
}

// Render photos in the selected layout
async function renderPhotos() {
    const galleryContainer = document.getElementById('gallery');
    const loadingText = document.getElementById('loading');

    let nextPageToken = null;

    do {
        const data = await fetchPhotosFromDrive(nextPageToken);
        nextPageToken = data.nextPageToken;

        data.files.forEach((photo) => {
            imageList.push({
                id: photo.id,
                name: photo.name,
                src: photo.thumbnailLink ? photo.thumbnailLink.replace('=s220', '=s1024') : photo.webContentLink,
                createdTime: photo.createdTime
            });
        });
    } while (nextPageToken);

    sortAndRenderImages('name-asc'); // Default sorting by name (numerically)
    loadingText.style.display = 'none'; // Hide loading text
}

// Sort and render images
function sortAndRenderImages(sortOption) {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = ''; // Clear the container
    sortImages(sortOption); // Sort images based on the selected option

    imageList.forEach((photo, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src;
        imgElement.alt = `Image ${index + 1}`;
        imgElement.classList.add('gallery-item');
        detectImageOrientation(photo.src, imgElement);
        if (currentLayoutOption === 'grid') {
            imgElement.setAttribute('data-aos', 'fade-up');
        } else {
            imgElement.removeAttribute('data-aos'); // Remove AOS attributes if not in grid mode
        }
        imgElement.addEventListener('click', () => openModal(index)); 
        galleryContainer.appendChild(imgElement);
    });

    updateLayout(); // Apply the current layout style (grid or masonry)
}

// **Detect if image is vertical**
function detectImageOrientation(imageUrl, imgElement) {
    const tempImg = new Image();
    tempImg.src = imageUrl;
    tempImg.onload = function () {
        if (tempImg.height > tempImg.width) {
            imgElement.classList.add('vertical'); // Add "vertical" class to vertically dominant images
        }
    };
}
// Sort images based on the user's selected option
function sortImages(option) {
    switch (option) {
        case 'name-asc':
            imageList.sort((a, b) => extractNumber(a.name) - extractNumber(b.name));
            break;
        case 'name-desc':
            imageList.sort((a, b) => extractNumber(b.name) - extractNumber(a.name));
            break;
    }
}

// Extract the numeric part from the image name (e.g., "1.jpg" => 1, "10.jpg" => 10)
function extractNumber(name) {
    const match = name.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}

// Open Modal
function openModal(index) {
    currentIndex = index;
    document.body.style.overflow = 'hidden';
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');

    const { src } = imageList[currentIndex];

    modalImg.src = src.replace('=s1024', '=s1920'); // Load highest resolution
    modal.style.display = 'flex';

    // Reset zoom and offsets
    modalImg.style.transform = 'scale(1)';
    modalImg.style.cursor = 'zoom-in';
    offsetX = 0;
    offsetY = 0;
    isZoomed = false;
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';

    document.body.style.overflow = 'auto';

}

// Navigate to the Next Image
function nextImage() {
    currentIndex = (currentIndex + 1) % imageList.length;
    openModal(currentIndex);
}

// Navigate to the Previous Image
function prevImage() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    openModal(currentIndex);
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const headers = document.getElementsByClassName('portfolio-header');
    const themeToggle = document.getElementById('theme-toggle');

    for (let i = 0; i < headers.length; i++) {
        headers[i].classList.toggle('dark');
    }

    // **Check if dark mode is active and update the icon**
    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = '🌙'; // Moon icon for dark mode
    } else {
        themeToggle.textContent = '🌞'; // Sun icon for light mode
    }
}


// Event Listeners
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('sort-toggle').addEventListener('click', toggleSortOption);
document.getElementById('layout-toggle').addEventListener('click', toggleLayoutOption);

document.getElementById('modal-image').addEventListener('click', enableZoom); // Zoom toggle

// Enable toggle functionality for sorting
function toggleSortOption() {
    currentSortOption = currentSortOption === 'name-asc' ? 'name-desc' : 'name-asc';
    document.getElementById('sort-toggle').textContent = currentSortOption === 'name-asc' ? 'UP-DOWN' : 'DOWN-UP';
    sortAndRenderImages(currentSortOption);
}

// Enable toggle functionality for layout
function toggleLayoutOption() {
    currentLayoutOption = currentLayoutOption === 'grid' ? 'masonry' : 'grid';
    document.getElementById('layout-toggle').textContent = currentLayoutOption === 'grid' ? 'GRID' : 'MASONRY';

    const galleryContainer = document.getElementById('gallery');
    const images = galleryContainer.querySelectorAll('img');

    images.forEach((imgElement) => {
        if (currentLayoutOption === 'grid') {
            imgElement.setAttribute('data-aos', 'fade-up'); // Optional: Custom delay
        } else {
            imgElement.removeAttribute('data-aos'); 
        }
    });

    updateLayout(); // Apply the new layout style (grid or masonry)
    if (currentLayoutOption === 'grid') {
        setTimeout(() => {
            AOS.init();
            AOS.refresh();
        }, 100); // Small delay to ensure all elements are in the DOM
    }
}


// Update layout (grid or masonry)
function updateLayout() {
    const galleryContainer = document.getElementById('gallery');
    if (currentLayoutOption === 'grid') {
        galleryContainer.classList.add('grid-layout');
        galleryContainer.classList.remove('masonry-grid');
    } else {
        galleryContainer.classList.add('masonry-grid');
        galleryContainer.classList.remove('grid-layout');
    }
}

// Enable Zoom and Dragging
function enableZoom(event) {
    const modalImg = event.target;
    isZoomed = !isZoomed;

    // Attach this to the event listener for zoom functionality
if (isZoomed) {
    modalImg.style.transform = 'scale(2)'; // Zoom in
    modalImg.style.cursor = 'zoom-out'; 
    // Attach mousemove event
    modalImg.addEventListener('mousemove', moveImageOpposite);
} else {
    // Remove mousemove event when zoom is disabled
    modalImg.style.cursor = 'zoom-in'; 
    modalImg.style.transform = 'scale(1)'; // Zoom out
    modalImg.removeEventListener('mousemove', moveImageOpposite);
    offsetX = 0;
    offsetY = 0; 
}

}

function moveImageOpposite(event) {
    
    const modalImg = event.target;
    const bounds = modalImg.getBoundingClientRect();
    const mouseX = event.clientX - bounds.left; // X coordinate of mouse relative to image
    const mouseY = event.clientY - bounds.top; // Y coordinate of mouse relative to image

    // Calculate the percentage of mouse position relative to the image
    const percentX = (mouseX / bounds.width) * 100;
    const percentY = (mouseY / bounds.height) * 100;

    // Opposite movement logic: 
    // As the mouse moves to the right, the image moves to the left, and vice versa
    // As the mouse moves down, the image moves up, and vice versa
    const translateX = (percentX - 50) * -0.8; // Multiplier for smooth opposite movement
    const translateY = (percentY - 50) * -0.8; // Multiplier for smooth opposite movement

    // Update the image's transform to scale and move
    modalImg.style.transform = `scale(2) translate(${translateX}%, ${translateY}%)`;
}

// Initialize the App
renderPhotos();
