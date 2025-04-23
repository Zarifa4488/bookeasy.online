// === DATA ===
const restaurants = [
  {
    name: 'Shima',
    area: 'Sapporo, Hokkaido',
    category: 'Seafood',
    image: 'images/home/image1.jpg'
  },
  {
    name: 'ESquISSE',
    area: 'Shibuya, Tokyo',
    category: 'Ramen',
    image: 'images/home/image2.jpg'
  },
  {
    name: 'Tenyu',
    area: 'Osaka, Kansai',
    category: 'Sushi',
    image: 'images/home/image3.jpg'
  },
  {
    name: 'Kuma 3',
    area: 'Sapporo, Hokkaido',
    category: 'Yakitori',
    image: 'images/home/image1.jpg'
  },
  {
    name: 'Torizen',
    area: 'Ginza, Tokyo',
    category: 'Okonomiyaki',
    image: 'images/home/image2.jpg'
  },
  {
    name: 'Fucha Bon',
    area: 'Osaka, Kansai',
    category: 'Tempura',
    image: 'images/home/image3.jpg'
  },
  {
    name: 'Tomidokoro',
    area: 'Sapporo, Hokkaido',
    category: 'Seafood',
    image: 'images/home/image1.jpg'
  },
  {
    name: 'Sushi Shigeru',
    area: 'Shibuya, Tokyo',
    category: 'Sushi',
    image: 'images/home/image2.jpg'
  },
  {
    name: 'Sushi Dokoro',
    area: 'Osaka, Kansai',
    category: 'Sushi',
    image: 'images/home/image3.jpg'
  },
  {
    name: 'ishibashi',
    area: 'Sapporo, Hokkaido',
    category: 'Yakitori',
    image: 'images/home/image1.jpg'
  },
  {
    name: 'Sushi Kuni',
    area: 'Ginza, Tokyo',
    category: 'Sushi',
    image: 'images/home/image2.jpg'
  },
  {
    name: 'Imari',
    area: 'Osaka, Kansai',
    category: 'Tempura',
    image: 'images/home/image3.jpg'
  }
];

// === UTILS ===
function getUniqueValues(array, key) {
  return [...new Set(array.map((obj) => obj[key]))];
}

// === DROPDOWNS ===
function populateDropdown(dropdownId, values) {
  const dropdown = document.querySelector(`#${dropdownId} .dropdown-list`);
  if (!dropdown) return;

  dropdown.innerHTML = '';
  dropdown.style.maxHeight = '86px';
  dropdown.style.overflowY = 'auto';

  values.forEach((value) => {
    const li = document.createElement('li');
    li.textContent = value;
    li.dataset.value = value;
    dropdown.appendChild(li);
  });
}

function initializeDropdowns() {
  document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
    dropdown.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.custom-dropdown').forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.custom-dropdown .dropdown-list').forEach((list) => {
    list.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const dropdown = event.target.closest('.custom-dropdown');
        const selectedText = dropdown.querySelector('.selected-text');
        const clearBtn = dropdown.querySelector('.clear-btn');
        const arrow = dropdown.querySelector('.arrow');

        selectedText.textContent = event.target.textContent;
        selectedText.style.fontStyle = 'normal';
        dropdown.classList.add('selected');

        clearBtn.style.display = 'block';
        arrow.style.display = 'none';
      }
    });
  });

  document.querySelectorAll('.custom-dropdown .clear-btn').forEach((clearBtn) => {
    clearBtn.addEventListener('click', (event) => {
      const dropdown = event.target.closest('.custom-dropdown');
      const selectedText = dropdown.querySelector('.selected-text');
      const arrow = dropdown.querySelector('.arrow');

      selectedText.textContent =
        dropdown.id === 'locationDropdown' ? 'Select Location' : 'Select Category';
      selectedText.style.fontStyle = 'italic';

      dropdown.classList.remove('selected');
      arrow.style.display = 'block';
      event.target.style.display = 'none';
    });
  });
}

