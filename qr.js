function generateQR(){
    const qrinput = document.getElementById("input-fields").value;

    if(!qrinput.trim()){
        alert("Please enter url or text");
        return;
    }

    document.getElementById("result").innerHTML="";

    new QRCode(document.getElementById("result"), {
        text : qrinput,
        width: 300,
        height: 300,
    });
}


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

    document.getElementById("result").innerHTML = ""; 

    new QRCode(document.getElementById("result"), geoURI);
}
