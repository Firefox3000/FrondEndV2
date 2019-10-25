const weatherApiKey = '&units=metric&APPID=d2eb5b400421ec9aceb37cab13852517';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const hikeApiUrl = 'https://www.hikingproject.com/data/get-trails?';
const hikeApiKey = '&key=200612053-f2907f0c887fb6db20bc6ef07aacbced';

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
    document.querySelector('nav').classList.toggle('menuActive');
}

document.querySelector('#burgerMenu').addEventListener('click', toggleNav);


function favorite(e) {
    e.currentTarget.classList.toggle('favIconActive');
    console.log('fav gevonden')
}

async function getApi() {
    console.log(document.querySelector('#zoekLocatie').value);
    let api1 = weatherApiUrl + document.querySelector('#zoekLocatie').value + weatherApiKey;
    console.log(api1);

    weatherData = await fetch('http://127.0.0.1:5500/weather.json');
    weatherData = await weatherData.json();
    console.log(weatherData);

    lat = weatherData.coord.lat;
    lon = weatherData.coord.lon;

    console.log('lat= ' + lat + ' lon= ' + lon);

    let api2 = hikeApiUrl + 'lat=' + lat + '&lon=' + lon + '&maxDistance=' + document.querySelector('.range').value + hikeApiKey;
    console.log(api2);

    hikeData = await fetch('http://127.0.0.1:5500/hike.json')
    hikeData = await hikeData.json();
    console.log(hikeData);

    createRouteElements();
};

function createRouteElements() {
    console.log(hikeData.trails.length);
    // clear ul
    while (document.querySelector('.searchResult li')) {
        document.querySelector('.searchResult li').remove();
    }

    for (let i = 0; i < hikeData.trails.length; i++) {
        // create li in ul
        let parrentElement = document.querySelector('.searchResult');
        let liItem = document.createElement('li');
        liItem.classList.add('item');
        parrentElement.appendChild(liItem);

        let listItem = document.querySelectorAll('.searchResult li')[i];

        let pic = document.createElement('div');
        pic.classList.add('pic');
        listItem.appendChild(pic);

        // info element
        let info = document.createElement('div')
        info.classList.add('itemContent');
        listItem.appendChild(info);
        // info content
        let itemContent = document.querySelectorAll('.itemContent')[i];

        let title = document.createElement('h3');
        title.innerHTML = hikeData.trails[i].name;
        itemContent.appendChild(title);

        let length = document.createElement('p');
        let trailLenth = Math.round(hikeData.trails[i].length / 0.62137 * 100) / 100;
        length.innerHTML = trailLenth + ' km | ' + Math.round(trailLenth / 5 * 100) / 100 + ' uur';

        itemContent.appendChild(length);

        // Create link
        let a = document.createElement('a');
        a.href = 'detail.html';
        a.innerHTML = 'Start de route';
        listItem.appendChild(a);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logLocation);
    }
}

function logLocation(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    document.querySelector('#zoekLocatie').value = 'Lat: ' + position.coords.latitude.toFixed(2) + ' Lon: ' + position.coords.longitude.toFixed(2);
}


function sliderValue() {
    if (document.querySelector('#zoekRange').value < 250) {
        document.querySelector('.viewRange').innerHTML = document.querySelector('#zoekRange').value;
    } else {
        document.querySelector('.viewRange').innerHTML = '> 250 km';
    }
}


function themeSwitch() {
    document.querySelector('body').classList.toggle('lightTheme');
}

document.querySelector('#themeSwitch').addEventListener('click', themeSwitch);

document.querySelector('.submitZoeken').addEventListener('click', function (event) {
    event.preventDefault();
});
document.querySelector('.submitZoeken').addEventListener('click', getApi);

document.querySelector('form button').addEventListener('click', function (event) {
    event.preventDefault();
});



document.querySelector('#zoekRange').addEventListener('input', sliderValue);
document.querySelector('form button').addEventListener('click', getLocation);