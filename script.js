// This is my restaurant's information. I will replace it with a database once I finish studying the backend.
const restaurants = [
  { name: "Restaurant1", area: "Sapporo, Hokkaido", category: "Seafood", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Restaurant2", area: "Shibuya, Tokyo", category: "Ramen", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Restaurant3", area: "Osaka, Kansai", category: "Sushi", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Restaurant1", area: "Sapporo, Hokkaido", category: "Yakitori", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Restaurant2", area: "Ginza, Tokyo", category: "Okonomiyaki", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Restaurant3", area: "Osaka, Kansai", category: "Tempura", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Restaurant1", area: "Sapporo, Hokkaido", category: "Seafood", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Restaurant2", area: "Shibuya, Tokyo", category: "Ramen", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Restaurant3", area: "Osaka, Kansai", category: "Sushi", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Restaurant1", area: "Sapporo, Hokkaido", category: "Yakitori", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Restaurant2", area: "Ginza, Tokyo", category: "Okonomiyaki", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Restaurant3", area: "Osaka, Kansai", category: "Tempura", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" }
];


function getUniqueValues(array, key) {
  return [...new Set(array.map(item => item[key]))];
}

const uniqueLocations = getUniqueValues(restaurants, "area");
const uniqueCategories = getUniqueValues(restaurants, "category");


console.log("Unique Locations:", uniqueLocations);
console.log("Unique Categories:", uniqueCategories);





function populateDropdown(dropdownId, values) {
  const dropdown = document.querySelector(`#${dropdownId} .dropdown-list`);
  dropdown.innerHTML = ""; 

  values.forEach(value => {
    const li = document.createElement("li");
    li.textContent = value;
    li.dataset.value = value;

    dropdown.appendChild(li);
  });

}

    populateDropdown("locationDropdown", uniqueLocations);
    populateDropdown("categoryDropdown", uniqueCategories);


function activateDropdowns(){

  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach(dropdown => {
    const header = dropdown.querySelector(".dropdown-header");
    const list = dropdown.querySelector(".dropdown-list");
    const selectedText = dropdown.querySelector(".selected-text");
  

    header.addEventListener("click",(event)=>{
      event.stopPropagation();


      dropdowns.forEach(d =>{
        if(d !== dropdown){
          d.classList.remove("active");
          d.querySelector(".dropdown-list").classList.remove("show");
        }
      });

      dropdown.classList.toggle("active");
      list.classList.toggle("show");
    });




    list.addEventListener("click",(event) =>{
      event.stopPropagation();
      const clickedItem = event.target;

      if(clickedItem.tagName === "LI"){
        console.log("I am working");
        selectedText.textContent = clickedItem.textContent;
        selectedText.style.color = "var(--secondary-color)";
        console.log("🔍 Updated text should be:", selectedText.textContent);
        list.classList.remove("show");
        dropdown.classList.remove("active");
      }
    });

    document.addEventListener("click",(event)=>{
      if(!dropdown.contains(event.target)){
        list.classList.remove("show");
        dropdown.classList.remove("active");
      }
    });
  });
}

activateDropdowns();

// keyword input functionality

const container = document.querySelector("#keywordInputContainer");
const field = document.querySelector("#inputField");
const input = document.querySelector("#inputKeyword");
const keywordDropdown = document.querySelector("#keywordDropdown");

const samplekeywords = ["Pizza","Sushi","Burger","Pasta","Ramen","Tacos"];

function populateKeywordDropdown(){
  console.log("I am working");
  keywordDropdown.innerHTML = "";

  samplekeywords.forEach((keyword) => {
    const li = document.createElement("li");

    li.textContent = keyword;
    li.classList.add("dropdown-item");
    li.addEventListener("click",() => {
      input.value = keyword;
      keywordDropdown.classList.remove("show");
    });
    keywordDropdown.appendChild(li);
  });

  document.addEventListener("click",(event)=>{
    if(!container.contains(event.target)){
      keywordDropdown.classList.remove("show");
      input.placeholder = "Type a keyword..."
    }
  });

}

function activateKeywordDropdown(){
  console.log("The dropdown is active");
  container.addEventListener("click",()=>{
    populateKeywordDropdown();
    keywordDropdown.classList.toggle("show");
  
  });}

  activateKeywordDropdown();

  input.addEventListener("focus",function(){
    this.style.transition = "color 0.3s ease";
    this.style.color = "transparent";
  });
  input.addEventListener("blur",function(){
    this.style.color = "";
  });

  console.log("I am runing till the end");



// Scrollable Restaurant Cards
const restaurantContainer = document.querySelector("#restaurantCards");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Constants for scroll functionality
const cardWidth = 300; 
const gap = 20; 
const cardsToScroll = 3;
const scrollAmount = (cardWidth + gap) * cardsToScroll; 

// Function to render restaurants dynamically
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

// Initially render restaurants in scrolling section
renderRestaurants(restaurantContainer);

// Scroll functionality for prev and next Btns
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
const otherContainers = document.querySelectorAll("#workingHours,#searchContainer,#scrollContainer,#recentBlogs");
const viewAllBtn = document.querySelector("#viewAllBtn");
const showLessBtn = document.querySelector("#showLessBtn");

// Ensure View All container and Show Less button start as hidden on page load
viewAllContainer.classList.add("hidden");
showLessBtn.classList.add("hidden");

// Event Listener for View All Btn
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

// Show Less Button - Reset the Layout
showLessBtn.addEventListener("click", () => {
  viewAllContainer.classList.add("hidden");
  viewAllContainer.classList.remove("show");

  otherContainers.forEach(container => {
    container.classList.remove("hidden");
  });
});

// Blog rendering Function
const blogs = [
  {
    title: "Japanese Dining Etiquette",
    description: "Discover the do's and don'ts of dining in Japan.",
    image: "img.img/image1.jpg",
    link: "#"
  },
  {
    title: "Top 10 Sushi Spots",
    description: "Explore the best sushi restaurants in Tokyo.",
    image: "img.img/image2.jpg",
    link: "#"
  },
  {
    title: "Seasonal Japanese Foods",
    description: "Learn about the seasonal dishes you must try.",
    image: "img.img/image3.jpg",
    link: "#"
  }
];

// Function to render blogs dynamically
function renderBlogs() {
  const blogCardsContainer = document.querySelector("#blogCardsContainer");
  blogCardsContainer.innerHTML = ""; // Clears existing blog cards

  blogs.forEach(blog => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    blogCard.innerHTML = `
      <img src="${blog.image}" alt="${blog.title}" />
      <h3>${blog.title}</h3>
      <p>${blog.description}</p>
    `;

    blogCardsContainer.appendChild(blogCard);
  });
}

// Call the function to render blogs on page load
renderBlogs();