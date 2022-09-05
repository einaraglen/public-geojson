import { reader } from './reader'

const getProperties = (data: any) => {
  delete data.WKTFormat
  return { ...data }
}

export const pipelines = () => {
  return new Promise((resolve) => {
    reader({
      file: 'pipelines.csv',
      onLine(data: any) {
        const coords: string = data.WKTFormat
        if (coords.includes('MULTILINESTRING')) {
          const string = coords.replace('MULTILINESTRING', '')
          const split = string.replace(/\(/g, '').split('), ')
          const points = split.map((current: string) => {
            const split = current.replace(/\)/g, '').split(', ')
            return split.map((current: string) => {
              const [latitude, longitude] = current.split(' ')
              return [parseFloat(latitude), parseFloat(longitude)]
            })
          })
          return { type: 'Feature', properties: { ...getProperties(data) }, geometry: { type: 'MultiLineString', coordinates: points } }
        } else {
          const string = coords.replace('LINESTRING', '')
          const split = string.replace(/\(/g, '').replace(/\)/g, '').replace(/, /g, ',').split(',')
          const points = split.map((current: string) => {
            const [latitude, longitude] = current.split(' ')
            return [parseFloat(latitude), parseFloat(longitude)]
          })
          return { type: 'Feature', properties: { ...getProperties(data) }, geometry: { type: 'LineString', coordinates: points } }
        }
      },
      onComplete: (features: any) => {
        const offshore = features.filter((item: any) => {
          const properties = item.properties
          const key = properties["StartState/Province"] + properties["EndState/Province"] + properties["OtherNames"] + properties["StartCountry"] + properties["EndCountry"];
          if (typeof key !== "string") return false;
          const lower = key.toLowerCase();
          return lower.includes("sea") || lower.includes("offshore") || lower.includes("norway") || lower.includes("norwegian");
        });
        resolve({ type: 'FeatureCollection', features: offshore })
      } ,
    })
  })
}
