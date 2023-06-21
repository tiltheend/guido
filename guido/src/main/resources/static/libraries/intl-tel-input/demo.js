

  window.addEventListener('DOMContentLoaded', (event) => {

    const btn = document.getElementById(submitBtn);

    console.log(btn);

    btn.addEventListener("click", ()=>{
      console.log(document.getElementById(phone).value);
  });

});