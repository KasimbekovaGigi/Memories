// Hamburger

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".breadcumps__nav");
  const hamburger = document.querySelector(".hamburger");

  // Listen for checkbox toggle
  menuToggle.addEventListener("change", () => {
    if (menuToggle.checked) {
      navMenu.classList.add("active");
      hamburger.classList.add("active");
    } else {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Close menu if clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("active") &&
            !event.target.closest(".breadcumps")
    ) {
      menuToggle.checked = false;
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});


const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions-list");

const searchData = [
  "Features",
  "Benefits",
  "Testimonials",
  "Blog",
  "Support",
  "Contact",
  "Why NeverNote"
];

// Function to filter search suggestions
function filterSuggestions(query) {
  return searchData.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Function to display suggestions
function showSuggestions(suggestions) {
  suggestionsList.innerHTML = ""; // Clear previous suggestions
  if (suggestions.length > 0) {
    suggestionsList.style.display = "block";
    suggestions.forEach(suggestion => {
      const suggestionItem = document.createElement("a");
      suggestionItem.href = `#${suggestion.toLowerCase().replace(/\s+/g, "-")}`; // Create a link to the corresponding section
      suggestionItem.textContent = suggestion;
      suggestionsList.appendChild(suggestionItem);
    });
  } else {
    suggestionsList.style.display = "none";
  }
}

// Event listener for search input
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    const filteredSuggestions = filterSuggestions(query);
    showSuggestions(filteredSuggestions);
  } else {
    suggestionsList.style.display = "none"; // Hide suggestions when input is empty
  }
});

// Close suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".breadcrumbs__search")) {
    suggestionsList.style.display = "none";
  }
});






const galleryContainer = document.getElementById("gallery-container");
const paginationNumbers = document.getElementById("pagination-numbers");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

// Image data with categories and date
const images = [
  { src: "../src/assests/pagination/1.jpg", name: "Image 1", category: "take-notes", date: "2022-01-10" },
  { src: "../src/assests/pagination/2.jpg", name: "Image 2", category: "write-wishes", date: "2021-05-12" },
  { src: "../src/assests/pagination/3.jpg", name: "Image 3", category: "take-notes", date: "2023-07-23" },
  { src: "../src/assests/pagination/4.jpg", name: "Image 4", category: "write-wishes", date: "2021-11-01" },
  { src: "../src/assests/pagination/5.jpg", name: "Image 5", category: "take-notes", date: "2020-06-15" },
  { src: "../src/assests/pagination/6.jpg", name: "Image 6", category: "write-wishes", date: "2022-08-30" },
  { src: "../src/assests/pagination/7.jpg", name: "Image 7", category: "take-notes", date: "2023-01-10" },
  { src: "../src/assests/pagination/8.jpg", name: "Image 8", category: "write-wishes", date: "2022-05-02" },
  { src: "../src/assests/pagination/9.jpg", name: "Image 9", category: "take-notes", date: "2021-03-15" },
  { src: "../src/assests/pagination/10.jpg", name: "Image 10", category: "write-wishes", date: "2020-12-25" },
  { src: "../src/assests/pagination/11.jpg", name: "Image 11", category: "take-notes", date: "2021-07-18" },
  { src: "../src/assests/pagination/12.jpg", name: "Image 12", category: "write-wishes", date: "2022-09-03" },
  { src: "../src/assests/pagination/13.jpg", name: "Image 13", category: "take-notes", date: "2023-04-21" },
  { src: "../src/assests/pagination/14.jpg", name: "Image 14", category: "write-wishes", date: "2020-11-10" },
  { src: "../src/assests/pagination/15.jpg", name: "Image 15", category: "take-notes", date: "2021-02-09" },
];

const itemsPerPage = 6;
let currentPage = 1;

function filterImages() {
  const filterValue = filterSelect.value;
  return images.filter(img => filterValue === "all" || img.category === filterValue);
}

function sortImages(filteredImages) {
  const sortValue = sortSelect.value;
  return filteredImages.sort((a, b) => {
    if (sortValue === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortValue === "date") {
      return new Date(b.date) - new Date(a.date); // Sort by date, newest first
    }
  });
}

function renderGallery(page) {
  const filteredImages = filterImages();
  const sortedImages = sortImages(filteredImages);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const imagesToShow = sortedImages.slice(start, end);

  galleryContainer.innerHTML = imagesToShow
    .map(img => `<div class="gallery__item"><img src="${img.src}" alt="${img.name}"></div>`)
    .join("");
}

function renderPagination() {
  const filteredImages = filterImages();
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  // Update Pagination Numbers
  paginationNumbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    span.className = i === currentPage ? "active" : "";
    span.addEventListener("click", () => goToPage(i));
    paginationNumbers.appendChild(span);
  }

  // Update Button States
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
  currentPage = page;
  renderGallery(currentPage);
  renderPagination();
}

// Event Listeners for Prev/Next Buttons
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  const filteredImages = filterImages();
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
});

// Event Listeners for Filter and Sort
filterSelect.addEventListener("change", () => {
  currentPage = 1; // Reset to first page on filter change
  renderGallery(currentPage);
  renderPagination();
});

sortSelect.addEventListener("change", () => {
  currentPage = 1; // Reset to first page on sort change
  renderGallery(currentPage);
  renderPagination();
});

// Initial Render
renderGallery(currentPage);
renderPagination();
