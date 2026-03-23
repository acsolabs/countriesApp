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
const minToMax = document.getElementById("minToMax");
const maxToMin = document.getElementById("maxToMin");
const alpha = document.getElementById("alpha");
const countriesContainer = document.querySelector(".countries-container");
let countries = [];
let sortMethod = "minToMax";

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
    .slice(0, inputRange.value || 250)
    .sort((a, b) => {
      if (sortMethod === "minToMax") {
        return b.population - a.population;
      } else if (sortMethod === "maxToMin") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.name.common.localeCompare(b.name.common);
      }
    })
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
                  <h2 class="title">${country.name.common}</h2>
                  <p class="desc">Capital City: ${country?.capital ?? "no information"}</p>
                  <div class="feats">
                    <span class="feat">${country.population.toLocaleString()} hab.</span>
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
inputRange.addEventListener("input", () => {
  rangeValue.innerText = inputRange.value;
  countriesDisplay();
});
minToMax.addEventListener("click", () => {
  sortMethod = "minToMax";
  countriesDisplay();
});
maxToMin.addEventListener("click", () => {
  sortMethod = "maxToMin";
  countriesDisplay();
});
alpha.addEventListener("click", () => {
  sortMethod = "alpha";
  countriesDisplay();
});
