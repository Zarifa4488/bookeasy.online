// This is my restaurant's information. I will replace it with a database once I finish studying the backend.
const restaurants = [
  { name: "Shima", area: "Sapporo, Hokkaido", category: "Seafood", image: "images/img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "ESquISSE", area: "Shibuya, Tokyo", category: "Ramen", image: "images/img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Tenyu", area: "Osaka, Kansai", category: "Sushi", image: "images/img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Kuma 3", area: "Sapporo, Hokkaido", category: "Yakitori", image: "images/img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Torizen", area: "Ginza, Tokyo", category: "Okonomiyaki", image: "images/img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Fucha Bon", area: "Osaka, Kansai", category: "Tempura", image: "images/img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Tomidokoro", area: "Sapporo, Hokkaido", category: "Seafood", image: "images/img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Sushi Shigeru", area: "Shibuya, Tokyo", category: "Sushi", image: "images/img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Sushi Dokoro", area: "Osaka, Kansai", category: "Sushi", image: "images/img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "ishibashi", area: "Sapporo, Hokkaido", category: "Yakitori", image: "images/img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Sushi Kuni", area: "Ginza, Tokyo", category: "Sushi", image: "images/img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Imari", area: "Osaka, Kansai", category: "Tempura", image: "images/img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" }
];

function getUniqueValues(array, key) {
  return [...new Set(array.map(object => object[key]))];
}

const uniqueLocations = getUniqueValues(restaurants, "area");
const uniqueCategories = getUniqueValues(restaurants, "category");


// Got unique values from restaurants array and saved them to uniqueLocations and uniqueCategories.



function populateDropdown(dropdownId, values) {
  const dropdown = document.querySelector(`#${dropdownId} .dropdown-list`);
  dropdown.innerHTML = ""; 

  dropdown.style.maxHeight = "120px";
  dropdown.style.overflowY = "auto";

  values.forEach(value => {
    const li = document.createElement("li");
    li.textContent = value;
    li.dataset.value = value;

    dropdown.appendChild(li);
  });
}
    populateDropdown("locationDropdown", uniqueLocations);
    populateDropdown("categoryDropdown", uniqueCategories);


    document.querySelectorAll(".custom-dropdown").forEach(dropdown =>{
      dropdown.addEventListener("click",function(){
        this.classList.toggle("active");
      });
    });

    document.addEventListener("click",function(event){
      document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
        if(!dropdown.contains(event.target)){
          dropdown.classList.remove("active");
        }
      });
    });

      function selectValue(event){
        if(event.target.tagName === "LI"){
          const dropdown = event.target.closest(".custom-dropdown");

          if(dropdown){
            const selectedText = dropdown.querySelector(".selected-text");
            const clearBtn = dropdown.querySelector(".clear-btn");
            const arrow = dropdown.querySelector(".arrow");

            selectedText.textContent = event.target.textContent;
            selectedText.style.fontStyle = "normal";

            dropdown.classList.add("selected");

            clearBtn.style.display = "block";
            arrow.style.display = "none";
          }
        }
      }


      function clearValue(event){
        const dropdown = event.target.closest(".custom-dropdown");

        if(dropdown){
          const selectedText = dropdown.querySelector(".selected-text");
          const clearBtn = dropdown.querySelector(".clear-btn");
          const arrow = dropdown.querySelector(".arrow");


          selectedText.textContent =
          dropdown.id === "locationDropdown" ? "Select Location" : "Select Category";
          selectedText.style.fontStyle = "italic";

          dropdown.classList.remove("selected");
          arrow.style.display = "block";
          clearBtn.style.display = "none";
        }
      }
  
      document.querySelectorAll(".custom-dropdown .dropdown-list").forEach(dropdownList =>{
        dropdownList.addEventListener("click",selectValue);
      });

      document.querySelectorAll(".custom-dropdown .clear-btn").forEach(clearBtn =>{
        clearBtn.addEventListener("click",clearValue);
      });
  

// Search button functionality
function searchRestaurant(){
  let selectedLocation = document.querySelector("#locationDropdown .selected-text").textContent;
  if(selectedLocation === "Select Location") selectedLocation = "";

  let selectedCategory = document.querySelector("#categoryDropdown .selected-text").textContent;
  if(selectedCategory === "Select Category") selectedCategory = "";

  let keyword = document.querySelector("#inputKeyword").value.trim().toLowerCase(); 

  let titleText = "Looking for something else? Try another search.";

  if (!selectedLocation && !selectedCategory && !keyword) {
    titleText = "Showing all restaurants. Use the filters to refine your search.";
  }

  let filterRestaurants = restaurants.filter(restaurant => {
    let matchesLocation = selectedLocation ? restaurant.area === selectedLocation : true;
    let matchesCategory = selectedCategory ? restaurant.category === selectedCategory : true;
    let matchesKeyword = keyword 
      ? (restaurant.name.toLowerCase().includes(keyword) ||
         restaurant.category.toLowerCase().includes(keyword) ||
         restaurant.area.toLowerCase().includes(keyword)) 
      : true;

    return matchesLocation && matchesCategory && matchesKeyword;
  });

  updateRestaurantDisplay(filterRestaurants, titleText);
}

