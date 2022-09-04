import { reader } from './reader'

export const normal = (file: string) => {
  return new Promise((resolve) => {
    reader({
      file,
      onLine(data: any) {
        const latitude = parseFloat(data.Latitude)
        const longitude = parseFloat(data.Longitude)
        return { type: 'Feature', properties: { ...data }, geometry: { type: 'Point', coordinates: [longitude, latitude] } }
      },
      onComplete: (features: any) => resolve({ type: 'FeatureCollection', features }),
    })
  })
}
