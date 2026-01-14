let map;
const $ = id => document.getElementById(id); 
const citiesData = {
    "KZT": ["Astana", "Almaty", "Shymkent"],
    "RUB": ["Moscow", "Saint Petersburg", "Kazan"],
    "EUR": ["Berlin", "Munich", "Hamburg"],
    "GBP": ["London", "Manchester", "Liverpool"],
    "CNY": ["Beijing", "Shanghai", "Guangzhou"],
    "TRY": ["Istanbul", "Ankara", "Antalya"]
};
$('countrySelect').onchange = (e) => {
    $('btnCurrency').disabled = $('citySelect').disabled = false;
    $('citySection').classList.remove('disabled-card');
    $('citySelect').innerHTML = '<option disabled selected>-- Choose City --</option>' + 
        citiesData[e.target.value].map(c => `<option value="${c}">${c}</option>`).join('');
};
$('citySelect').onchange = () => $('btnWeather').disabled = $('btnNews').disabled = false;
async function fetchData(type) {
    const city = $('citySelect').value;
    const country = $('countrySelect').value;
    const url = type === 'weather' ? `/api/weather?city=${city}` : 
                type === 'news' ? `/api/news?q=${city}` : `/api/currency?code=${country}`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) 
            throw new Error(data.error || 'Fetch failed');
        if (type === 'weather') {
            displayWeather(data);
            displayMap(data.coordinates.lat, data.coordinates.lon);
        } else if (type === 'news') {
            $('news-container').classList.remove('hidden');
            $('news-list').innerHTML = data.map(n => `<li><a href="${n.url}" target="_blank">${n.title}</a></li>`).join('');
        } else {
            $('currency-result').classList.remove('hidden');
            $('currency-result').innerHTML = `1 USD = ${data.rate} ${data.target}`;
        }
    } catch (err) { $('error-message').textContent = err.message; }
}
function displayWeather(data) {
    $('weather-info').classList.remove('hidden');
    $('cityName').textContent = `${data.city}, ${data.country}`;
    $('temp').textContent = `${Math.round(data.temp)}°C`;
    $('description').textContent = data.description;
    $('weatherIcon').src = data.icon;
    $('feels_like').textContent = `${data.feels_like}°`;
    $('humidity').textContent = `${data.humidity}%`;
    $('pressure').textContent = `${data.pressure} hPa`;
    $('wind').textContent = `${data.wind_speed} m/s`;
}
function displayMap(lat, lon) {
    $('map').style.display = 'block';
    if (map) map.remove();
    map = L.map('map').setView([lat, lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lon]).addTo(map).bindPopup(lat + ", " + lon);
}