document.querySelector("#searchBtn").addEventListener("click",searchRestaurant);
  


function updateRestaurantDisplay(filterRestaurants, titleText = "Looking for something else? Try another search."){
  let searchResultsContainer = document.querySelector("#searchResultsContainer");
  let otherContainers = document.querySelectorAll("#scrollContainer,#recentPosts");
  let container = document.querySelector("#searchResults");
  let slogan = document.querySelector(".slogan");
  let searchContainer = document.querySelector(".search-container");
  let inputFields = document.querySelectorAll(".dropdown-header,.input-field");
  let lists = document.querySelectorAll(".dropdown-list");
  let resultsHeader = document.querySelector("#resultsHeader");
  let searchTitle = document.querySelector(".search-title");
  container.innerHTML = "";

  if (filterRestaurants.length === 0){
    container.innerHTML = `<p id = "noResults">No matching restaurants found.<p>`;
    return;
  }else{
    let count = filterRestaurants.length;
    resultsHeader.textContent = count === 1 ? "1 restaurant found" : `${count} restaurants found`;
  }

  if(slogan){
    slogan.classList.add("searchMode");
  }

  inputFields.forEach(field => field.classList.remove("searchMode"));
  lists.forEach(list => list.classList.remove("searchMode"));

  inputFields.forEach(fields =>{
    fields.classList.add("searchMode");
  });
  lists.forEach(list => {
    list.classList.add("searchMode");
  });

  searchContainer.classList.add("searchMode");
  if (searchTitle) {
    searchTitle.innerText = titleText;
  }


  


  filterRestaurants.forEach(restaurant => {
    let card = document.createElement("div");
    card.classList.add ("card");
    card.innerHTML = `
    <img src="${restaurant.image}" alt="${restaurant.name}" />
              <h3>${restaurant.name}</h3>
              <p class="area"><span class="material-symbols-outlined">location_on</span> ${restaurant.area}</p>
              <p class="category"><span class="material-symbols-outlined">restaurant</span> ${restaurant.category}</p>
              <p class="price">${restaurant.approxPrice}</p>
    `;
    container.appendChild(card);
  });
  otherContainers.forEach(container => {
    container.style.display = "none";
  });
  searchResultsContainer.style.display = "grid";
}


// Recently viewed restaurants functionality
const restaurantContainer = document.querySelector("#restaurantCards");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const cardWidth = 300; 
const gap = 20; 
const cardsToScroll = 3;
const scrollAmount = (cardWidth + gap) * cardsToScroll; 

