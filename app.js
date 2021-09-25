// navigation menu----------
(() => {

    const hamburgerBtn = document.querySelector(".hamburger_btn"),
    navMenu = document.querySelector(".nav_menu"),
    closeNavBtn = navMenu.querySelector(".close_nav_menu");

    hamburgerBtn.addEventListener('click', showNavMenu);
    closeNavBtn.addEventListener('click', hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade_out_effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade_out_effect").classList.remove("active");
        }, 300)
    }

    // attach an event handler to document
    document.addEventListener('click', (event) => {
        if(event.target.classList.contains('link_item')){
            // make sure event.target.hash has a value before overridding default behavior
            if(event.target.hash !== ""){
                // prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing active navigation menu 'link_item'
                navMenu.querySelector(".active").classList.add("outer_shadow", "hover_in_shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner_shadow");
                if(navMenu.classList.contains("open")){
                    // activate new navigation menu 'link_item'
                    event.target.classList.add("active", "inner_shadow");
                    event.target.classList.remove("outer_shadow", "hover_in_shadow");
                    // hide navigation menu
                    hideNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link_item");
                    navItems.forEach((item) => {
                        if(hash === item.hash){
                            // activate new navigation menu 'link_item'
                            item.classList.add("active", "inner_shadow");
                            item.classList.remove("outer_shadow", "hover_in_shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add hash (#) to url
                window.location.hash = hash;
            }
        }
    });
    
})();

// about section tabs ----------
(() =>{
    
    const aboutSection = document.querySelector(".about_section"),
    tabsContainer = document.querySelector(".about_tabs");

    tabsContainer.addEventListener('click', (event) =>{
        /* if event.target contains 'tab_item' class and not contans 'active' class */
        if(event.target.classList.contains("tab_item") &&
         !event.target.classList.contains("active")){
             const target = event.target.getAttribute("data_target");
            //  deactivate existing active 'tab_item'
            tabsContainer.querySelector('.active').classList.remove("outer_shadow","active");
            // activate new 'tab_item'
            event.target.classList.add("outer_shadow", "active");
            //  deactivate existing active 'tab_content'
            aboutSection.querySelector(".tab_content.active").classList.remove("active");
            // activate new 'tab_content'
            aboutSection.querySelector(target).classList.add("active")
        }
    });

})();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop_scrolling");
}

// portfolio filter and popup ----------
(() => {

    const filterContainer = document.querySelector(".portfolio_filter"),
    portfolioItemsContainer = document.querySelector(".portfolio_items"),
    portfolioItems = document.querySelectorAll(".portfolio_item"),
    popup = document.querySelector(".portfolio_popup"),
    prevBtn = popup.querySelector(".pp_prev"),
    nextBtn = popup.querySelector(".pp_next"),
    closeBtn = popup.querySelector(".pp_close"),
    projectDetailsContainer = popup.querySelector(".pp_details"),
    projectDetailsBtn = popup.querySelector(".pp_project_details_btn");

    let itemIndex, slideIndex, screenshots;

    // filter portfolio items
    filterContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains("filter_item") &&
        !event.target.classList.contains("active")){
            //  deactivate existing active 'filter_item'
            filterContainer.querySelector(".active").classList.remove("outer_shadow", "active");
            // activate new 'filter_item'
            event.target.classList.add("outer_shadow", "active");
            const target = event.target.getAttribute("data_target");
            portfolioItems.forEach((item) => {
                if(target === item.getAttribute("data_category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })
    
    portfolioItemsContainer.addEventListener('click', (event) => {
        if(event.target.closest(".portfolio_item_inner")){
            const portfolioItem = event.target.closest(".portfolio_item_inner").parentElement;
            // get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio_item_img img").getAttribute("data_screenshots");
            // convert screenshots into array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener('click', () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToogle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    
    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp_img");
        // activate loader until the popupImg loaded
        popup.querySelector(".pp_loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate
            popup.querySelector(".pp_loader").classList.remove("active");
        }
        popup.querySelector(".pp_counter").innerHTML = (slideIndex + 1) + " of " + (screenshots.length);
    }

    // next slide
    nextBtn.addEventListener('click', () => {
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })
    
    // prev slide
    prevBtn.addEventListener('click', () => {
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails() {
        // if portfolio_item_details not exists
        if(!portfolioItems[itemIndex].querySelector(".portfolio_item_details")){
            projectDetailsBtn.style.display = "none";
            return;
            // end function execution
        }
        projectDetailsBtn.style.display = "block";
        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio_item_details").innerHTML;
        popup.querySelector(".pp_project_details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio_item_title").innerHTML;
        popup.querySelector(".pp_title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data_category");
        category.style.textTransform = "capitalise"
        popup.querySelector(".pp_project_category").innerHTML = category.split("_").join(" ");
    }
    
    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToogle();
    })

    function popupDetailsToogle() {
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();

// testimonial slider----------
(() => {

    const sliderContainer = document.querySelector(".testi_slider_container"),
    slides = sliderContainer.querySelectorAll(".testi_item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi_slider_nav .prev"),
    nextBtn = document.querySelector(".testi_slider_nav .next"),
    activeSlide = sliderContainer.querySelector(".testi_item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set width of all sliders
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    // set width of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener('click', () => {
        if(slideIndex === slides.length - 1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        slider();
    })

    prevBtn.addEventListener('click', () => {
        if(slideIndex === 0){
            slideIndex = slides.length - 1;
        }
        else{
            slideIndex--;
        }
        slider();
    })

    function slider(){
        // deactivate existing active
        sliderContainer.querySelector(".testi_item.active").classList.remove("active");
        // activate new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();
    
})();

// // hide all section except active----------
(() => {

    const sections = document.querySelectorAll(".section")
    sections.forEach((section) => {
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
    
})();

// preloader active----------
(() => {
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".preloader").classList.add("fade_out");
    }, 1200);
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    },600);
})

})();