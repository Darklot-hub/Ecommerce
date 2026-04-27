import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./WeatherWidget.module.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

function WeatherWidget({ onClose }) {
  const [cityInput, setCityInput] = useState("Тюмень");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(""); // ошибка под инпутом
  const [weatherError, setWeatherError] = useState(""); // ошибка под погодой
  const [failedCities, setFailedCities] = useState(new Set());
  const abortControllerRef = useRef(null);

  // Отмена текущего запроса
  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  // Очистка ошибок при изменении инпута
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCityInput(newCity);
    setGeoError("");
    if (failedCities.has(newCity)) {
      // если город ранее не удавался, показываем предупреждение (но не блокируем кнопку)
      setGeoError(`Не удалось получить данные для города ${newCity}`);
    } else {
      setGeoError("");
    }
  };

  // Получение координат по городу
  const fetchCoordinates = async (city) => {
    cancelRequest();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const url = `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Geocoding failed");
    const data = await response.json();
    if (!data.length) throw new Error("City not found");
    return { lat: data[0].lat, lon: data[0].lon };
  };

  // Получение погоды по координатам
  const fetchWeather = async (lat, lon) => {
    const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url, {
      signal: abortControllerRef.current?.signal,
    });
    if (!response.ok) throw new Error("Weather fetch failed");
    const data = await response.json();
    return {
      city: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  };

  // Основной запрос: гео -> погода
  const fetchWeatherForCity = useCallback(async (city) => {
    cancelRequest();
    setLoading(true);
    setGeoError("");
    setWeatherError("");
    setWeatherData(null);

    try {
      const { lat, lon } = await fetchCoordinates(city);
      const weather = await fetchWeather(lat, lon);
      setWeatherData(weather);
      setCityInput(weather.city);
      // успех – убираем город из failedCities
      setFailedCities((prev) => {
        const newSet = new Set(prev);
        newSet.delete(city);
        return newSet;
      });
    } catch (err) {
      if (err.name === "AbortError") return;
      if (
        err.message === "City not found" ||
        err.message === "Geocoding failed"
      ) {
        setGeoError(`Не удалось получить данные для города ${city}`);
        setFailedCities((prev) => new Set(prev).add(city));
      } else {
        setWeatherError("Не удалось получить данные");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Первичная загрузка (Тюмень)
  useEffect(() => {
    fetchWeatherForCity("Тюмень");
    return () => cancelRequest();
  }, [fetchWeatherForCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = cityInput.trim();
    if (!trimmed) return;
    fetchWeatherForCity(trimmed);
  };

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <span>🌦️ Погода</span>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      </div>

      {loading && !weatherData && (
        <div className={styles.skeleton}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLineShort}></div>
        </div>
      )}

      {(!loading || weatherData) && (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={cityInput}
              onChange={handleCityChange}
              placeholder="Введите город"
              disabled={loading}
              className={styles.input}
            />
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? "Загрузка..." : "Получить погоду"}
            </button>
          </form>
          {geoError && <div className={styles.error}>{geoError}</div>}

          <div className={styles.weatherInfo}>
            {weatherError && <div className={styles.error}>{weatherError}</div>}
            {weatherData && (
              <div className={styles.weatherCard}>
                <img src={weatherData.icon} alt={weatherData.description} />
                <div className={styles.temp}>{weatherData.temp}°C</div>
                <div className={styles.city}>{weatherData.city}</div>
                <div className={styles.desc}>{weatherData.description}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
