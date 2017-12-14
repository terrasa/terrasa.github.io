// HTML Geolocation Api

// Dentro de url https - Se requiere permiso del usuario


const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const geo = document.getElementById("geo");

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError); //, showError, options
    } else {
        geo.innerHTML = "Geolocation is not supported by this browser.";
    }
}
async function showPosition(position) {
    geo.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
	let geoPos = {'latitude': position.coords.latitude, 'longitude': position.coords.longitude };
	console.log( geoPos);
	console.log('Latitud: ', geoPos.latitude);
	//return geoPos; // No me funciona fuera. Si quito let si.... y puedo quitar return 
	dataProp(`https://api.wunderground.com/api/19fc2f8982402035/conditions/astronomy/forecast/q/${geoPos.latitude},${geoPos.longitude}.json`);
	
	/* Pendiente ApiKey google maps
	let latlon = position.coords.latitude + "," + position.coords.longitude;

    let img_url = "https://maps.googleapis.com/maps/api/staticmap?center=
    "+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY";

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";*/
}


async function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            geo.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            geo.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            geo.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            geo.innerHTML = "An unknown error occurred."
            break;
    }
}
getLocation();