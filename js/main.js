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

//make home section to transparent
const homeWrap = document.querySelector('.home__wrap');
const homeHeight = homeWrap.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    homeWrap.style.opacity = 1 - window.scrollY / homeHeight;
});

//handle up button
const btnUp = document.querySelector('.upbutton');
document.addEventListener('scroll', () =>{
    if(window.scrollY > homeHeight / 2){
        btnUp.classList.add('on');
    }
    else{
        btnUp.classList.remove('on');
    }
});

btnUp.addEventListener('click', () => {
    scrollIntoView('#home');
})


//projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) =>{
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    projectContainer.classList.add('anim-out');
   
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove("invisible");
            }
            else{
                project.classList.add("invisible");
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
});


const scrollIntoView = (selector) =>{
    const contactMe = document.querySelector(selector);
    contactMe.scrollIntoView({behavior:'smooth'});
}