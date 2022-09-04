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
      onComplete: (features: any) => resolve({ type: 'FeatureCollection', features }),
    })
  })
}
