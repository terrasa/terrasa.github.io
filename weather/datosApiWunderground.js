//_____https://www.wunderground.com - Weather Underground: Weather Forecast & Reports

const loc = document.getElementsByClassName('loc');
const weather = document.getElementsByClassName('weather');
const icon_w = document.getElementById ('icon_w');


async function iconWeather(icon){
	
	if(localStorage.backG_user){
		document.body.style.backgroundImage = "url("+localStorage.backG_user+")" ;
	}
	else{
		document.body.style.backgroundImage = "url("+icon+".jpg)";	
	} 
	
}

async function dataProp(url){
	
    let data = await fetch(url);
    let dataJson = await data.json();
	let result = dataJson.current_observation;
	console.log('Datos:  ', dataJson);
	console.log('Temp ºC: ',dataJson.current_observation.temp_c );
	console.log('Icono: ',dataJson.current_observation.icon_url );
	console.log('Icon Nombre:  ', result.icon);
	loc[0].innerHTML=`${result.display_location.full}`;
	weather[0].innerHTML=`${result.temp_c} <sup>ºC</sup>`;
	weather[1].innerHTML=`Sensación Térmica ${result.feelslike_c}<sup>ºC</sup>`;
	weather[2].innerHTML=`${result.relative_humidity} %`;
	weather[3].innerHTML=`${result.wind_kph} kph`;
	//Sustituimos la ruta para que sea un svg en vez de un gif
	let dat_icon_weather = result.icon_url;
	console.log(dat_icon_weather);
	let icon_weather = String(dat_icon_weather).replace("/k/", "/v4/");
	let icon_weather2 = icon_weather.replace(".gif", ".svg");
	console.log(icon_weather2);
	icon_w.src= icon_weather2; // `${result.icon_url}`;
	iconWeather(result.icon); 
	//iconWeather('rain'); // Para realizar prueba
	/*if(localStorage.backG_user){
		document.body.style.backgroundImage = "url("+localStorage.backG_user+")" ;
	}*/
	nombreIcon = result.icon;
}	
//http://api.wunderground.com/api/19fc2f8982402035/features/settings/q/query.format
// dataProp(`http://api.wunderground.com/api/19fc2f8982402035/geolookup/conditions/astronomy/forecast/q/40.553053,-3.6460074.json`);

// No es necesario datos de geolookup .....
//dataProp(`http://api.wunderground.com/api/19fc2f8982402035/geolookup/conditions/astronomy/forecast/q/${geoPos.latitude},${geoPos.longitude}.json`);

// Selección de un archivo, ruta local del archivo, guardar ruta en localStorage

// Check for the various File API support. 
if (window.File && window.FileReader && window.FileList && window.Blob) {  //En nuestro caso solo file.... && window.FileReader && window.FileList && window.Blob
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object
	console.log(files);
	//console.log(files.FileList.0.name);

    // Loop through the FileList and render image files as thumbnails.
 	for (let i = 0, f; f = files[i]; i++) {
    	// Only process image files.
      	if (!f.type.match('image.*')) {
        	continue;
      	}
		console.log('QUE ERES???>>>>',f);
      	let reader = new FileReader();

      	// Closure to capture the file information.
      	reader.onload = (function(theFile) {	
        	return function(e) {
				// Render thumbnail.
        		/*let span = document.createElement('span');
          		span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
				document.getElementById('list').insertBefore(span, null);*/
				document.body.style.backgroundImage = "url("+e.target.result+")" ;
				localStorage.setItem("backG_user", e.target.result);
				//console.log('Dentro de ',e.target.result)
        	};
      	})(f);

      	// Read in the image file as a data URL.
      	reader.readAsDataURL(f);
		console.log(reader);
    }
  }

 document.getElementById('files').addEventListener('change', handleFileSelect, false);

// Limpiar localStorage   //localStorage.clear();