// === RENDER DISPLAY ===
function updateRestaurantDisplay(filtered, titleText = '') {
  const resultsContainer = document.querySelector('#searchResults');
  const allContainer = document.querySelector('#allRestaurants');
  const resultsHeader = document.querySelector('#resultsHeader');
  const cardsWrapper = resultsContainer.querySelector('.results-cards');
  const searchTitle = document.querySelector('.search-title');

  if (!resultsContainer) return;

  // Hide the default container
  if (allContainer) allContainer.style.display = 'none';

  // Show search results container
  resultsContainer.style.display = 'flex';
  cardsWrapper.innerHTML = `<h3 id="resultsHeader"></h3>`; // reset header
  const header = resultsContainer.querySelector('#resultsHeader');

  if (filtered.length === 0) {
    resultsContainer.innerHTML += `<p id="noResults">No matching restaurants found.</p>`;
    return;
  }

  if (header) {
    header.textContent =
      filtered.length === 1 ? '1 restaurant found' : `${filtered.length} restaurants found`;
  }

  if (searchTitle && titleText) searchTitle.textContent = titleText;

  filtered.forEach((restaurant) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}" />
      <h3>${restaurant.name}</h3>
      <p class="area"><span class="material-symbols-outlined">location_on</span> ${restaurant.area}</p>
      <p class="category"><span class="material-symbols-outlined">restaurant</span> ${restaurant.category}</p>
    `;
    cardsWrapper.appendChild(card);
  });
}

// === SEARCH FROM URL PARAMS ===
function searchRestaurantFromParams() {
  const params = new URLSearchParams(window.location.search);
  const location = params.get('location') || '';
  const category = params.get('category') || '';
  const keyword = (params.get('keyword') || '').toLowerCase();

  const filtered = restaurants.filter((r) => {
    const matchLocation = location ? r.area === location : true;
    const matchCategory = category ? r.category === category : true;
    const matchKeyword = keyword
      ? r.name.toLowerCase().includes(keyword) ||
        r.category.toLowerCase().includes(keyword) ||
        r.area.toLowerCase().includes(keyword)
      : true;

    return matchLocation && matchCategory && matchKeyword;
  });

  updateRestaurantDisplay(
    filtered,
    'Didn’t find what you’re looking for? Try refining your search!'
  );
}

// === INIT APP ===
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isHome = path === '/';
  const isRestaurants = path === '/restaurants';
  const hasParams = window.location.search.length > 0;

  const uniqueLocations = getUniqueValues(restaurants, 'area');
  const uniqueCategories = getUniqueValues(restaurants, 'category');

  populateDropdown('locationDropdown', uniqueLocations);
  populateDropdown('categoryDropdown', uniqueCategories);
  initializeDropdowns();

  if (isRestaurants && hasParams) {
    searchRestaurantFromParams();
  } else {
    const container =
      document.querySelector('.all-restaurants-container') ||
      document.querySelector('#restaurantCards');

    if (!container) return;

    restaurants.forEach((restaurant) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}" />
        <h3>${restaurant.name}</h3>
        <p class="area"><span class="material-symbols-outlined">location_on</span> ${restaurant.area}</p>
        <p class="category"><span class="material-symbols-outlined">restaurant</span> ${restaurant.category}</p>
      `;
      container.appendChild(card);
    });

    if (isRestaurants) container.classList.add('all-grid');
  }

  // ✅ Search button → updates URL and triggers filtered render
  document.querySelector('#searchBtn')?.addEventListener('click', () => {
    const location = document.querySelector('#locationDropdown .selected-text').textContent;
    const category = document.querySelector('#categoryDropdown .selected-text').textContent;
    const keyword = document.querySelector('#inputKeyword').value.trim();

    const params = new URLSearchParams();

    if (location && location !== 'Select Location') params.set('location', location);
    if (category && category !== 'Select Category') params.set('category', category);
    if (keyword) params.set('keyword', keyword);

    window.location.href = `/restaurants?${params.toString()}`;
  });
});
