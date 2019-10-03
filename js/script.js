function toggleNav() {
    document.querySelector('.burgerMenu').classList.toggle('menuActive');
    document.querySelector('nav').classList.toggle('menuActive');
}

document.querySelector('.burgerMenu').addEventListener('click', toggleNav)