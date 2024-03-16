var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let selectedPlace = undefined;
let btnSubmit = document.getElementById("btnSubmit");
let lat = document.getElementById("lat");
let lng = document.getElementById("lng");

btnSubmit.setAttribute("disabled", "disabled");

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
    selectedPlace = e.latlng;
    btnSubmit.removeAttribute("disabled");
    lat.value = selectedPlace.lat;
    lng.value = selectedPlace.lng;
}

map.on('click', onMapClick)

var marker = L.marker([51.5, -0.09]).addTo(map);
fetch("/api/notes")
.then(response => response.json())
.then(data => {
    data.map(note => {
        const marker = L.marker( [note.lat, note.lng]).addTo(map);
        marker.bindPopup(note.content);
        });
    });
    // const marker = L.marker([data[0].lat, data[0].lng]).addTo(map);
    // marker.bindPopup(data[0].content);
