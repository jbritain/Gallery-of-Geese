var geeseContainer;

function createGooseGrid(){
    geeseContainer = document.getElementById("geeseContainer");

    try {
        geese = getGeese().geese; // load geese
    } catch (error) { // show error message
        document.getElementById("largeGooseDisplay").style.top = "50%";
        document.getElementById("lgdImg").src = window.location + "/assets/geese/" + "error.png";
        document.getElementById("lgdName").innerHTML = "Error";
        document.getElementById("lgdDescription").innerHTML = `
            There was an error loading geese <br> <br>
            <code>` + error + `</code> <br> <br>
            Try reloading the page. If this does not work, maybe come back later, or if worst comes to worst, <a href="https://github.com/Pr0x1mas/Gallery-of-Geese/issues/new/choose">submit an issue report</a>
        `;
		document.getElementById("lgdAuthor").innerHTML = "";
        document.getElementById("darkenOverlay").style.visibility = "visible";
        document.getElementById("darkenOverlay").style.opacity = 1;
        return;
    }
    
    var today = new Date();
    gooseOfTheDay = geese[Math.floor(seededRandom(today.getFullYear()+(today.getMonth()+1)+today.getDate()) * geese.length)];   // calculate goose of the day

    geese.sort(() => Math.random() - 0.5); //randomise order of geese
    geese.forEach(goose => {
        addGoose(goose); // add geese to page
    });
    

    document.getElementById("gotdName").innerHTML = gooseOfTheDay.name; // display goose of the day
    document.getElementById("gotdDescription").innerHTML = gooseOfTheDay.description;
    document.getElementById("gotdImg").src = String(window.location).split("?")[0] + "/assets/geese/" + gooseOfTheDay.filename;

}

function getGeese(){  // get json file with all goose data
    var xmlhttp = new XMLHttpRequest();
    gooseLocation = 
    xmlhttp.open("GET", String(window.location).split("?")[0] +  "/assets/geese/geese.json", false); // load geese from server
    //xmlhttp.open("GET", '/assets/geese/geese.json', false);
    xmlhttp.send();

    if(xmlhttp.status == 200) {
        result = xmlhttp.responseText;
        return JSON.parse(result); // return goose data
    } else {
        throw new Error("The server responded with a status of " + xmlhttp.status + " when loading " + xmlhttp.responseURL) // throw error so message is displayed if geese cannot be loaded
    }
}

function addGoose(goose){
    newGoose = document.createElement("div"); // add goose to page
    newGoose = document.createElement("div");
    newGooseText = document.createElement("div");

    newGoose.id = goose.name;
    newGoose.classList.add("gooseCard");

    gooseImage = document.createElement("img");
    gooseName = document.createElement("h2");
    gooseDescription = document.createElement("p");

    gooseImage.src = String(window.location).split("?")[0] +  "/assets/geese/" + goose.filename;
    gooseName.innerHTML = goose.name;
    gooseDescription.innerHTML = goose.description;

    //newGoose.appendChild(gooseName);
    //newGoose.appendChild(gooseDescription);

    //newGoose.style.backgroundImage = "url('" + "/assets/geese/" + filename + "')"

    newGooseText.appendChild(gooseName);
    newGooseText.appendChild(gooseDescription);
    newGoose.setAttribute('onclick', "showGooseDisplay(this)");

    newGoose.setAttribute('data-name', goose.name);
    newGoose.setAttribute('data-description', goose.description);
    newGoose.setAttribute('data-filename', goose.filename);
    newGoose.setAttribute('data-author', goose.author);
    newGoose.setAttribute('data-date', goose.date);

    newGoose.appendChild(gooseImage);
    newGoose.appendChild(newGooseText);


    geeseContainer.appendChild(newGoose);
}

function seededRandom(seed) { //https://stackoverflow.com/a/19303725 - normal js random does not allow for seeding but this one does, it is not very random but that does not matter
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function showGooseDisplay(goose){
    document.getElementById("largeGooseDisplay").style.top = "50%";
    document.getElementById("lgdImg").src = String(window.location).split("?")[0] +  "/assets/geese/" + goose.dataset.filename;
    document.getElementById("lgdName").innerHTML = goose.dataset.name;
    document.getElementById("lgdDescription").innerHTML = goose.dataset.description;
    document.getElementById("lgdAuthor").innerHTML = "Submitted by " + goose.dataset.author + " on " + goose.dataset.date;
    document.getElementById("darkenOverlay").style.visibility = "visible";
    document.getElementById("darkenOverlay").style.opacity = 1;
}

function closeGooseDisplay(){
    document.getElementById("largeGooseDisplay").style.top = "150%";
    document.getElementById("darkenOverlay").style.visibility = "hidden";
    document.getElementById("darkenOverlay").style.opacity = 0;
}