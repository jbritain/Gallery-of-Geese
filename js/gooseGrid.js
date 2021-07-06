var geeseContainer;

function createGooseGrid(){
    geeseContainer = document.getElementById("geeseContainer");

    try {
        geese = getGeese().geese;
    } catch (error) {
        document.getElementById("largeGooseDisplay").style.top = "50%";
        document.getElementById("lgdImg").src = window.location + "/assets/geese/" + "error.png";
        document.getElementById("lgdName").innerHTML = "Error";
        document.getElementById("lgdDescription").innerHTML = `
            There was an error loading geese <br> <br>
            <code>` + error + `</code> <br> <br>
            Try reloading the page. If this does not work, maybe come back later, or if worst comes to worst, <a href="https://github.com/Pr0x1mas/Gallery-of-Geese/issues/new/choose">submit an issue report</a>
        `;
        document.getElementById("darkenOverlay").style.visibility = "visible";
        document.getElementById("darkenOverlay").style.opacity = 1;
        return;
    }
    
    geese.forEach(goose => {
        addGoose(goose.name, goose.description, goose.filename);
    });

    var today = new Date();  
    gooseOfTheDay = geese[Math.floor(seededRandom(today.getFullYear()+(today.getMonth()+1)+today.getDate()) * geese.length)];

    document.getElementById("gotdName").innerHTML = gooseOfTheDay.name;
    document.getElementById("gotdDescription").innerHTML = gooseOfTheDay.description;
    document.getElementById("gotdImg").src = window.location + "/assets/geese/" + gooseOfTheDay.filename;

}

function getGeese(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", 'https://rawcdn.githack.com/Pr0x1mas/Gallery-of-Geese/3a8f0be0309b1ede60931726ada896c3bbf865ac/assets/geese/geese.json', false);
    //xmlhttp.open("GET", '/assets/geese/geese.json', false);
    xmlhttp.send();

    if(xmlhttp.status == 200) {
        result = xmlhttp.responseText;
        return JSON.parse(result);
    } else {
        throw new Error("The server responded with a status of " + xmlhttp.status + " when loading " + xmlhttp.responseURL)
    }
}

function addGoose(name, description, filename){newGoose = document.createElement("div");
    newGoose = document.createElement("div");
    newGooseText = document.createElement("div");

    newGoose.id = name;
    newGoose.classList.add("gooseCard");

    gooseImage = document.createElement("img");
    gooseName = document.createElement("h2");
    gooseDescription = document.createElement("p");

    gooseImage.src = window.location +  "/assets/geese/" + filename;
    gooseName.innerHTML = name;
    gooseDescription.innerHTML = description;

    //newGoose.appendChild(gooseName);
    //newGoose.appendChild(gooseDescription);

    //newGoose.style.backgroundImage = "url('" + "/assets/geese/" + filename + "')"

    newGooseText.appendChild(gooseName);
    newGooseText.appendChild(gooseDescription);

    newGoose.setAttribute('onclick', "showGooseDisplay(this)");

    newGoose.appendChild(gooseImage);
    newGoose.appendChild(newGooseText);


    geeseContainer.appendChild(newGoose);
}

function seededRandom(seed) { //https://stackoverflow.com/a/19303725
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function showGooseDisplay(goose){
    document.getElementById("largeGooseDisplay").style.top = "50%";
    document.getElementById("lgdImg").src = goose.children[0].src;
    document.getElementById("lgdName").innerHTML = goose.children[1].children[0].innerHTML;
    document.getElementById("lgdDescription").innerHTML = goose.children[1].children[1].innerHTML;
    document.getElementById("darkenOverlay").style.visibility = "visible";
    document.getElementById("darkenOverlay").style.opacity = 1;
}

function closeGooseDisplay(){
    document.getElementById("largeGooseDisplay").style.top = "150%";
    document.getElementById("darkenOverlay").style.visibility = "hidden";
    document.getElementById("darkenOverlay").style.opacity = 0;
}