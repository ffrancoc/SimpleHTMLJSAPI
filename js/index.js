
// Function to consult
var nombrePersonaje = $('#nombre-personaje')
var resultados = $('#resultados')
var itemsEncontrados = $('#items-encontrados')


const template_epidodes = (episode) => {
    var data = '<ul class=\'list-group\'>'
    episode.forEach(element => {
        data += `<li class='list-group-item'>${element}</li>`
    });
    data += '</ul>'
    return data
}

const template = (image, id, name, estatus, species, gender, origin, location, episode, created) => {
    return `<div class='card p-2 rounded shadow mb-2'>
                <div class='row'>
                    <div class='col-sm-12 col-md-2 text-center'>
                        <img class='rounded' src='${image}' width='180px' height='180px'>
                    </div>

                    <div class='col-sm-12 col-md-6 text-sm-center'>                    
                        <h5>ID: <span class='fw-normal'>${id}</span></h5>
                        <h5>NAME: <span class='fw-normal'>${name}</span></h5>
                        <h5>STATUS: <span class='fw-normal'>${estatus}</span></h5>
                        <h5>SPECIES: <span class='fw-normal'>${species}</span></h5>
                        <h5>GENDER: <span class='fw-normal'>${gender}</span></h5>
                        <h5>ORIGIN: <span class='fw-normal'>${origin.name}</span></h5>
                        <h5>LOCATION: <span class='fw-normal'>${location.name}</span></h5>
                        <h5>CREATED: <span class='fw-normal'>${created}</span></h5>                        
                    </div>

                    <div class='col-sm-9 col-md-4 text-sm-center'>
                        <p>                        
                        <b>EPISODE:</b> 
                        <div data-bs-spy='scroll'>
                            ${template_epidodes(episode)}
                        </div>
                        </p>
                    </div>
                </div>
            </div>`
}

$('#btn-buscar').on('click', (event) => {
    if (!!nombrePersonaje.val()) {
        resultados.empty()
        $('#btn-buscar').attr('disabled', true)

        $.ajax({
            type: 'GET',
            url: `https://rickandmortyapi.com/api/character?name=${nombrePersonaje.val()}`,
            success: (data) => {
                data.results.forEach(element => {
                    resultados.append(template(element.image, element.id, element.name, element.status, element.species, element.gender, element.origin, element.location, element.episode, element.created))
                });

                itemsEncontrados.html(data.results.length)
                $('#btn-buscar').attr('disabled', false)
            },
            error: () => {
                resultados.empty()
                itemsEncontrados.html(0)
                resultados.append('<div class=\'col-sm-12 col-md-12 p-2 card rounded shadow text-center bg-white\'><h1>Personaje no encontrado</h1></div>')
                $('#btn-buscar').attr('disabled', false)
            }
        })

    } else {
        alert('El campo no debe estar vacio')
    }
})