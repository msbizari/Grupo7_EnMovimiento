window.onload = function(){
    let mainNavBar = document.querySelector('.main-nav-bar');
    let burger = document.querySelector('.burger');
    burger.addEventListener('click', (e) => {
    
        mainNavBar.classList.add("main-nav-bar-display")
        mainNavBar.classList.remove("main-nav-bar")
        burger.style.display = "none"
    })
    /* burger.addEventListener('click', (e) => {
    
        mainNavBar.classList.add("main-nav-bar-display")
        mainNavBar.classList.remove("main-nav-bar")
        burger.style.display = "none"
        }) */
    
}

