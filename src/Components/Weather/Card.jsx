import { formatTimestampToLocalDateTime } from "../../helpers/common";
import { Cloud, Sun, Droplets, Wind, MapPin, Sunset, Gauge } from "lucide-react";

const Card = ({ tempInfo }) => {
  const {
    temp,
    humidity,
    pressure,
    weathermood,
    name,
    speed,
    country,
    sunset,
  } = tempInfo;

  const WeatherIcon = () => {
    const mood = weathermood?.toLowerCase() || "";
    if (mood.includes("sun") || mood.includes("clear")) return <Sun size={80} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />;
    if (mood.includes("cloud")) return <Cloud size={80} className="text-slate-300 drop-shadow-[0_0_15px_rgba(203,213,225,0.5)]" />;
    if (mood.includes("rain")) return <Droplets size={80} className="text-blue-400 animate-bounce" />;
    return <Sun size={80} className="text-amber-400" />;
  };

  return (
    <div className="glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in duration-700">
      {/* Upper Section */}
      <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white/5 to-transparent">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
            <MapPin size={12} />
            {name}, {country}
          </div>
          <div className="flex items-start gap-1">
            <span className="text-8xl font-black leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              {Math.round(temp)}
            </span>
            <span className="text-3xl font-bold mt-2 text-primary">&deg;C</span>
          </div>
          <p className="text-xl font-medium text-muted-foreground mt-2 capitalize">
            {weathermood}
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 animate-float">
            <WeatherIcon />
          </div>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Bottom Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        <div className="p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors">
          <Sunset size={20} className="text-orange-400" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sunset</p>
          <p className="text-sm font-semibold">{formatTimestampToLocalDateTime(sunset).split(',')[1]}</p>
        </div>
        
        <div className="p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors">
          <Droplets size={20} className="text-blue-400" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Humidity</p>
          <p className="text-sm font-semibold">{humidity}%</p>
        </div>

        <div className="p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors">
          <Wind size={20} className="text-slate-400" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Wind</p>
          <p className="text-sm font-semibold">{speed} km/h</p>
        </div>

        <div className="p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors">
          <Gauge size={20} className="text-accent" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pressure</p>
          <p className="text-sm font-semibold">{pressure} hPa</p>
        </div>
      </div>

      <div className="p-4 bg-black/20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30">
          Last Updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Card;
