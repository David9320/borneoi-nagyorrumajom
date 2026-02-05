const apiKey ="e70efa4cccaabfd2ae35e27962ed973d";

async function getIdojaras(varos) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${varos}&appid=${apiKey}&units=metric`);
    const {main: main, weather: [weather]} = await response.json();
    return {main: main, weather: weather}
}

async function setDiv(varos) {
    const {main: main, weather: idojaras} = await getIdojaras(varos);
    console.log(main);
    const idojarasDiv = document.getElementById("idojarasDiv");
    idojarasDiv.innerHTML = "";
    addElement("h1", varos);
    addElement("p", `Hőmérséklet: ${main.temp}°C`, "idojarasErtek");
    addElement("p", `Páratartalom: ${main.humidity}%`, "idojarasErtek");
    addElement("p", `Nyomás: ${main.pressure}Pa`, "idojarasErtek");
}

function addElement(tipus, szoveg, classText) {
    const idojarasDiv = document.getElementById("idojarasDiv");
    const elem = document.createElement(tipus);
    elem.textContent = szoveg;
    if(classText) elem.classList.add(classText);
    console.log(elem);
    idojarasDiv.append(elem);
}

setDiv("Borneo");
setInterval(function() {
    setDiv("Borneo");
}, 300000);