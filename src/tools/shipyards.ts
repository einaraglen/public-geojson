import fs from "fs"

type Marker = {
    rt: string
    lat: number
    lng: number
}

export const shipyards = () => {
    try {
        const json = fs.readFileSync("./assets/json/shipyards.json")
        const data = JSON.parse(json.toString())
        const collection = data.markers.map((marker: Marker) => {
            return { type: 'Feature', properties: { title: marker.rt }, geometry: { type: 'Point', coordinates: [marker.lng, marker.lat] } }
        })
        const geojson = { type: 'FeatureCollection', features: collection }
        fs.writeFileSync("./assets/json/shipyards2.json", JSON.stringify(geojson))
    } catch (e) {
        console.log(e)
    }
  }