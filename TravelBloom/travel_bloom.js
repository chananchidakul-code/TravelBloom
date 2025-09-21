
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

let travelData = {};


fetch('travel_bloom_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
  })
  .catch(error => {
    console.error('Error fetching travel data:', error);
    resultsContainer.innerHTML = '<p>Failed to load recommendations. Please try again later.</p>';
  });

function displayPlaces(places) {
  resultsContainer.innerHTML = '';

  if (!places || places.length === 0) {
    resultsContainer.innerHTML = '<p>No recommendations found.</p>';
    return;
  }

  places.slice(0, 2).forEach(place => {
    const div = document.createElement('div');
    div.classList.add('recommendation');

    div.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" alt="${place.name}" width="300" />
      <p>${place.description}</p>
    `;

    resultsContainer.appendChild(div);
  });
}
searchBtn.addEventListener('click', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  console.log('Search clicked, keyword:', keyword);
  resultsContainer.innerHTML = '';

  if (!keyword) {
    resultsContainer.innerHTML = '<p>Please enter a keyword to search.</p>';
    return;
  }

  if (keyword === 'beach' || keyword === 'beaches') {
    if (travelData.beaches) {
      displayPlaces(travelData.beaches);
    } else {
      resultsContainer.innerHTML = '<p>No beach recommendations found.</p>';
    }
  } else if (keyword === 'temple' || keyword === 'temples') {
    if (travelData.temples) {
      displayPlaces(travelData.temples);
    } else {
      resultsContainer.innerHTML = '<p>No temple recommendations found.</p>';
    }
  } else {
    if (travelData.countries) {
      const countryPlaces = travelData.countries.filter(place =>
        place.country && place.country.toLowerCase() === keyword
      );
      if (countryPlaces.length > 0) {
        displayPlaces(countryPlaces);
      } else {
        resultsContainer.innerHTML = `<p>No recommendations found for country "${keyword}".</p>`;
      }
    } else {
      resultsContainer.innerHTML = '<p>No country recommendations found.</p>';
    }
  }
});

clearBtn.addEventListener('click', () => {
  resultsContainer.innerHTML = '';
  searchInput.value = '';
});