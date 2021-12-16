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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
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

    // Remove selection from the previous item select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('selected');

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




const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
let selectedNavItem = navItems[0];
let selectedNavIndex;
function selecNavItem (selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active'); 
}

const scrollIntoView = (selector) =>{
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selecNavItem(navItems[sectionIds.indexOf(selector)]);
}

const option = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }
            else{
                selectedNavIndex = index - 1;
            }     
        }
    });
}
const observer = new IntersectionObserver(observerCallback, option);
sections.forEach(section => observer.observe(section));
window.addEventListener('wheel', () => {
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    }
    else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length-1;
    }
    selecNavItem(navItems[selectedNavIndex]);
});