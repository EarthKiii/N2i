//place randomly images on the page
var images = ["/public/img/capote1.png", "/public/img/capote2.png", "/public/img/capote3.png", "/public/img/capote4.png", "/public/img/capote5.png"];
function randomPic() {
    document.querySelector(".capote").innerHTML = "";
    for (var i=0; i<Math.round((window.innerWidth-50)/200)-1; i++) {
        img = document.createElement("img");
        img.src = images[Math.floor(Math.random()*images.length)];
        img.width = 200;
        img.height = 200;
        img.style.marginTop = `${Math.floor(Math.random()*10+1)*100}px`;
        img.style.postion = "absolute";
        document.querySelector(".capote").appendChild(img)
    }
}
window.addEventListener("resize", randomPic);
randomPic();