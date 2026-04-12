export async function getWeatherByCoords(lat, lon) {
  console.log("Weather coords:", lat, lon);

  if (lat == null || lon == null) {
    throw new Error("Koordinaatit puuttuvat – sijaintia ei saatu");
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.warn("Weather API error:", text);
      throw new Error("Säädatan haku epäonnistui");
    }

    const data = await res.json();

    if (!data.current_weather) {
      throw new Error("Säätietoja ei saatavilla tältä sijainnilta");
    }

    return {
      main: {
        temp: data.current_weather.temperature,
      },
      weather: [
        {
          main: mapWeatherCode(data.current_weather.weathercode),
        },
      ],
    };
  } catch (err) {
    console.warn("Weather fetch failed:", err);
    throw err;
  }
}

function mapWeatherCode(code) {
  if (code === 0) return "clear";
  if ([1, 2, 3].includes(code)) return "clouds";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 85, 86].includes(code)) return "snow";
  return "clouds";
}