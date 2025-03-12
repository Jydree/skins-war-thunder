function agregarInput() {
    let container = document.getElementById("inputsContainer");
    let input = document.createElement("input");
    input.type = "text";
    input.className = "inputPalabra";
    input.placeholder = "Ingresa una clave";
    input.onkeypress = manejarEnter;
    input.onkeydown = manejarBackspace;
    container.appendChild(document.createElement("br"));
    container.appendChild(input);
    input.focus();
}

function borrarUltimoInput() {
    let container = document.getElementById("inputsContainer");
    let inputs = container.getElementsByClassName("inputPalabra");
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1].previousSibling);
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function manejarEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarInput();
    }
}

function manejarBackspace(event) {
    let input = event.target;
    let container = document.getElementById("inputsContainer");
    let inputs = container.getElementsByClassName("inputPalabra");
    if (event.key === "Backspace" && input.value === "" && inputs.length > 1) {
        event.preventDefault();
        container.removeChild(input.previousSibling);
        container.removeChild(input);
        inputs[inputs.length - 1].focus();
    }
}

function generarHashtags(add) {
    let inputs = document.getElementsByClassName("inputPalabra");
    let palabras = [];
    for (let input of inputs) {
        let palabra = input.value.trim();
        if (palabra) palabras.push(palabra);
    }
    if (palabras.length === 0) return;

    let combinaciones = generarCombinaciones(palabras);
    combinaciones.sort((a, b) => (a.match(/_/g) || []).length - (b.match(/_/g) || []).length);

    const old = document.getElementById("hashtags").innerText + ' '
    const text = combinaciones.map(h => `#${h}`).join(' ');
    console.dir(old)
    console.dir(text)
    document.getElementById("hashtags").innerText = (add == true ? old : '') + text;
    console.dir(document.getElementById("hashtags").innerText)
}

function limpiarHashtags() {
    document.getElementById("hashtags").innerText = ''
}

function generarCombinaciones(palabras) {
    let resultados = [];
    let n = 1 << (palabras.length - 1);

    for (let i = 0; i < n; i++) {
        let hashtag = palabras[0];
        for (let j = 1; j < palabras.length; j++) {
            hashtag += (i & (1 << (j - 1))) ? "_" : "";
            hashtag += palabras[j];
        }
        resultados.push(hashtag.toLowerCase());
    }

    return resultados;
}

function copiarHashtags() {
    let hashtags = document.getElementById("hashtags").innerText;
    if (hashtags) navigator.clipboard.writeText(hashtags);
}