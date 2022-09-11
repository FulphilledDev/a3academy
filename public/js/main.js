let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

//////////////////

// Navbar / Menu

//////////////////
menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

///////////////////

// Scroll

///////////////////

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

///////////////////

// Swiper

///////////////////

 var coachesSwiper = new Swiper(".coaches-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        depth: 0,
        modifier: 1,
        rotate: 0,
        scale: 1,
        slideShadows: true,
        stretch: 0
      },
      pagination: {
        el: ".swiper-pagination",
      },
});

var reviewSwiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        600:{
            slidesPerView:2,
        },
    },
});

var postsSwiper = new Swiper(".posts-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        768:{
            slidesPerView:2,
        },
        991:{
            slidesPerView:3,
        },
    },
});

//////////////////////

// Stripe Checkout Button

//////////////////////

const button = document.querySelector("button")

button.addEventListener("click", () => {
    fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            items: [{ 
                id: 1
            }]
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json = Promise.reject(json))
    })
    .then(({ url }) => {
        window.location = url
    })
    .catch( e => {
        console.error(e.error)
    })
})