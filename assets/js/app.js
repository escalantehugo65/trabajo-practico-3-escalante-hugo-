document.addEventListener("DOMContentLoaded",async (event) => { 
   const Response = await fetch('https://thesimpsonsapi.com/api/characters');

   const personajesCard = await Response.json()

   const personajesMostrados = personajesCard.results


   const personajesElement = document.querySelector("#cardPersonaje")

    personajesMostrados.forEach(cardPersonaje => {
        personajesElement.innerHTML +=
        ` <div class="col-12 col-md-4">
            <div class="card" style="width: 18rem">
              <img src="https://cdn.thesimpsonsapi.com/500${cardPersonaje.portrait_path}" class="card-img-top" alt="${cardPersonaje.name}"/>
              <div class="card-body">
                <h5 class="card-title">${cardPersonaje.name}</h5>
                <p class="card-text">
                  ${cardPersonaje.occupation}
                </p>
                <p class="card-text">
                  ${cardPersonaje.status}
                </p>
                <a href="#" class="btn btn-primary">Ver Detalles</a>
              </div>
            </div>
          </div>`       
    });

   const busquedaPersonaje = document.querySelector("#busquedaPersonaje")

   busquedaPersonaje.addEventListener('input', (event)=>{
    
    const textUser = event.target.value.toLowerCase()


    const personajeResultados = personajesMostrados.filter( (cardPersonaje)=>{
        return cardPersonaje.name.toLowerCase().includes(textUser)
    })
    console.log(textUser)

    personajesElement.innerHTML = "";

    if(personajeResultados.length===0){
        personajesElement.innerHTML=
        `<div class="col-12 text-center mt-5">
            <h3 class="text-muted">No se encontraron personajes para tu búsqueda</h3>
        </div>`
    } else{personajeResultados.forEach(cardPersonaje=>{
        personajesElement.innerHTML +=
        ` <div class="col-12 col-md-4">
            <div class="card" style="width: 18rem">
              <img src="https://cdn.thesimpsonsapi.com/500${cardPersonaje.portrait_path}" class="card-img-top" alt="${cardPersonaje.name}"/>
              <div class="card-body">
                <h5 class="card-title">${cardPersonaje.name}</h5>
                <p class="card-text">
                  ${cardPersonaje.occupation}
                </p>
                <p class="card-text">
                  ${cardPersonaje.status}
                </p>
                <a href="#" class="btn btn-primary">Ver Detalles</a>
              </div>
            </div>
          </div>` })
    }
   }) 
  
})