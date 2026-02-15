import { useState, useEffect } from "react";
import Card from "./Card";
import { Search, Loader2, CloudSun } from "lucide-react";

// Use a fallback key for presentation if env is missing
const API_KEY = import.meta.env.VITE_WEATHER_KEY || "8646f90353c9ca33215888a709088118";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("Chandigarh");
  const [tempInfo, setTempInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherInfo = async (query = searchValue) => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message || "Failed to fetch weather");
      }

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      setTempInfo({
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getWeatherInfo();
    }
  };

  useEffect(() => {
    // Attempt local weather on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.name) {
              setSearchValue(data.name);
              getWeatherInfo(data.name);
            }
          } catch (e) {
            getWeatherInfo();
          }
        },
        () => getWeatherInfo()
      );
    } else {
      getWeatherInfo();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <CloudSun size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Weather Hub</h2>
              <p className="text-muted-foreground text-sm">Real-time local and global weather insights</p>
            </div>
          </div>

          <div className="flex w-full md:w-auto items-center gap-2 p-1.5 bg-black/20 rounded-2xl border border-white/5 focus-within:border-primary/50 transition-all group">
            <div className="pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search city (e.g. London, Paris)"
              className="bg-transparent border-none outline-none py-2 px-2 text-sm w-full md:w-64"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}
              maxLength={30}
            />
            <button
              onClick={() => getWeatherInfo()}
              disabled={loading}
              className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "SEARCH"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm text-center font-medium animate-in slide-in-from-top-2">
            ⚠️ {error}
          </div>
        )}

        <div className={loading ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
          {tempInfo.name ? (
            <Card tempInfo={tempInfo} />
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="flex justify-center">
                <CloudSun size={64} className="text-muted-foreground/20 animate-pulse" />
              </div>
              <p className="text-muted-foreground font-medium italic">Ready to fetch data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
