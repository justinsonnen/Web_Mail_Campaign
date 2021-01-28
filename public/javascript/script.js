//parallax
// const parallax = document.getElementById("title");

// window.addEventListener("scroll", function(){
// let offset = window.scrollY;

// console.log("offset: " + offset);

// parallax.style.backgroundPositionY = offset * 0.7 + "px";
// });





//Gallery

const panels = document.querySelectorAll('.panel')

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}