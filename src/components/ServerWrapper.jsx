import ListView from './ListView';
import MapView from './MapView';
import prisma from '../../lib/prisma';

import styles from './ServerWrapper.module.css';

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
    <div className={`${styles.wrapperOuterBox} border-8 border-black rounded-lg outline-2 w-full max-w-7xl flex flex-row h-full`}>
        <ListView libraries={libraries} />
        <MapView libraries={geoJson} />
    </div>
  );
}