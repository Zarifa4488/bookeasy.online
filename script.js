// This is my restaurant's information. I will replace it with a database once I finish studying the backend.
const restaurants = [
  { name: "Shima", area: "Sapporo, Hokkaido", category: "Seafood", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "ESquISSE", area: "Shibuya, Tokyo", category: "Ramen", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Tenyu", area: "Osaka, Kansai", category: "Sushi", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Kuma 3", area: "Sapporo, Hokkaido", category: "Yakitori", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Torizen", area: "Ginza, Tokyo", category: "Okonomiyaki", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Fucha Bon", area: "Osaka, Kansai", category: "Tempura", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "Tomidokoro", area: "Sapporo, Hokkaido", category: "Seafood", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Sushi Shigeru", area: "Shibuya, Tokyo", category: "Sushi", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Sushi Dokoro", area: "Osaka, Kansai", category: "Sushi", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  { name: "ishibashi", area: "Sapporo, Hokkaido", category: "Yakitori", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Sushi Kuni", area: "Ginza, Tokyo", category: "Sushi", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Imari", area: "Osaka, Kansai", category: "Tempura", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" }
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

document.querySelector("#searchBtn").addEventListener("click",function() {


  let selectedLocation = document.querySelector("#locationDropdown .selected-text").textContent;
  if(selectedLocation === "Select Location") selectedLocation = "";


  let selectedCategory = document.querySelector("#categoryDropdown .selected-text").textContent;
  if(selectedCategory === "Select Category") selectedCategory = "";

  let keyword = document.querySelector("#inputKeyword").value.trim().toLowerCase(); 

  let filterRestaurants = restaurants.filter(restaurant => {
    let matchesLocation = selectedLocation ? restaurant.area === selectedLocation : true;
    let matchesCategory = selectedCategory ? restaurant.category === selectedCategory : true;
    let matchesKeyword = keyword 
    ? (restaurant.name.toLowerCase().includes(keyword)||
       restaurant.category.toLowerCase().includes(keyword)||
       restaurant.area.toLowerCase().includes(keyword)) 
       : true;
    return matchesLocation && matchesCategory && matchesKeyword;
  });

  updateRestaurantDisplay(filterRestaurants);

});

function updateRestaurantDisplay(filterRestaurants){

  let container = document.querySelector("#restaurantCards");
  container.innerHTML = "";

  if (filterRestaurants.length === 0){
    container.innerHTML = `<p id = "noResults" >No matching restaurants found.<p>`;
    return;
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
const otherContainers = document.querySelectorAll("#workingHours,#searchContainer,#scrollContainer,#recentBlogs");
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

// Blogs functionality
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
  },
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
  },
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


const moreContainer = document.querySelector("#moreContainer");
const blogCardsContainer = document.querySelector("#blogCardsContainer"); // Fixed ID
const moreBtn = document.querySelector(".more-btn");
const lessBtn = document.querySelector("#lessBtn");


function renderBlogs(container, count = blogs.length) {
  console.log("Blogs running");
  const blogContainer = container.id==="blogCardsContainer" ? container:container.querySelector("#allBlogs");

  if (!blogContainer) {
    console.error("allBlogs container not found inside", container);
    return;
  }

blogContainer.innerHTML = "";

  blogs.slice(0,count).forEach(blog => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    blogCard.innerHTML = `
      <img src="${blog.image}" alt="${blog.title}" />
      <h3>${blog.title}</h3>
      <p>${blog.description}</p>
    `;

    blogContainer.appendChild(blogCard);
  });
}
console.log("Blog Cards Container:", blogCardsContainer);
renderBlogs(document.querySelector("#blogCardsContainer"),3);



// More Button functionality

moreContainer.classList.add("hidden");
moreContainer.classList.remove("show");

moreBtn.addEventListener("click", () => {
  console.log("blogs running here too");
  if (moreContainer.classList.contains("hidden")) {
    console.log("yessss");
    moreContainer.classList.remove("hidden");
    moreContainer.classList.add("show");

    lessBtn.classList.remove("hidden");
    console.log("Less button should be visible now:", lessBtn);
    lessBtn.classList.add("show");

    console.log("Less button should be visible here too now:", lessBtn);

    otherContainers.forEach(container => {
      console.log("yess 22")
      container.classList.add("hidden");
    });

    renderBlogs(moreContainer); 
    console.log("I am running hahaahha")
  } else {
    console.log("is it me???")
    moreContainer.classList.remove("show");
    moreContainer.classList.add("hidden");

    lessBtn.classList.add("hidden"); 

    otherContainers.forEach(container => {
      console.log("came till here")
      container.classList.remove("hidden");
    });
    console.log("Blog Cards Container:", blogCardsContainer);
    renderBlogs(blogCardsContainer,3); 
  }
  console.log("still hereeeeee")
});

lessBtn.addEventListener("click", () => {

  console.log("I am less button I am working");
  moreContainer.classList.add("hidden");
  moreContainer.classList.remove("show");

  lessBtn.classList.add("hidden");
  moreBtn.classList.remove("hidden"); 


  otherContainers.forEach(container => {
    container.classList.remove("hidden");
  });
  renderBlogs(blogCardsContainer, 3);
});
