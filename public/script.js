let map = L.map('map').setView([0, 0], 2);
let marker = null;
let chart = null;

// Load OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

async function trackSatellite() {
    const id = document.getElementById("satId").value;

    if (!id) {
        alert("Please enter a Satellite ID");
        return;
    }

    const response = await fetch(`/track/${id}`);
    const data = await response.json();

    if (data.error) {
        alert("Error fetching satellite data");
        return;
    }

    const { latitude, longitude, altitude, velocity } = data;

    // Update Map
    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`Lat: ${latitude}<br>Lon: ${longitude}`)
        .openPopup();

    map.setView([latitude, longitude], 4);

    // Update Chart
    const ctx = document.getElementById('satChart').getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Altitude (km)', 'Velocity (km/h)'],
            datasets: [{
                label: 'Satellite Data',
                data: [altitude, velocity],
                backgroundColor: ['blue', 'green']
            }]
        }
    });
}