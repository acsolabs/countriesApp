// Feature : ajouter les currencies
// --------------------------------------------------------------------------------------
// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// country.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

// -----------
//variables
// -----------
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
const countriesContainer = document.querySelector(".countries-container");
let countries = [];

// -------------
// functions
// -------------

//FetchCountries fetch countries data from API
const fetchCountries = async () => {
  await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,language,region,code,demonym,population,translations",
  ).then((res) => res.json().then((data) => (countries = data)));
  countriesDisplay();
};

//countriesDisplay display card to the DOM
const countriesDisplay = () => {
  // countries.length = 12; //display limit during dev
  countriesContainer.innerHTML = countries
    .filter((country) =>
      country.name.official
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase()),
    )
    .slice(0, inputRange.value)
    .map((country) => {
      return ` 
              <div class="card">
                <div class="tilt">
                  <div class="img">
                    <img src="${country.flags.png}" alt="${country.flags.alt}">
                  </div>
                </div>
                <div class="info">
                  <div class="cat">${country.region}
                  </div>
                  <h2 class="title">${country.name.official}</h2>
                  <p class="desc">Capital City: ${country?.capital ?? "no information"}</p>
                  <div class="feats">
                    <span class="feat">${country.population} hab</span>
                    <span class="feat">devise</span>
                  </div>
                  <div class="bottom">
                    <button class="btn">
                      <span>Read more</span>
                    </button>
                  </div>
                </div>
              </div>
            `;
    })
    .join("");
};

// Events
window.addEventListener("load", fetchCountries);

inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", countriesDisplay);
