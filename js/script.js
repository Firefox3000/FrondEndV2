const weatherApiKey = '&units=metric&APPID=d2eb5b400421ec9aceb37cab13852517';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const hikeApiUrl = 'https://www.hikingproject.com/data/get-trails?';
const hikeApiKey = '&key=200612053-f2907f0c887fb6db20bc6ef07aacbced';

// https://www.hikingproject.com/data/get-trails?lat=51.59&lon=-4.78&maxDistance=10&key=200612053-f2907f0c887fb6db20bc6ef07aacbced

var weatherData;
var hikeData;

var lon;
var lat;


function setup() {
    for (let i = 0; i < document.querySelectorAll('.favIcon').length; i++) {
        document.querySelectorAll('.favIcon')[i].addEventListener('click', favorite);
    }
}

setup()

function toggleNav() {
    document.querySelector('.burgerMenu').classList.toggle('menuActive');
    document.querySelector('nav').classList.toggle('menuActive');
}

document.querySelector('.burgerMenu').addEventListener('click', toggleNav)


function favorite(e) {
    e.currentTarget.classList.toggle('favIconActive');
}


async function getApi() {
    console.log(document.querySelector('.zoekLocatie').value);
    let api1 = weatherApiUrl + document.querySelector('.zoekLocatie').value + weatherApiKey;
    console.log(api1);
    
    weatherData = await fetch(api1);
    weatherData = await weatherData.json();
    console.log(weatherData);

    lat = weatherData.coord.lat;
    lon = weatherData.coord.lon;

    console.log ('lat= ' + lat + ' lon= '+ lon);

    let api2 = hikeApiUrl + 'lat=' + lat + '&lon=' + lon + '&maxDistance=100' + hikeApiKey;
    console.log(api2);

    hikeData = await fetch(api2);
    hikeData = await hikeData.json();
    console.log(hikeData);

    // get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200612053-f2907f0c887fb6db20bc6ef07aacbced
};

console.log('active')

/*
async function getHikeApi() {
    console.log(document.querySelector('.locatieZoek').value);



    // const responce = await fetch();


/*

        let bestaat = false;
        let jsonUrl2 = jsonUrl + guess.charAt(0).toLowerCase() + '.json';
        const responce = await fetch(jsonUrl2);
        let data = await responce.json();
    
        for (i = 0; i < data.length; i++) {
            if (data[i].toLowerCase() == guess.toLowerCase()) {
                bestaat = true;
                console.log('dit woord bestaat');
            }
        }
        return bestaat;
        */
// }

document.querySelector('.submitZoeken').addEventListener('click', function(event) {
    event.preventDefault();
});

document.querySelector('.submitZoeken').addEventListener('click', getApi);




