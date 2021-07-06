var geeseContainer;

function createGooseGrid(){
    geeseContainer = document.getElementById("geeseContainer");

    geese = getGeese().geese;
    
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
    xmlhttp.send();

    if(xmlhttp.status == 200) {
        result = xmlhttp.responseText;
        return JSON.parse(result);
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

    newGoose.appendChild(gooseImage);
    newGoose.appendChild(newGooseText);


    geeseContainer.appendChild(newGoose);
}

function seededRandom(seed) { //https://stackoverflow.com/a/19303725
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
