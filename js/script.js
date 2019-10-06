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