const restaurants = [
  { name: "Restaurant1", area: "Sapporo, Hokkaido", category: "Seafood", image: "img.img/image1.jpg", approxPrice: "¥3,000 - ¥5,000" },
  { name: "Restaurant2", area: "Shibuya, Tokyo", category: "Ramen", image: "img.img/image2.jpg", approxPrice: "¥1,000 - ¥1,500" },
  { name: "Restaurant3", area: "Osaka, Kansai", category: "Sushi", image: "img.img/image3.jpg", approxPrice: "¥5,000 - ¥7,000" },
  
];

const restaurantContainer = document.getElementById("restaurantCards");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const cardWidth = 300; // Card width
const gap = 20; // Space between cards
const scrollAmount = cardWidth + gap; // Scroll amount per card

function renderRestaurants() {
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
    <p class="price"> ${restaurant.approxPrice}</p>
  `;

    restaurantContainer.appendChild(card);
  });
}

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

renderRestaurants();