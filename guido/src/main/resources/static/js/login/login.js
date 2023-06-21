var show = document.querySelector('#show');
var modalWindow = document.querySelector('#modalWindow');
var modal = document.querySelector('#modal');
var close = document.querySelector('#close');
var sendEmailBtn = document.querySelector('#sendEmailBtn');

show.addEventListener("click",()=>{
    modal1.style.display = "block";
})
sendEmailBtn.addEventListener("click",()=>{
    modal1.style.display = "none";
    modal2.style.display = "block";
})
close.addEventListener("click",()=>{
    modal1.style.display = "none";
})
close2.addEventListener("click",()=>{
    modal2.style.display = "none";
})

