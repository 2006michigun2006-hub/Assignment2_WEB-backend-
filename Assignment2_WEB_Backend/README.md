## Project Description
This application is a comprehensive dashboard developed for Assignment 2. It integrates three different APIs to provide real-time weather, global news, and currency exchange rates.
##  Setup & Installation
1. **Install Dependencies:** `npm install`
2. **Environment Setup:** Create a `.env` file with your API keys.
3. **Start Server:** `node server.js`
4. **Open Browser:** `http://localhost:3000`
## Backend API Testing (Postman Evidence)

### 1. Weather API Testing
| Case | Status Code | Evidence |
| :--- | :--- | :--- |
| **Success** | 200 OK | ![Weather 200](./screenshots/weather_200.png) |
| **Bad Request** | 400 | ![Weather 400](./screenshots/weather_400.png) |
| **Not Found** | 404 | ![Weather 404](./screenshots/weather_404.png) |
| **Server Error**| 500 | ![Weather 500](./screenshots/weather_500.png) |

### 2. News API Testing
| Case | Status Code | Evidence |
| :--- | :--- | :--- |
| **Success** | 200 OK | ![News 200](./screenshots/news_200.png) |
| **Bad Request** | 400 | ![News 400](./screenshots/news_400.png) |
| **Not Found** | 404 | ![News 404](./screenshots/news_404.png) |
| **Server Error**| 500 | ![News 500](./screenshots/news_500.png) |

### 3. Currency API Testing
| Case | Status Code | Evidence |
| :--- | :--- | :--- |
| **Success** | 200 OK | ![Currency 200](./screenshots/currency_200.png) |
| **Bad Request** | 400 | ![Currency 400](./screenshots/currency_400.png) |
| **Not Found** | 404 | ![Currency 404](./screenshots/currency_404.png) |
| **Server Error**| 500 | ![Currency 500](./screenshots/currency_500.png) |
## User Interface (Browser Screenshots)

### 1. Country Selection & Currency
![UI Step 1](./screenshots/ui_currency.png)

### 2. Weather Dashboard & Map
![UI Step 2](./screenshots/ui_weather.png)

### 3. Local News Results
![UI Step 3](./screenshots/ui_news.png)

---

### Design Decisions
- **Security:** Used `.env` to hide API keys from the client side.
- **Robustness:** Implemented `try...catch` blocks for all status codes (400, 404, 500).
- **Mapping:** Integrated `Leaflet.js` to show city location via coordinates.

### Code for testing:
http://localhost:3000/api/weather?city=Astana
http://localhost:3000/api/news?q=Astana
http://localhost:3000/api/currency?code=KZT