let map;
const countrySelect = document.getElementById('countrySelect');
const btnCurrency = document.getElementById('btnCurrency');
const cityInput = document.getElementById('cityInput');
const btnWeather = document.getElementById('btnWeather');
const btnNews = document.getElementById('btnNews');
countrySelect.addEventListener('change', () => {
    btnCurrency.disabled = false;
    cityInput.disabled = false;
    document.getElementById('currency-result').textContent = '';
});
cityInput.addEventListener('input', () => {
    const city = cityInput.value.trim();
    if (city.length > 0) {
        btnWeather.disabled = false;
        btnNews.disabled = false;
    } else {
        btnWeather.disabled = true;
        btnNews.disabled = true;
    }
});
async function getCurrency() {
    const currencyCode = countrySelect.value; 
    const resultBox = document.getElementById('currency-result');
    resultBox.textContent = 'Loading currency...';
    try {
        const res = await fetch(`/api/currency?code=${currencyCode}`);
        const data = await res.json();       
        if (data.rate) {
            resultBox.innerHTML = `<strong>Exchange Rate:</strong> 1 USD = ${data.rate} ${data.target}`;
        } else {
            resultBox.textContent = 'Error loading currency.';
        }
    } catch (e) {
        resultBox.textContent = 'Server error.';
        console.error(e);
    }
}
async function getWeather() {
    const city = cityInput.value;
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';
    document.getElementById('weather-info').classList.add('hidden');
    document.getElementById('map').style.display = 'none';
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'City not found');
        }
        displayWeather(data);
        displayMap(data.coordinates.lat, data.coordinates.lon);
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}
async function getNews() {
    const city = cityInput.value;
    const newsContainer = document.getElementById('news-container');
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = 'Loading news...';
    newsContainer.classList.remove('hidden');
    try {
        const res = await fetch(`/api/news?q=${city}`);
        const news = await res.json();
        if (news.length === 0) {
            newsList.innerHTML = 'No news found for this location.';
            return;
        }
        newsList.innerHTML = news.map(n => 
            `<li><a href="${n.url}" target="_blank">${n.title}</a> <br> <small>${n.source}</small></li>`
        ).join('');
        
    } catch (e) {
        newsList.textContent = 'Error loading news.';
        console.error(e);
    }
}
function displayWeather(data) {
    document.getElementById('weather-info').classList.remove('hidden');
    document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
    document.getElementById('temp').textContent = `${Math.round(data.temp)}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('weatherIcon').src = data.icon;   
    document.getElementById('feels_like').textContent = `${data.feels_like}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('wind').textContent = `${data.wind_speed} m/s`;
    document.getElementById('rain').textContent = `${data.rain_3h} mm`;
}
function displayMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    mapDiv.style.display = 'block';
    if (map) {
        map.remove();
    }
    map = L.map('map').setView([lat, lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([lat, lon]).addTo(map).bindPopup('Selected City').openPopup();
}