function generateQR() {
  const qrinput = document.getElementById("input-fields").value;

  if (!qrinput.trim()) {
    alert("Please enter url or text");
    return;
  }

  document.getElementById("result").innerHTML = "";

  new QRCode(document.getElementById("result"), {
    text: qrinput,
    width: 300,
    height: 300,
  });
}

let map, marker, selectedLat, selectedLng;

function initMap() {
  map = L.map("map").setView([11.5564, 104.9282], 13); // default: Phnom Penh

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Click event
  map.on("click", function (e) {
    selectedLat = e.latlng.lat;
    selectedLng = e.latlng.lng;

    document.getElementById("lat").innerText = selectedLat;
    document.getElementById("lng").innerText = selectedLng;

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

// ----------------------
// Generate Email QR
// ----------------------
function generateEmailQR() {
  const address = document.getElementById("email-address").value.trim();
  const subject = document.getElementById("email-subject").value.trim();
  const body = document.getElementById("email-body").value.trim();

  if (!address) {
    alert("Please enter an email address.");
    return;
  }

  let mailURI = `mailto:${address}`;

  const query = [];

  if (subject) query.push(`subject=${encodeURIComponent(subject)}`);
  if (body) query.push(`body=${encodeURIComponent(body)}`);

  if (query.length > 0) {
    mailURI += `?${query.join("&")}`;
  }

  document.getElementById("result").innerHTML = "";
  new QRCode(document.getElementById("result"), mailURI);
}

// ----------------------
// Generate Phone QR
// ----------------------
function generatePhoneQR() {
  const phone = document.getElementById("phone-number").value.trim();

  if (!phone) {
    alert("Please enter a phone number.");
    return;
  }

  const telURI = `tel:${phone}`;

  document.getElementById("result").innerHTML = "";
  new QRCode(document.getElementById("result"), telURI);
}

// ----------------------
// Generate WiFi QR
// ----------------------
function generateWifiQR() {
  const ssid = document.getElementById("wifi-ssid").value.trim();
  const password = document.getElementById("wifi-password").value.trim();
  const auth = document.getElementById("wifi-auth").value;

  if (!ssid) {
    alert("Please enter WiFi SSID.");
    return;
  }

  const wifiString = `WIFI:T:${auth};S:${ssid};P:${password};${
    auth === "nopass" ? "H:false" : ""
  };`;

  document.getElementById("result").innerHTML = "";
  new QRCode(document.getElementById("result"), wifiString);
}
