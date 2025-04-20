import ListView from './ListView';
import MapView from './MapView';
import prisma from '../../lib/prisma';

// For ensuring that data is fetched per request
export const dynamic = 'force-dynamic';

export default async function ServerWrapper() {
  const libraries = await prisma.library.findMany();

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
        name: lib.name
      },
    })),
  };

  return (
    <div>
        <MapView libraries={geoJson} />
        <ListView libraries={libraries} />
    </div>
  );
}