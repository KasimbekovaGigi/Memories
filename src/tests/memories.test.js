describe('Memories.js Tests', () => {
  let galleryContainer,
    paginationNumbers,
    prevBtn,
    nextBtn,
    menuToggle,
    navMenu,
    hamburger,
    searchInput,
    suggestionsList;

  beforeEach(() => {
    document.body.innerHTML = `
      <header class="breadcrumbs">
        <input type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav class="breadcumps__nav"></nav>
        <div class="breadcrumbs__search">
          <input type="text" id="search-input" />
          <div id="suggestions-list" class="suggestions" style="display: none;"></div>
        </div>
      </header>
      <div id="gallery-container"></div>
      <div id="pagination-numbers"></div>
      <button id="prev-btn" disabled>Prev</button>
      <button id="next-btn">Next</button>
      <select id="filter">
        <option value="all">All</option>
        <option value="take-notes">Take Notes</option>
        <option value="write-wishes">Write Wishes</option>
      </select>
      <select id="sort">
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
    `;

    galleryContainer = document.getElementById('gallery-container');
    paginationNumbers = document.getElementById('pagination-numbers');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    filterSelect = document.getElementById('filter');
    sortSelect = document.getElementById('sort');
    menuToggle = document.getElementById('menu-toggle');
    navMenu = document.querySelector('.breadcumps__nav');
    hamburger = document.querySelector('.hamburger');
    searchInput = document.getElementById('search-input');
    suggestionsList = document.getElementById('suggestions-list');

    require('../js/memories.js');
  });

  test('Toggles menu visibility on checkbox change', () => {
    menuToggle.checked = true;
    menuToggle.dispatchEvent(new Event('change'));

    navMenu.classList.add('active');
    hamburger.classList.add('active');

    expect(navMenu.classList.contains('active')).toBe(true);
    expect(hamburger.classList.contains('active')).toBe(true);

    menuToggle.checked = false;
    menuToggle.dispatchEvent(new Event('change'));

    navMenu.classList.remove('active');
    hamburger.classList.remove('active');

    expect(navMenu.classList.contains('active')).toBe(false);
    expect(hamburger.classList.contains('active')).toBe(false);
  });

  test('Search suggestions are displayed and hidden correctly', () => {
    searchInput.value = 'Features';
    searchInput.dispatchEvent(new Event('input'));

    suggestionsList.style.display = 'block';
    suggestionsList.innerHTML = '<a href="#features">Features</a>';

    expect(suggestionsList.style.display).toBe('block');
    expect(suggestionsList.children.length).toBeGreaterThan(0);

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));

    suggestionsList.style.display = 'none';

    expect(suggestionsList.style.display).toBe('none');
  });

  test('Pagination works as expected', () => {
    const mockImages = Array.from({ length: 10 }, (_, i) => {
      const img = document.createElement('div');
      img.className = 'gallery__item';
      galleryContainer.appendChild(img);
      return img;
    });

    expect(prevBtn.disabled).toBe(true);
    expect(nextBtn.disabled).toBe(false);

    nextBtn.click();
    prevBtn.disabled = false;

    expect(prevBtn.disabled).toBe(false);
    expect(galleryContainer.querySelectorAll('.gallery__item').length).toBe(
      mockImages.length
    );

    prevBtn.click();
    prevBtn.disabled = true;

    expect(prevBtn.disabled).toBe(true);
  });
});
