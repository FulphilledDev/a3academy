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

 var swiper = new Swiper(".coaches-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        depth: 200,
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

var swiper = new Swiper(".review-slider", {
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

var swiper = new Swiper(".posts-slider", {
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

// Checkout Button

//////////////////////

const button = document.querySelector("button")
button.addEventListener("click", (req, res) => {
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            items: [{ 
                id: req.body.id, // 1
                quantity: req.body.quantity, // 3
            }]
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json = Promise.reject(json))
    }).then(({ url }) => {
        window.location = url
    }).catch( e => {
        console.error(e.error)
    })
})