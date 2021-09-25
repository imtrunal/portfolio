// style switcher open----------
const styleSwitcherToggler = document.querySelector(".style_switcher_toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style_switcher").classList.toggle("open");
});

// hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style_switcher").classList.contains("open")){
        document.querySelector(".style_switcher").classList.remove("open");
    }
})

// theme color ----------
const alternateStyles = document.querySelectorAll(".altenate-style")
function setActiveStyle(color) {
    localStorage.setItem("color", color);
    changeColor();
}

function changeColor(){
    alternateStyles.forEach((style) => {
        if(localStorage.getItem("color") === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled","true")
        }
    })
}

// checking if "color" key exixts
if(localStorage.getItem("color") !== null){
    changeColor();
}

// dark and light theme mode----------
const dayNight = document.querySelector(".day_night")

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
    updateIcon();
})

function themeMode(){
    // cheking if 'theme' key exists
    if(localStorage.getItem("theme") !== null){
        if(localStorage.getItem("theme") === "light"){
            document.body.classList.remove("dark");
        }
        else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}
themeMode();
function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
    }
    else{
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}

// window.addEventListener("load", () => {
//     if(document.body.classList.contains("dark")){
//         dayNight.querySelector("i").classList.add("fa-sun");
//     }
//     else{
//         dayNight.querySelector("i").classList.add("fa-moon");
//     }
// });