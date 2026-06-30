document.addEventListener("DOMContentLoaded",async (event) => { 
   const Response = await fetch('https://thesimpsonsapi.com/api/characters');

   const personajesCard = await Response.json()

   const personajesMostrados = personajesCard.results

   console.log(personajesMostrados)

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

})