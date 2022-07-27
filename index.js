const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '24b96c08b7msha29279cc290de27p1a6a36jsne21c408aedff',
        'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
    }
};

const fetchIpInfo = ip => {
    return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
        .then(res => res.json())
        .catch(err => console.error(err))
}

//Se utiliza para no repetir lo mismo en const
const $ = selector => document.querySelector(selector)

//El signo $ despues de const indica que es un elemento del DOM
const $form = $('#form')
const $input = $('#input')
const $submit = $('#submit')
const $results = $('#results')

//Evita que se refresque la página
$form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const {value} = $input
    if (!value) return //No hace nada si no tiene valor

    //Se desabilita el boton
    $submit.setAttribute('disabled', '')
    //Se agrega la animacion de cargando gracias a picocss.com
    $submit.setAttribute('aria-busy','true')

    const ipInfo = await fetchIpInfo(value)

    if (ipInfo) {
        $results.innerHTML = JSON.stringify(ipInfo, null, 2)
    }

    $submit.removeAttribute('disabled')
    $submit.removeAttribute('aria-busy')
})