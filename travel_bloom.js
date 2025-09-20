
document.getElementById('searchBtn').addEventListener('click', () => {
    let input = document.getElementById('searchInput').value.toLowerCase().trim();
  
    if (input === 'beaches') input = 'beach';
    if (input === 'temples') input = 'temple';
  
    const validKeywords = ['beach', 'temple', 'country'];
  
    if (validKeywords.includes(input)) {
      fetchRecommendations(input);
    } else {
      displayMessage('No matching recommendations found.');
    }
  });
  
  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendations').innerHTML = '';
  });
  
  function fetchRecommendations(keyword) {
    fetch('travel_bloom_api.json')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(place => place.type === keyword);
        displayRecommendations(filtered.slice(0, 2));
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  function displayRecommendations(places) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
  
    if (places.length === 0) {
      container.innerHTML = '<p>No recommendations found.</p>';
      return;
    }
  
    places.forEach(place => {
      const div = document.createElement('div');
      div.className = 'recommendation';
  
      div.innerHTML = `
        <h3>${place.name}</h3>
        <img src="${place.imageUrl}" alt="${place.name}" />
        <p>${place.description}</p>
      `;
  
      container.appendChild(div);
    });
  }
  
  function displayMessage(msg) {
    const container = document.getElementById('recommendations');
    container.innerHTML = `<p>${msg}</p>`;
  }