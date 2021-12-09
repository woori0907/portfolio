'use strict';

// Make navbar transparent when it is on the top
const navBar = document.querySelector("#navbar");
const navBarHeight = navBar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navBarHeight){
        navBar.classList.add('navbar--dark');
    }
    else{
        navBar.classList.remove('navbar--dark');
    }
});