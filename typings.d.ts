interface CurrentWeather {
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
}

interface DailyUnits {
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    sunrise: string;
    sunset: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
    uv_index_clear_sky_max: string;
    uv_index_max: string;
    weathercode: string;
}