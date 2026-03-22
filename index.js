// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// https://restcountries.com/v3.1/all?fields=name ------------------------------------
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.------------------------------------------------------------------------------
// 3 - Passer les données à une variable----------------------------------------------

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

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
const fetchCountries = async () => {
  await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,language,region,code,demonym,population,translations",
  ).then((res) =>
    res.json().then((data) => {
      countries = data;
      // console.log(countries);
    }),
  );
};

const countriesDisplay = async () => {
  await fetchCountries();

  const filterCountries = (searchValue) => {
    countries.filter((c) => {
      c.name.common.toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  inputSearch.addEventListener("input", (e) => {
    let searchValue = e.target.value;
    let filtered = filterCountries(searchValue);
    console.log(filtered);
  });

  countries.length = 12; //display limit during dev
  countriesContainer.innerHTML = countries
    .map((country) => {
      return `
        <div class="card">
          <div class="tilt">
            <div class="img">
              <img src="${country.flags.png}" alt="${country.flags.alt}">
            </div>
          </div>
          <div class="info">
            <div class="cat">${country.region}</div>
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

countriesDisplay();
