//___https://dog.ceo/dog-api/_____

//__  /api/breeds/list/all  Listado de razas y subrazas

let next = document.getElementById('next');

async function dataImg(url, breedImage){
    let data = await fetch(url);
    let dataJson = await data.json();
	let result = dataJson.message;
    console.log('result: ', result);
	breedImage.src = result; 
    next.addEventListener("click", function(){
        dataImg(url, breedImage)
    });
}	

async function dataElement(breed_div, pos, prop){
	let breed = document.getElementsByClassName(breed_div);
	while(breed[0].childNodes.length > 3){
			breed[0].removeChild(breed[0].childNodes[3]);
		}
	let raza = document.getElementById('raza');
	let breedImage = document.getElementById('imageDog');
    if(pos.length == 0){
        raza.innerHTML =`La raza seleccionada es: ${prop} y no tiene subraza.`;
		dataImg(`https://dog.ceo/api/breed/${prop}/ /images/random`, breedImage)
    }
	else{
		breedImage.src = "dog.png"; 
		raza.innerHTML =`La raza seleccionada es: ${prop}, elige una subraza.`;
		console.log('array subraza pasado: ', pos);
		console.log("raza pasada: ", prop);
		//for(let element = 0; element < pos.length; element++){ en el forEach cambio element por index pos[index]
		 pos.forEach(function(element,index){
			let breedP = document.createElement('p');
			breed[0].appendChild(breedP);
			breedP.innerHTML = pos[index]; // Comillas invertidas `` 
			console.log('subraza: ', pos[index]);
			breedP.addEventListener("click", function(){
				//xxxx = index; // GLOBAL
				dataImg(`https://dog.ceo/api/breed/${prop}/${pos[index]}/images/random`, breedImage);
			});
		});
	}
	/*next.addEventListener("click", function(){
		
		if(pos.length == 0){
	   		dataImg(`https://dog.ceo/api/breed/${prop}/ /images/random`, breedImage)
		}
		else{
			dataImg(`https://dog.ceo/api/breed/${prop}/${pos[xxxx]}/images/random`, breedImage)
		}
	});*/
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

dataProp('https://dog.ceo/api/breeds/list/all', 'breed');