// import React from 'react';
import { GoogleMap, MarkerF, CircleF } from '@react-google-maps/api';


const Map = ({ mapData }) => {
    const center = {
        lat: mapData.latitude,
        lng: mapData.longitude,
    };

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const circleOptions = {
        strokeColor: '#000',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#000',
        fillOpacity: 0.2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 10 * 1609.344, // in meters convert into miles (meter * 1609.344)
        zIndex: 1,
    };

    return (
        <GoogleMap
            center={center}
            mapContainerStyle={mapStyles}
            zoom={10}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            }}>
            <MarkerF position={center} />
            <CircleF center={center} options={circleOptions} />
        </GoogleMap>
    )
}
export default Map;