function renderRestaurants(targetContainer) {
  targetContainer.innerHTML = "";

  restaurants.forEach((restaurant) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${restaurant.image}" alt="${restaurant.name}" />
      <h3>${restaurant.name}</h3>
      <p class="area">
        <span class="material-symbols-outlined">location_on</span>
        <a href="#" class="same-area">${restaurant.area}</a>
      </p>
      <p class="category">
        <span class="material-symbols-outlined">restaurant</span>
        <a href="#" class="same-category">${restaurant.category}</a>
      </p>
      <p class="price">${restaurant.approxPrice}</p>
    `;
    targetContainer.appendChild(card);
  });
}

renderRestaurants(restaurantContainer);

nextBtn.addEventListener("click", () => {
  restaurantContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

prevBtn.addEventListener("click", () => {
  restaurantContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

// View All Functionality
const viewAllContainer = document.querySelector("#viewAllContainer");
const allRestaurantsContainer = document.querySelector("#allRestaurants");
const otherContainers = document.querySelectorAll("#workingHours,#searchContainer,#scrollContainer,#recentPosts");
const viewAllBtn = document.querySelector("#viewAllBtn");
const showLessBtn = document.querySelector("#showLessBtn");

viewAllContainer.classList.add("hidden");
showLessBtn.classList.add("hidden");

viewAllBtn.addEventListener("click", () => {
  if (viewAllContainer.classList.contains("hidden")) {
    viewAllContainer.classList.remove("hidden");
    viewAllContainer.classList.add("show");

    showLessBtn.classList.remove("hidden");

    otherContainers.forEach(container => {
      container.classList.add("hidden");
    });

    renderRestaurants(allRestaurantsContainer);
  } else {
    viewAllContainer.classList.add("hidden");
    viewAllContainer.classList.remove("show");

    showLessBtn.classList.add("hidden");

    otherContainers.forEach(container => {
      container.classList.remove("hidden");
    });
  }
});

showLessBtn.addEventListener("click", () => {
  viewAllContainer.classList.add("hidden");
  viewAllContainer.classList.remove("show");

  otherContainers.forEach(container => {
    container.classList.remove("hidden");
  });
});

// Posts functionality
const posts = [
  {
    title: "Top 5 Sushi Spots in Tokyo",
    description:"Explore Tokyo’s best-kept sushi secrets, from hidden gems to local favorites.",
    date: "Mar 28, 2025",
    authorInitials: "ZS",
    nickname:"Zara",
    views:23,
  },
  {
    title: "How to Book a Restaurant Without Japanese",
    description:"From creamy parfaits to fluffy cakes—don’t miss these Kyoto matcha treats.",
    date: "Mar 27, 2025",
    authorInitials: "ZA",
    nickname:"Fuyu",
    views: 83,
  },
  {
    title: "5 Must-Try Matcha Desserts",
    description:"Explore A step-by-step guide for foreigners to book restaurants stress-free in Japan.",
    date: "Mar 26, 2025",
    authorInitials: "MK",
    nickname:"Kaitotto",
    views: 77,
  },
  {
    title: "Top 5 Sushi Spots in Tokyo",
    description:"Explore Tokyo’s best-kept sushi secrets, from hidden gems to local favorites.",
    date: "Mar 28, 2025",
    authorInitials: "ZS",
    nickname:"Zara",
    views:23,
  },
  {
    title: "How to Book a Restaurant Without Japanese",
    description:"From creamy parfaits to fluffy cakes—don’t miss these Kyoto matcha treats.",
    date: "Mar 27, 2025",
    authorInitials: "ZA",
    nickname:"Fuyu",
    views: 83,
  },
  {
    title: "5 Must-Try Matcha Desserts",
    description:"Explore A step-by-step guide for foreigners to book restaurants stress-free in Japan.",
    date: "Mar 26, 2025",
    authorInitials: "MK",
    nickname:"Kaitotto",
    views: 77,
  }
];


const moreContainer = document.querySelector("#moreContainer");
const postCardsContainer = document.querySelector("#postCardsContainer"); 
const moreBtn = document.querySelector(".more-btn");
const lessBtn = document.querySelector("#lessBtn");


function renderPosts(container, count = posts.length) {
  const postContainer = container.id==="postCardsContainer" ? container:container.querySelector("#allPosts");

postContainer.innerHTML = "";

  posts.slice(0,count).forEach(post => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    postCard.innerHTML = `
    <div class="post-header">
    <div class="avatar-circle">
      <span class="initials">${post.authorInitials || "?"}</span>
    </div>
    <div class="nickname-date">
    <span class="nickname">${post.nickname || "?"}</span>
    <span class="post-date">${post.date || ""}</span>
    </div>
    </div>
      <div class="post-body">
    <h3 class="post-title">${post.title}</h3>
    <h4 class="post-description">${post.description}</h4>
  </div>
  <div class="post-footer">
  <div class="views">
    <span class="post-views">${post.views || ""}</span>
    <p class="views-text">views</p>
    </div>
  </div>
    `;

    postContainer.appendChild(postCard);
  });
}
renderPosts(document.querySelector("#postCardsContainer"),3);



// More Button functionality

moreContainer.classList.add("hidden");
moreContainer.classList.remove("show");

moreBtn.addEventListener("click", () => {
  if (moreContainer.classList.contains("hidden")) {
    moreContainer.classList.remove("hidden");
    moreContainer.classList.add("show");

    lessBtn.classList.remove("hidden");
    lessBtn.classList.add("show");

    otherContainers.forEach(container => {
      container.classList.add("hidden");
    });

    renderPosts(moreContainer); 
  } else {
    moreContainer.classList.remove("show");
    moreContainer.classList.add("hidden");

    lessBtn.classList.add("hidden"); 

    otherContainers.forEach(container => {
      console.log("came till here")
      container.classList.remove("hidden");
    });
    renderPosts(postCardsContainer,3); 
  }
});

lessBtn.addEventListener("click", () => {

  moreContainer.classList.add("hidden");
  moreContainer.classList.remove("show");

  lessBtn.classList.add("hidden");
  moreBtn.classList.remove("hidden"); 


  otherContainers.forEach(container => {
    container.classList.remove("hidden");
  });
  renderPosts(postCardsContainer, 3);
});
