let burger = document.getElementById("burger");
let lista = document.getElementById("nav-links");

burger.addEventListener("click", function(){
    if(lista.classList.contains("open") == false) {        
        lista.classList.add("open");
        burger.classList.add("close");
        document.getElementById("nav").style.background = "white";
        document.getElementById("logoimg").style.content = "url('img/logo.png')";
    }
    else {
        lista.classList.remove("open");
        burger.classList.remove("close");
        document.getElementById("nav").style.background = "transparent";
        document.getElementById("logoimg").style.content = "url('img/logo3.png')";
    }
});

let celalista = document.getElementsByTagName("li");

for(let i=0; i<celalista.length; i++) {
    celalista[i].addEventListener("click", function() {
        lista.classList.remove("open");
        burger.classList.remove("close");
        document.getElementById("nav").style.background = "transparent";
        document.getElementById("logoimg").style.content = "url('img/logo3.png')";
    });
}


let header = document.querySelector('nav');
let logoimg = document.getElementById("logoimg");

window.addEventListener('scroll', function () {
    header.classList.toggle("scrolling-active", window.scrollY > 60);
    logoimg.classList.toggle("logoscroll", window.scrollY > 60);
    burger.classList.toggle("burgerscroll", window.scrollY > 60);
})

let cta = document.getElementById('cta');


cta.addEventListener('mouseover', function(){
    if(cta.innerHTML != "Mejl kopiran!")
        cta.innerHTML = "brestenterijeri@gmail.com";
})

cta.addEventListener('mouseout', function(){
    cta.innerHTML = "Pošaljite nam E-mail!"
})

cta.addEventListener('click', function(){
    cta.innerHTML = "Mejl kopiran!";

    navigator.clipboard.writeText("brestenterijeri@gmail.com");
})