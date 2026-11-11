// Inicializace mapy - výchozí pohled na střed ČR
var mapa = L.map('mapa').setView([49.8, 15.5], 7);

// Podkladová dlaždicová vrstva (OpenStreetMap)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> přispěvatelé'
}).addTo(mapa);

// Pomocná funkce: ochrana proti vložení HTML z dat
function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Načtení měst z GeoJSONu
// Pozn.: fetch() nefunguje při otevření přes file://, je nutný lokální server (viz README.md)
fetch('body.geojson')
  .then(function (odpoved) {
    if (!odpoved.ok) {
      throw new Error('HTTP ' + odpoved.status);
    }
    return odpoved.json();
  })
  .then(function (data) {
    var vrstva = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        var p = feature.properties;
        layer.bindPopup(
          '<h3 class="popup-nazev">' + escapeHtml(p.nazev) + '</h3>' +
          '<p class="popup-popisek">' + escapeHtml(p.popisek) + '</p>'
        );
        layer.bindTooltip(p.nazev);
      }
    }).addTo(mapa);

    // Přiblížení mapy tak, aby byly vidět všechny body
    mapa.fitBounds(vrstva.getBounds(), { padding: [50, 50] });
  })
  .catch(function (chyba) {
    console.error('Nepodařilo se načíst body.geojson:', chyba);
    alert('Nepodařilo se načíst data (body.geojson). Spusťte projekt přes lokální webový server, viz README.md.');
  });
