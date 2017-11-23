async function llamaYPinta(url){
     const primera = await fetch(url);
     const text = await primera.json();
     
     document.write(`name: ${text.login}
     
     <p>
     avatar: <img src="${text.avatar_url}">
     </p> `);
 }
 
 llamaYPinta('https://api.github.com/users/josheriff');
 
 
 
 async function llamaYPinta(url){
     const primera = await fetch(url);
     const text = await primera.json();
     text.forEach(function(githubUser){
       document.write(`name: ${githubUser.login}
         <p>
        avatar: <img src="${githubUser.avatar_url}">
        </p> `);
     }) 
	 console.log(text);
 }
 
 llamaYPinta('https://api.github.com/users');

//___https://dog.ceo/dog-api/_____

//__  /api/breeds/image/random

async function llamaYPinta(url){
    const primera = await fetch(url);
    const text = await primera.json();
    /*text.forEach(function(element){
	console.log(element);
    }) */
    console.log(text);
	console.log(text.message);
	
 }
 
 llamaYPinta('https://dog.ceo/api/breed/{breed name}/{sub-breed name}/images/random');

//___https://dog.ceo/dog-api/_____

//__  /api/breed/hound/images/random

async function llamaYPinta(url){
    const primera = await fetch(url);
    const text = await primera.json();
    console.log(text);
	console.log(text.message);
	
 }
 
 llamaYPinta('https://dog.ceo/api/breed/hound/images/random');

//___https://dog.ceo/dog-api/_____

//__  /api/breeds/list/all  Listado de razas y subrazas

async function llamaYPinta(url){
    const primera = await fetch(url);
    const text = await primera.json();
	const mensaje = text.message;
	console.log('text.message: ', text.message);
	console.log('text.message.bulldog; ', text.message.bulldog); //Array con 2 elementos
	console.log('text.message.bulldog[1]: ', text.message.bulldog[1]);
	console.log('text.status: ', text.status);
	console.log('text: ', text);
	
	/*let raza5 = Object.keys(mensaje)[5]; console.log('raza 5: = ', raza5);
	mensaje.(raza5.innerHTML).forEach(function(element){
		console.log('forEach text.message.bulldog: ', element);	
	})*/
	
	mensaje.bulldog.forEach(function(element){
		console.log('forEach text.message.bulldog: ', element);	
	})
	mensaje.bulldog.forEach(function(element, index){
		console.log('forEach text.message.bulldog Index: ' , index);		
	})
	console.log('Propiedades: cada Raza: ', Object.keys(mensaje) );
	console.log('Propiedades: Raza index 5: ', Object.keys(mensaje)[5] );
 }
 
 llamaYPinta('https://dog.ceo/api/breeds/list/all');

// DESESPERADO.......

let obj = {a: 1, b: 2, c: 3}; // Antes var obj
    
for (let prop in obj) {       // Antes const prop
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// Prueba Final

async function llamaYPinta(url){
    let primera = await fetch(url);
    let text = await primera.json();
	let mensaje = text.message;
	
	
	for (let prop in mensaje) {
		console.log(`mensaje.${prop} = ${mensaje[prop]}`);
	}
	console.log('Propiedades: cada Raza: ', Object.keys(mensaje) );
	console.log('Propiedades: Raza index 5: ', Object.keys(mensaje)[5] );
}

/*
const misPerros = Objects.keys(mensaje);

misPerros.for


*/
 
 llamaYPinta('https://dog.ceo/api/breeds/list/all');