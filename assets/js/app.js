document.addEventListener("DOMContentLoaded", async (event) => { 
    
    const personajesElement = document.querySelector("#cardPersonaje");
    let personajesMostrados = [];
    try {
        const Response = await fetch('https://thesimpsonsapi.com/api/characters');

        if (!Response.ok) {
            throw new Error("Error al conectar con la API");
        }

        const personajesCard = await Response.json();
        personajesMostrados = personajesCard.results;

        personajesMostrados.forEach(cardPersonaje => {
            personajesElement.innerHTML +=
            ` <div class="col-12 col-md-4 mb-4">
                <div class="card" style="width: 18rem">
                  <img src="https://cdn.thesimpsonsapi.com/500${cardPersonaje.portrait_path}" class="card-img-top" alt="${cardPersonaje.name}"/>
                  <div class="card-body">
                    <h5 class="card-title">${cardPersonaje.name}</h5>
                    <p class="card-text">${cardPersonaje.occupation}</p>
                    <p class="card-text">${cardPersonaje.status}</p>
                    
                    <a href="#" class="btn btn-primary btn-detalle" data-id="${cardPersonaje.id}" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver Detalles</a>
                    
                  </div>
                </div>
              </div>`;       
        });

    } catch (error) {
        console.error("Error de red inicial:", error);
        personajesElement.innerHTML = `<h3 class="text-danger text-center mt-5">🔌 Error de red. No se cargaron los personajes.</h3>`;
    }
    const busquedaPersonaje = document.querySelector("#busquedaPersonaje");

    busquedaPersonaje.addEventListener('input', (event)=>{
        const textUser = event.target.value.toLowerCase();
        const personajeResultados = personajesMostrados.filter((cardPersonaje)=>{
            return cardPersonaje.name.toLowerCase().includes(textUser);
        });

        personajesElement.innerHTML = "";

        if(personajeResultados.length === 0){
            personajesElement.innerHTML=
            `<div class="col-12 text-center mt-5">
                <h3 class="text-muted">No se encontraron personajes para tu búsqueda</h3>
            </div>`;
        } else {
            personajeResultados.forEach(cardPersonaje=>{
                personajesElement.innerHTML +=
                ` <div class="col-12 col-md-4 mb-4">
                    <div class="card" style="width: 18rem">
                      <img src="https://cdn.thesimpsonsapi.com/500${cardPersonaje.portrait_path}" class="card-img-top" alt="${cardPersonaje.name}"/>
                      <div class="card-body">
                        <h5 class="card-title">${cardPersonaje.name}</h5>
                        <p class="card-text">${cardPersonaje.occupation}</p>
                        <p class="card-text">${cardPersonaje.status}</p>
                        
                        <a href="#" class="btn btn-primary btn-detalle" data-id="${cardPersonaje.id}" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver Detalles</a>
                        
                      </div>
                    </div>
                  </div>`;
            });
        }
    }); 

    personajesElement.addEventListener('click', async (event) => {
        
        if (event.target.classList.contains('btn-detalle')) {
            
            const idPersonaje = event.target.getAttribute('data-id');
            
            document.querySelector("#modalNombrePersonaje").innerText = "Cargando...";
            document.querySelector("#modalImagen").src = "";
            document.querySelector("#modalEdadNacimiento").innerText = "";
            document.querySelector("#modalGenero").innerText = "";
            document.querySelector("#modalOcupacion").innerText = "";
            document.querySelector("#modalEstado").innerText = "";
            document.querySelector("#modalFrase").innerText = "";

            try {
                const responseIndividual = await fetch(`https://thesimpsonsapi.com/api/characters/${idPersonaje}`);

                if (!responseIndividual.ok) {
                    throw new Error("Error en la API individual");
                }

                const personaje = await responseIndividual.json();

                console.log("ESTO TRAE EL SEGUNDO FETCH:", personaje);

                document.querySelector("#modalNombrePersonaje").innerText = personaje.name;
                document.querySelector("#modalImagen").src = `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;
                document.querySelector("#modalEdadNacimiento").innerText = `${personaje.age} (${personaje.airdate})`;
                document.querySelector("#modalGenero").innerText = personaje.gender;
                document.querySelector("#modalOcupacion").innerText = personaje.occupation;
                document.querySelector("#modalEstado").innerText = personaje.status;

                if (personaje.phrases && personaje.phrases.length > 0) {
                    document.querySelector("#modalFrase").innerText = `"${personaje.phrases[1]}"`;
                } else {
                    document.querySelector("#modalFrase").innerText = "Este personaje no tiene frases registradas.";
                }

            } catch (error) {
                console.error("Error al cargar el personaje:", error);
                document.querySelector("#modalNombrePersonaje").innerText = "Error";
                document.querySelector("#modalFrase").innerText = "No se pudo conectar para traer los detalles.";
            }
        }
    });
});

