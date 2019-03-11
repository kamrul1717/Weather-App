window.addEventListener('load', () => {
	let long;
	let lat;

	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".temperature span")

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			//console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/6e8fe19780fc5bcda4d7c4323d33d5d1/${lat},${long}`;

			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				const {temperature, summary, icon} = data.currently;

				// Set dom elements from api
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;

				//formula for celsius
				let celsius = ((temperature-32)/9)*5;

				//set icon
				setIcons(icon, document.querySelector(".icon"));

				// change temp to degree/farenheit
				temperatureSection.addEventListener("click",  ()=> {
					if(temperatureSpan.textContent === "F"){
						temperatureSpan.textContent = "C"
						temperatureDegree.textContent = celsius.toFixed(2);
					}else{
						temperatureSpan.textContent = "F";
						temperatureDegree.textContent = temperatue;
					}
				});

			});
		});

	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color:"white"});
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});