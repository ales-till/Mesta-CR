# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa měst České republiky postavená na knihovně [Leaflet](https://leafletjs.com/). Data bodů jsou uložena v souboru GeoJSON.

## Struktura projektu

| Soubor         | Popis                                                        |
|----------------|--------------------------------------------------------------|
| `index.html`   | Hlavní stránka, načítá Leaflet, styly a skript               |
| `map.js`       | Inicializace mapy a načtení dat z GeoJSONu                   |
| `styl.css`     | Vzhled stránky a mapy                                        |
| `body.geojson` | Data měst (body) s atributy `id`, `nazev`, `popisek`         |
| `README.md`    | Tento soubor                                                 |

## Spuštění

Data se načítají pomocí `fetch()`, který **nefunguje při otevření souboru přímo (`file://`)**. Je potřeba spustit lokální webový server ve složce projektu, například:

```bash
# Python 3
python -m http.server 8000
```

Poté otevřete v prohlížeči <http://localhost:8000>.

Alternativně lze použít např. rozšíření *Live Server* ve VS Code nebo `npx serve`.

## Přidání dalšího města

Do pole `features` v souboru `body.geojson` přidejte nový objekt:

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město ČR."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

**Pozor:** v GeoJSONu je pořadí souřadnic `[délka (lon), šířka (lat)]`, tedy opačně než v Leafletu (`[lat, lon]`).

Mapa se po načtení automaticky přiblíží tak, aby byly vidět všechny body.

## Použité technologie

- [Leaflet 1.9.4](https://leafletjs.com/)
- Podkladová mapa © [OpenStreetMap](https://www.openstreetmap.org/copyright) přispěvatelé
