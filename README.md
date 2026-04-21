# Weather App (AccuWeather API)

## Overview
A simple React + TypeScript weather application that allows users to search for a city and view current weather conditions using the AccuWeather API.

The application demonstrates API integration, state management, error handling, and component-based UI design.

---

## Features
- Search weather by city name
- Displays:
  - City name
  - Temperature (Celsius / Fahrenheit toggle)
  - Weather description
  - Humidity
  - Wind speed
- Dynamic weather icons based on conditions
- Last 5 recent searches with quick re-selection
- Loading states and user-friendly error handling

---

## Tech Stack
- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **API:** AccuWeather API
- **Styling:** Basic CSS

---

## Project Structure

src/
components/
SearchBar.tsx
WeatherCard.tsx
services/
weatherService.ts
App.tsx
main.tsx


---

## How It Works

### API Flow
1. User enters a city
2. App calls AccuWeather Location API → retrieves `locationKey`
3. App calls Current Conditions API using `locationKey`
4. Data is transformed and stored in state
5. UI updates with weather information

---

## Key Design Decisions

### 1. Service Layer Abstraction
All API calls are isolated in `weatherService.ts`:
- Keeps UI components clean
- Improves maintainability and testability

### 2. Defensive Data Handling
API responses are not guaranteed to include all fields:
- Optional chaining used for nested properties
- Fallback values prevent runtime crashes

### 3. Error Handling Strategy
Custom error codes:
- `CITY_NOT_FOUND`
- `NETWORK_ERROR`
- `WEATHER_NOT_FOUND`

Mapped to user-friendly messages in the UI.

### 4. State Management
Managed with React hooks:
- `city`, `weather`, `loading`, `error`, `unit`
- `history` for recent searches

### 5. Temperature Conversion
Base temperature stored in Celsius:
- Converted dynamically in UI
- Avoids repeated API calls

---

## Setup Instructions

### 1. Clone Repository

git clone <your-repo-url>
cd weather-app


### 2. Install Dependencies

npm install


### 3. Configure Environment Variables
Create a `.env` file in the root:


VITE_BASE_URL=https://dataservice.accuweather.com

VITE_ACCUWEATHER_API_KEY=your_api_key_here


### 4. Run Development Server

npm run dev


Open:

http://localhost:5173


---

## Known Limitations
- API key is exposed in frontend under .env for demo purposes
- Location search defaults to first result when duplicates exist

---

## Future Improvements
- Allow user to select from multiple location matches
- Add loading spinner / improved UI styling

---

## Screenshots
Add screenshots later

---

## Author
Giovanni Felix
