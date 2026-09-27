import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icons when using Vite/React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Nankana Sahib center
const NANKANA_SAHIB = [31.4504, 73.7065];

/*
  Convert the old x/y pin values used by your ReportIssue page
  into a real geographic position.

  This keeps your existing ReportIssue.jsx compatible.
*/
function xyToLatLng(x, y) {
  const lat = 31.4504 + (45 - y) * 0.001;
  const lng = 73.7065 + (x - 55) * 0.001;

  return [lat, lng];
}

/*
  Convert a real map position back into the x/y format
  expected by your existing ReportIssue.jsx.
*/
function latLngToXY(lat, lng) {
  const x = 55 + (lng - 73.7065) / 0.001;
  const y = 45 - (lat - 31.4504) / 0.001;

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}

/*
  Handles clicking anywhere on the map.
*/
function MapClickHandler({ onPick }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      const position = latLngToXY(lat, lng);

      onPick(position.x, position.y);
    },
  });

  return null;
}

/*
  Updates the map marker when the parent changes the pin.
*/
function MapMarker({
  position,
  setPosition,
  onPick,
}) {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;

      if (!marker) return;

      const { lat, lng } = marker.getLatLng();

      const position = latLngToXY(lat, lng);

      setPosition([lat, lng]);
      onPick(position.x, position.y);
    },
  };

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  );
}

export default function MapPreview({
  interactive = false,
  onPick = () => {},
  pinX = 55,
  pinY = 45,
  label = 'Tap anywhere on the map to place the issue pin',
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const [position, setPosition] = useState(
    xyToLatLng(pinX, pinY)
  );

  /*
    Keep marker synchronized if the parent changes pinX/pinY.
  */
  useEffect(() => {
    setPosition(xyToLatLng(pinX, pinY));
  }, [pinX, pinY]);

  /*
    Safety net for Leaflet's "Map container is already initialized"
    error. This throws (and, with no error boundary, blanks the whole
    app) if a map is ever created on a DOM node that still carries a
    previous Leaflet instance's internal id — something that can
    happen on route transitions, especially on slower devices.
    Explicitly clearing it on unmount guarantees a clean slate.
  */
  useEffect(() => {
    return () => {
      mapRef.current = null;
      const node = containerRef.current;
      if (node && node._leaflet_id) {
        delete node._leaflet_id;
      }
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-ink/15 bg-white">
      <div className="relative">
        <MapContainer
          ref={(instance) => {
            mapRef.current = instance;
            containerRef.current = instance ? instance.getContainer() : null;
          }}
          center={NANKANA_SAHIB}
          zoom={14}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          touchZoom={true}
          className="h-[380px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {interactive && (
            <>
              <MapClickHandler onPick={onPick} />

              <MapMarker
                position={position}
                setPosition={setPosition}
                onPick={onPick}
              />
            </>
          )}
        </MapContainer>

        {interactive && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-[1000] -translate-x-1/2">
            <div className="rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-ink shadow-md">
              📍 {label}
            </div>
          </div>
        )}
      </div>

      {interactive && (
        <div className="flex items-center justify-between border-t border-ink/10 bg-paper px-3 py-2">
          <div>
            <p className="text-xs font-semibold text-ink">
              Nankana Sahib
            </p>

            <p className="text-[11px] text-ink/50">
              Click the map or drag the pin
            </p>
          </div>

          <div className="text-right text-[10px] text-ink/40">
            <p>
              {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}