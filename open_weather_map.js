const WEATHER_API_KEY = '377b8e6d9708d0ed681e86d608ac4ffe';
const API_STEM = 'https://api.openweathermap.org/data/2.5/weather?';

function zipUrl(zip) {
	return `${API_STEM}zip=${zip},us&appid=${WEATHER_API_KEY}`;
} 
        
function fetchForecast(zip) { 
	return fetch(zipUrl(zip))
		.then(response => response.json()) 
		.then(responseJSON => {
			return { 
				main: responseJSON.weather[0].main,
				description: responseJSON.weather[0].description,
				temp: responseJSON.main.temp
			};
		}) 
		.catch(error => { 
			console.error(error);
		});
}

export default { fetchForecast: fetchForecast };
