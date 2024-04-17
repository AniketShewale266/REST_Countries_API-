// new URLSearchParams(location.search).get("name");

const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const h1 = document.querySelector(".country-content h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subregion = document.querySelector(".subregion");
const capital = document.querySelector(".capital");
const topleveldomain = document.querySelector(".topleveldomain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const backButton = document.querySelector(".back-button");
const themeChanger = document.querySelector(".theme-changer");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json())
.then(([country])  =>{
    // console.log(country);

    flagImg.src = country.flags.svg;
    h1.innerHTML = countryName;

    if(country.name.nativeName){
        nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
    }
    else{
        nativeName.innerHTML = country.name.common;
    }
    population.innerHTML = country.population.toLocaleString('en-IN');
    
    if(country.region)
    {
        region.innerHTML = country.region;
    }

    if(country.subregion)
    {
        subregion.innerHTML = country.subregion;
    }

    if(country.capital){
        capital.innerHTML = country.capital?.[0];
    }
    else{
        capital.innerHTML = "Not Found";
    }

    topleveldomain.innerHTML = country.tld.join(", ");
    
    if(country.currencies)
    {
        currencies.innerHTML  = Object.values(country.currencies).map((currency)=>currency.name).join(", ");
    }
    else{
        nativeName.innerHTML = "Not Found";
    }

    if(country.languages)
    {
        languages.innerHTML  = Object.values(country.languages).join(", ");
    }
    else{
        languages.innerHTML = "Not Found";
    }
    // languages.innerHTML = country.languages.eng;
    if(country.borders){
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=> res.json())
            .then(([borderCountry])=> {
                // console.log(borderCountry);
                const borderCountryTag = document.createElement("a");
                borderCountryTag.innerText = borderCountry.name.common;
                borderCountryTag.href = `/country.html?name=${borderCountry.name.common}`
                // console.log(borderCountryTag);
                borderCountryTag.classList.add("country-button");
                borderCountries.append(borderCountryTag)
            })
        });
    }
})

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

backButton.addEventListener("click",()=>{
    history.back();
})



