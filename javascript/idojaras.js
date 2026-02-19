const apiKey ="e70efa4cccaabfd2ae35e27962ed973d";
let hely = "Samarinda";

async function getIdojaras(varos) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${varos}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(data);
    const {main: main, weather: [weather]} = data;
    return {main: main, weather: weather}
}

async function setDiv(varos) {
    const {main: main, weather: idojaras} = await getIdojaras(varos);
    //console.log(await getIdojaras(varos));
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



async function getVarosLista() {
    const response = await fetch("../adatok/varosok.txt");
    const data = await response.text();
    const dataLista = data.split("\t");
    const varosok = [];
    for(let i = 1; i < dataLista.length; i += 5) varosok.push(dataLista[i]);
    return varosok;
}

async function setupSelect() {
    const varosSelect = document.getElementById("varosSelect");
    const varosok = await getVarosLista();
    varosSelect.addEventListener("input", function() {
        hely = varosSelect.value;
        setDiv(hely);
    });
    for(let i = 0; i < varosok.length; i++) {
        const opcio = document.createElement("option");
        opcio.value = varosok[i];
        opcio.textContent = varosok[i];
        varosSelect.append(opcio);
    }
}

setupSelect();

setDiv(hely);
setInterval(function() {
    setDiv(hely);
}, 300000);
