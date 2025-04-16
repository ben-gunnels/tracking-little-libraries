"use client"

import styles from "./MapView.module.css";

import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapView() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZ3VubmVsczgiLCJhIjoiY205ajA1d29kMDdzMTJscHZtaDk4Y3BjdCJ9.2ByOYNWjFKhVq0BMjZbaPQ'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])
  return (
    <div id={styles.mapContainer} className="bg-gray-200 h-full w-full rounded-md" ref={mapContainerRef}/>
  )
}