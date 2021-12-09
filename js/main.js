'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }
    else{
        navbar.classList.remove('navbar--dark');
    }
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link === null){
        return;
    }
    scrollIntoView(link);
});

//Handle scrolling when tapping on the contact me button
const btnContactMe = document.querySelector('.home__contact');
btnContactMe.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

const scrollIntoView = (selector) =>{
    const contactMe = document.querySelector(selector);
    contactMe.scrollIntoView({behavior:'smooth'});
}

//make home section to transparent
const homeWrap = document.querySelector('.home__wrap');
const homeHeight = homeWrap.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    homeWrap.style.opacity = 1 - window.scrollY / homeHeight;
});