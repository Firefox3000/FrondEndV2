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

// document.querySelector('.burgerMenu').addEventListener('click', toggleNav);


function favorite(e) {
    e.currentTarget.classList.toggle('favIconActive');
}

async function getApi() {
    console.log(document.querySelector('.zoekLocatie').value);
    let api1 = weatherApiUrl + document.querySelector('.zoekLocatie').value + weatherApiKey;
    console.log(api1);

    // weatherData = await fetch(api1);
    weatherData = await fetch('http://127.0.0.1:5500/weather.json');
    weatherData = await weatherData.json();
    console.log(weatherData);

    lat = weatherData.coord.lat;
    lon = weatherData.coord.lon;

    console.log('lat= ' + lat + ' lon= ' + lon);

    let api2 = hikeApiUrl + 'lat=' + lat + '&lon=' + lon + '&maxDistance=' + document.querySelector('.range').value + hikeApiKey;
    console.log(api2);

    // hikeData = await fetch(api2);
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
        parrentElement.appendChild(document.createElement('li'));

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
        a.href = '#';
        a.innerHTML = 'Start de route';
        listItem.appendChild(a);
    }
}

/*
<li>
<div class="pic"></div>
<div class="itemContent">
    <h3>Route 1</h3>
    <p>8,3 km | 1,5 uur</p>
</div>
<a href="#">Start de Route</a>
<svg class="favIcon" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400"
    style="enable-background:new 0 0 400 400;" xml:space="preserve">
    <path d="M283.5,18.5c-18.6,0-36.4,4.3-52.9,12.7c-11.2,5.7-21.5,13.3-30.4,22.4c-8.8-9-19.2-16.7-30.4-22.4
        c-16.5-8.4-34.3-12.7-52.9-12.7C52.7,18.5,0.5,70.8,0.5,135c0,45.5,24,93.8,71.4,143.6c39.6,41.6,88,76.2,121.7,98l6.7,4.3l6.7-4.3
        c33.7-21.8,82.1-56.4,121.7-98C376,228.8,400,180.5,400,135C400,70.8,347.7,18.5,283.5,18.5z" />
</svg>
</li> -->
*/

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logLocation);
    }
}

function logLocation(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

document.querySelector('.submitZoeken').addEventListener('click', function (event) {
    event.preventDefault();
});
document.querySelector('.submitZoeken').addEventListener('click', getApi);

document.querySelector('form button').addEventListener('click', function (event) {
    event.preventDefault();
});
document.querySelector('form button').addEventListener('click', getLocation);


document.querySelector('#zoekRange').addEventListener('input', sliderValue);

function sliderValue() {
    if (document.querySelector('#zoekRange').value < 250) {
        document.querySelector('.viewRange').innerHTML = document.querySelector('#zoekRange').value;
    } else {
        document.querySelector('.viewRange').innerHTML = 'Alle afstanden';
    }
}