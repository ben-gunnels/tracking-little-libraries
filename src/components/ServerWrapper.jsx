import ListView from './ListView';
import MapView from './MapView';
import prisma from '../../lib/prisma';

export default async function ServerWrapper() {
  const libraries = await prisma.library.findMany();
  console.log(libraries);

  const geoJson = {
    type: 'FeatureCollection',
    features: libraries.map((lib) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lib.longitude, lib.latitude], // Note: GeoJSON uses [lng, lat]
      },
      properties: {
        id: lib.id,
      },
    })),
  };

  return (
    <>
      <ListView libraries={libraries} />
      <MapView libraries={geoJson} />
    </>
  );
}