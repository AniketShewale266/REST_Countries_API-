const countriesContainer = document.querySelector(".countries-container");

const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const countryCard = document.querySelector(".country-card");
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

for (let i = 0; i < 10; i++) {
  const countryCard = document.createElement("a");
  countryCard.classList.add("country-card");

  const cardHtml = `
      <div class="img-box skeleton">
        <img src="" class="skeleton" />
      </div>
      <div class="card-content">
        <h3 class="card-title"><div class="skeleton skeleton-text"></div></h3>
        <p><b><div class="skeleton skeleton-text"></div></b><div class="skeleton skeleton-text"></div></p>
        <p><b><div class="skeleton skeleton-text"></div></b><div class="skeleton skeleton-text"></div></p>
        <p><b><div class="skeleton skeleton-text"></div></b><div class="skeleton skeleton-text"></div></p>
      </div>
    `;

  countryCard.innerHTML = cardHtml;
  countriesContainer.append(countryCard);
}

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    const countryPopulation = country.population.toLocaleString("en-IN");
    const cardHtml = `
            <img src=${country.flags.svg} alt="${country.name.common}" />
              <div class="card-content">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population:</b>${countryPopulation}</p>
                <p><b>Region:</b>${country.region}</p>
                <p><b>Capital:</b>${country.capital}</p>
              </div>
    `;

    countryCard.innerHTML = cardHtml;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value);
  // console.log(allCountriesData);
  const filterCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  // console.log(filterCountries);
  renderCountries(filterCountries);
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.className == "dark") {
    let icon = `<i class="fa-solid fa-sun"></i>&nbsp;&nbsp;<span>Light Mode</span>`;
    themeChanger.innerHTML = icon;
  } else {
    let icon = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;<span>Dark Mode</span>`;
    themeChanger.innerHTML = icon;
  }
});
