const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }
    try {
        const response = await axios.get(url);
        const data = response.data;
        const weatherData = {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            coordinates: data.coord,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            rain_3h: data.rain ? data.rain['3h'] || 0 : 0 
        };
        res.json(weatherData);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            res.status(500).json({ error: "Server Error" });
        }
    }
});
app.get('/api/news', async (req, res) => {
    const query = req.query.q || 'general';
    const apiKey = process.env.NEWS_API_KEY;
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=3`);
        const articles = response.data.articles.map(article => ({
            title: article.title,
            url: article.url,
            source: article.source.name
        }));
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news" });
    }
});
app.get('/api/currency', async (req, res) => {
    const targetCode = req.query.code || 'KZT'; 
    const base = 'USD'; 
    const apiKey = process.env.CURRENCY_API_KEY;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
        const rate = response.data.conversion_rates[targetCode];
        res.json({ 
            base: base, 
            target: targetCode, 
            rate: rate 
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch currency" });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});