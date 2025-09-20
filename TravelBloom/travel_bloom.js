// travel_bloom.js

// Function to fetch travel data and display it
function loadTravelRecommendations() {
    fetch('travel_recommendation_api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming data is an array of travel places
        const recommendationsDiv = document.getElementById('recommendations');
        recommendationsDiv.innerHTML = ''; // Clear previous content
  
        data.forEach(place => {
          // Create elements to display place info
          const placeDiv = document.createElement('div');
          placeDiv.className = 'place';
  
          const placeName = document.createElement('h3');
          placeName.textContent = place.name;
  
          const placeImage = document.createElement('img');
          placeImage.src = place.imageUrl;
          placeImage.alt = place.name;
          placeImage.width = 200;
  
          const placeDescription = document.createElement('p');
          placeDescription.textContent = place.description;
  
          // Append elements to placeDiv
          placeDiv.appendChild(placeName);
          placeDiv.appendChild(placeImage);
          placeDiv.appendChild(placeDescription);
  
          // Append placeDiv to recommendations container
          recommendationsDiv.appendChild(placeDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching travel data:', error);
      });
  }
  
  // Call the function when the page loads
  window.onload = loadTravelRecommendations;
