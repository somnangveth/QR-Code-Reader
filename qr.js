//Create QrCode
function createQR(data, width=290, height=290){
    if(!data || data.trim() === ""){
        alert("QR content cannot be empty!");
        return;
    }

    const result = document.getElementById('result');
    result.innerHTML = "";

    new QRCode(result, {
        text: data,
        width: width,
        height: height,
        correctLevel: QRCode.CorrectLevel.H
    });
}

//URL
function generateURLQR(){
    const qrinput = document.getElementById('input-field').value;

    if(!qrinput.trim()){
        alert("Input field cannot be empty!");
        return;
    }

    createQR(qrinput);
}

//Text
function generateTextQR(){
    const text = document.getElementById('text-field').value;

    if(!text){
        alert("Please input text!");
        return;
    }

    createQR(text);
}
//Location
let map, marker, selectedLat, selectedLng;

function initMap() {
    map = L.map('map').setView([11.5564, 104.9282], 13); // default: Phnom Penh

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Click event
    map.on('click', function(e) {
        selectedLat = e.latlng.lat;
        selectedLng = e.latlng.lng;

        document.getElementById('lat').innerText = selectedLat;
        document.getElementById('lng').innerText = selectedLng;

        // Move marker
        if (marker) marker.remove();

        marker = L.marker([selectedLat, selectedLng]).addTo(map);
    });
}

function generateLocationQR() {
    if (!selectedLat || !selectedLng) {
        alert("Please click on the map to choose a location.");
        return;
    }

    const geoURI = `geo:${selectedLat},${selectedLng}`;

    createQR(geoURI);
}

//Phone
async function fetchCountryCode(){
    const selectcode = document.getElementById('country-input');
    
    try{
        const res = await fetch('countries.json');
        const countries = await res.json();

        countries.forEach(c => {
            const option = document.createElement('option');
            option.value = c.dial_code;
            option.textContent = `${c.name} (${c.dial_code})`;
            selectcode.appendChild(option);
        });
    }catch (error){
        console.error("Failed to load country code", error);
    }
}

window.onload = fetchCountryCode();

function generatePhoneQR(){
    const phone = document.getElementById('input-phone').value.trim();
    const code = document.getElementById('country-input').value;

    if(!code || code === ""){
        alert("Please choose a country code");
        return;
    }

    if(!phone){
        alert("Please enter a phone number");
        return;
    }

    const fullNumber = code + phone;
    const phoneURI = `tel:${fullNumber}`;

    createQR(phoneURI);
}

//Email
function generateEmailQR(){
    const email = document.getElementById('email-input').value;
    const subject = document.getElementById('subject-input').value;
    const message = document.getElementById('message-input').value;

    if(!email || email.trim() === ""){
        alert("Email cannot be empty!");
        return;
    }

    const emailURI = `mailto:${email}?subject=${subject}&body=${message}`;

    createQR(emailURI);
}

//WiFi
function generateWifiQR(){
    const ssid = document.getElementById('wifi-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    const enc = document.getElementById('enc').value.trim();

    if(!ssid || !password || !enc){
        alert("Please fill all input");
        return;
    }

    const wifiURI = `WIFI:T:${enc};S:${ssid};P:${password};;`;

    createQR(wifiURI);
}

//Download
function downloadQR(){
    const qrContainer = document.getElementById('result');

    if(!qrContainer.firstChild){
        alert("Please generate a QR Code first!");
        return;
    }

    let qrElement = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");

    if(!qrElement){
        alert("QR code not found!");
        return;
    }

    let dataURL;

    if(qrElement.tagName === "IMG"){
        dataURL = qrElement.src;
    }

    else if(qrElement.tagName === "CANVAS"){
        dataURL = qrElement.toDataURL("image/png");
    }


    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "qr_code.png";
    link.click();
}

function downloadPNG() {
    let canvas = document.querySelector("#result canvas");
    if (!canvas) {
        alert("Please generate a QR code first.");
        return;
    }

    let link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function downloadSVG() {
    let svg = document.querySelector("#result svg");
    if (!svg) {
        alert("Please generate a QR code first.");
        return;
    }

    let serializer = new XMLSerializer();
    let svgBlob = new Blob([serializer.serializeToString(svg)], { type: "image/svg+xml" });
    let url = URL.createObjectURL(svgBlob);

    let link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    link.click();

    URL.revokeObjectURL(url);
}
