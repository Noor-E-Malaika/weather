import React, { useState } from 'react';
import './Navbar.css'
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";

const Weather = () => {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(''); 

  const apiKey = '50f09d094e4a98abed6abf35ed09654c'; 

  
  const handleSearch = async () => {
    if (!city) {
     
      setError('Please enter a city name.');
      return;
    }

    try {
      
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city,               
          appid: apiKey,        
          units: 'metric'        
        }
      });

      setWeather(response.data); 
      setError(''); 
    } catch (err) {
      
      setError('City not found. Please check the spelling or try another city.');
      setWeather(null); 
    }
  };

  return (
    <div className='city'>
      <div className='weather'>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} 
        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
      />
      <button
      
        onClick={handleSearch}
        style={{ padding: '10px 20px', marginLeft: '10px', borderRadius: '5px', cursor: 'pointer' }}
      >
       <IoIosSearch />
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {weather && ( 
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2> 
          <p>{weather.weather[0].description}</p> 
          <p>{weather.main.temp}°C</p> 
          <p>Humidity: {weather.main.humidity}%</p> 
          <p>Wind Speed: {weather.wind.speed} m/s</p> 
        </div>
      )}
      </div>
    </div>
  );
};

export default Weather;
