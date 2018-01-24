(function(){

//___https://dog.ceo/dog-api/_____

//__  /api/breeds/list/all  Listado de razas y subrazas

let controlVar = true;
let breed_1 = document.getElementsByClassName('breed');
let fRight = document.getElementsByClassName('fRight');
let breedImage = document.getElementById('imageDog');
let subrazaControl = false;

//let lastUrl;

/* //
// Funciona igual dejando fuera la función next, es más facil de entender y no requiere controlVar

let next = document.getElementById('next');
next.addEventListener("click", async function(){
	let breedImage = document.getElementById('imageDog');  // se define de nuevo de forma local dentro de la funcion
	dataImg(lastUrl, breedImage);
    });

async function dataImg(url, breedImage){
	lastUrl = await url;
	console.log('último url ', lastUrl);
    let data = await fetch(lastUrl);
    let dataJson = await data.json();
	let result = dataJson.message;
	breedImage.src = result; 
}*/

// Funciona pero requiere controlVar para ejecutar el evento de next solo la primera vez.

async function dataImg(url, breedImage){
	lastUrl = url;                    // Si no es global no funciona
	console.log('último url ', lastUrl);
    let data = await fetch(lastUrl);
    let dataJson = await data.json();
	let result = dataJson.message;
	breedImage.src = result; 
    if(controlVar){
		let breedImg = document.getElementsByClassName('breedImg');
		let next = document.createElement('p');
		breedImg[0].appendChild(next);
		next.innerHTML = 'Siguiente Imagen';
		//let next = document.getElementById('next');
		next.addEventListener("click", async function(){
			console.log('último url dentro del Event ', lastUrl);
            dataImg(lastUrl, breedImage);
    	});
		controlVar = !controlVar;
	}
	await vSize();
}
	
async function vSize(){
	let w = await window.innerWidth;
	let imgBreed= await breedImage.src;
	console.log(imgBreed);
	console.log(breedImage.src);
	if(w>576){
		breed_1[0].style.display = 'inline-block';	
		fRight[0].style.display = 'inline';		
		}
	else if( subrazaControl || imgBreed.indexOf('dog.png')===-1 ){ 
		breed_1[0].style.display = 'none';	
		fRight[0].style.display = 'inline';	
		}
	else{
		breed_1[0].style.display = 'inline-block';	
		fRight[0].style.display = 'none';
	}
}
	
window.addEventListener('resize', vSize);
	
async function dataElement(breed_div, pos, prop){
	let breed = document.getElementsByClassName(breed_div);
	while(breed[0].childNodes.length > 3){
			breed[0].removeChild(breed[0].childNodes[3]);
		}
	let raza = document.getElementById('raza');
	
    if(pos.length == 0){
		subrazaControl = false;
        raza.innerHTML =`Raza seleccionada: ${prop}`;
		dataImg(`https://dog.ceo/api/breed/${prop}/ /images/random`, breedImage)
		
    }
	else{
		breedImage.src = "dog.png"; 
		if(controlVar == false){
			let breedImg = document.getElementsByClassName('breedImg');
			breedImg[0].removeChild(breedImg[0].childNodes[3]);
			controlVar = !controlVar;
		}
		subrazaControl = true;
		raza.innerHTML =`Raza seleccionada: ${prop}, subraza...`;
		console.log('array subraza pasado: ', pos);
		console.log("raza pasada: ", prop);
		pos.forEach(function(element,index){
			let breedP = document.createElement('p');
			breed[0].appendChild(breedP);
			breedP.innerHTML = pos[index]; // Comillas invertidas `` 
			console.log('subraza: ', pos[index]);
			breedP.addEventListener("click", function(){
                raza.innerHTML =`Raza seleccionada: ${prop} - ${pos[index]}`;
				dataImg(`https://dog.ceo/api/breed/${prop}/${pos[index]}/images/random`, breedImage);
			});
		});
		await vSize();
	}
}

async function dataProp(url, breed_div){
	let breed = document.getElementsByClassName(breed_div);
    let data = await fetch(url);
    let dataJson = await data.json();
	let result = dataJson.message;
    
	// con for in Funciona tb
	/*for(let prop in result){
		let breedP = document.createElement('p');
		breed[0].appendChild(breedP);
		breedP.innerHTML = prop; // Comillas invertidas ``
		breedP.addEventListener("click", function(){
			dataElement('subBreed', result[prop], prop)
		});
	}*/
    const razas = Object.keys(result);
    // tengo un array de razas
    razas.forEach(function(raza,index){
    	let breedP = document.createElement('p');
        breed[0].appendChild(breedP);
        breedP.innerHTML = raza;
        breedP.addEventListener("click", function(){
        	console.log(raza," . ",result[raza])
			dataElement('subBreed', result[raza], raza)
		});
	})
}
/* // Pte cerrar imagen cuando movil
let cerrar = document.getElementById('cerrar');
cerrar.addEventListener
async function cerrar(){
	
}*/

dataProp('https://dog.ceo/api/breeds/list/all', 'breed');
}())