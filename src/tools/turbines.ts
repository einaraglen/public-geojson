import { reader } from './reader'

export const convert = (position: string) => {
  if (!position) return 0
  const [degree, minutes, secounds] = position.replace(/[^0-9.,-]/g, ' ').split('  ')
  const factor = position.includes('W') || position.includes('S') ? -1 : 1
  return (parseFloat(degree) + parseFloat(minutes) / 60 + parseFloat(secounds) / 3600) * factor
}

export const turbines = () => {
  return new Promise((resolve) => {
    reader({
      file: 'turbines.csv',
      onLine(data: any) {
        if (!data.lat || !data.lon) return null
        const latitude = convert(data.lat)
        const longitude = convert(data.lon)
        return { type: 'Feature', properties: { ...data }, geometry: { type: 'Point', coordinates: [longitude, latitude] } }
      },
      onComplete: (features: any) => resolve({ type: 'FeatureCollection', features: features.filter((f: any) => f) }),
    })
  })
}
