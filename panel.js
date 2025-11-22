function showPanel(panel){
    const scanPanel = document.getElementById("scan-qr");
    const genPanel = document.getElementById("gen-qr");

    if(panel === "scan"){
        scanPanel.classList.remove('hidden');
        genPanel.classList.add('hidden');
    }
    else if(panel === "generate"){
        scanPanel.classList.add('hidden');
        genPanel.classList.remove('hidden');
    }
}

function radioPanel(type){
    document.getElementById('panel-link').classList.add('hidden');
    document.getElementById('panel-text').classList.add('hidden');
    document.getElementById('panel-location').classList.add('hidden');
    document.getElementById('panel-email').classList.add('hidden');
    document.getElementById('panel-phone').classList.add('hidden');
    document.getElementById('panel-wifi').classList.add('hidden');
    document.getElementById('result').innerHTML="";
    if(document.getElementById(`panel-${type}`).classList.remove('hidden'));
    if (type === "location") {
        setTimeout(() => {
            initMap();
        }, 100);
    }
}