import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/Image';
import ReactMapGl, { Marker } from 'react-map-gl';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';
import styles from '@/styles/eventMap.module.css';

const EventMap = ({ evt }) => {
  const mapContainerRef = useRef(null);
  const [lat, setLat] = useState(40.712772);
  const [lng, setLng] = useState(-73.935242);
  const [zoom, setZoom] = useState(9);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  console.log('evt ', evt);
  useEffect(() => {
    // Get latitude & longitude from address.
    // Geocode.fromAddress(evt?.address).then((response) => {
    //   const { lat, lng } = response.results[0].geometry.location;
    //   console.log('---->', lat, lng);
    //   setLat(lat);
    //   setLng(lng);
    //   setViewport({ ...viewport, latitude: lat, longitude: lng });
    // });
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      accessToken:
        'pk.eyJ1IjoibmF2ZWVuLXMiLCJhIjoiY2wzc3JrY3FoMDFxZzNpcXFuczg0bnRodSJ9.esScsBwuxtfx5Iwn3jfhjw',
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);

  console.log('API_KEY ', process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  // {...viewport}
  return (
    <div>
      <div
      // className={styles.sidebarStyle}
      >
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div
        // className={styles.mapContainer}
        ref={mapContainerRef}
        style={{
          border: '1px solid #000000',
          height: '500px',
          width: '500px',
        }}>
        <Image
          src='/images/pin.svg'
          width={30}
          height={30}
          style={{
            zIndex: '1000',
            // left: '240px !important',
            // top: '240px !important',
          }}
          className={styles.pointerOnMap}
        />
      </div>
    </div>
  );
};

export default EventMap;
