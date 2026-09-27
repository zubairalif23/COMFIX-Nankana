import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default marker icons when using Vite/React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DEFAULT_ICON = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Nankana Sahib center
const NANKANA_SAHIB = [31.4504, 73.7065];

/*
  Convert the old x/y pin values used by ReportIssue into a real
  geographic position, and back. Keeps the rest of the app (which
  stores locations as x/y percentages) unchanged.
*/
function xyToLatLng(x, y) {
  const lat = 31.4504 + (45 - y) * 0.001;
  const lng = 73.7065 + (x - 55) * 0.001;
  return [lat, lng];
}

function latLngToXY(lat, lng) {
  const x = 55 + (lng - 73.7065) / 0.001;
  const y = 45 - (lat - 31.4504) / 0.001;
  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}

/*
  Plain Leaflet, managed entirely by hand (no react-leaflet).

  react-leaflet ties a Leaflet map's lifecycle to React's render
  cycle, and that combination is a well-known source of "Map
  container is already initialized" crashes when a component mounts,
  unmounts, and remounts quickly - exactly what happens when a user
  clicks between pages in a client-side router, especially on slower
  devices where the timing differs from a fast dev machine.

  Managing the map with plain refs and effects below means Leaflet's
  lifecycle is fully explicit: the map is created exactly once when
  this component mounts, and torn down exactly once when it unmounts,
  with nothing in between that could race.
*/
export default function MapPreview({
  interactive = false,
  onPick = () => {},
  pinX = 55,
  pinY = 45,
  label = 'Tap anywhere on the map to place the issue pin',
}) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  const [coords, setCoords] = useState(xyToLatLng(pinX, pinY));

  // Create the map once, and always tear it down completely on unmount.
  useEffect(() => {
    const el = elRef.current;
    if (!el) return undefined;

    // Defensive: if a previous Leaflet instance ever left its id on
    // this node (shouldn't happen with the cleanup below, but this
    // makes it impossible for a stale id to ever block a new map).
    if (el._leaflet_id) {
      delete el._leaflet_id;
    }

    const map = L.map(el, {
      center: NANKANA_SAHIB,
      zoom: 14,
      scrollWheelZoom: true,
      dragging: true,
      doubleClickZoom: true,
      touchZoom: true,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    if (interactive) {
      const marker = L.marker(xyToLatLng(pinX, pinY), {
        draggable: true,
        icon: DEFAULT_ICON,
      }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', () => {
        const { lat, lng } = marker.getLatLng();
        setCoords([lat, lng]);
        const pos = latLngToXY(lat, lng);
        onPickRef.current(pos.x, pos.y);
      });

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCoords([lat, lng]);
        const pos = latLngToXY(lat, lng);
        onPickRef.current(pos.x, pos.y);
      });
    } else {
      L.marker(NANKANA_SAHIB, { icon: DEFAULT_ICON }).addTo(map);
    }

    // Leaflet sometimes measures its container before layout has
    // fully settled (common right after a route change), which can
    // leave the map looking broken/grey. This forces a recalculation
    // once the container has its real size.
    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 100);

    return () => {
      window.clearTimeout(resizeTimer);
      map.off();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
      if (el._leaflet_id) {
        delete el._leaflet_id;
      }
    };
    // Intentionally empty: this effect owns the full map lifecycle
    // and should run exactly once per mount, not on every prop change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the parent changes pinX/pinY after the map exists (e.g. form
  // reset), move the marker without recreating the map.
  useEffect(() => {
    if (!interactive) return;
    const next = xyToLatLng(pinX, pinY);
    setCoords(next);
    if (markerRef.current) {
      markerRef.current.setLatLng(next);
    }
    if (mapRef.current) {
      mapRef.current.panTo(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinX, pinY]);

  return (
    <div className="overflow-hidden rounded-lg border border-ink/15 bg-white">
      <div className="relative">
        <div ref={elRef} className="h-[380px] w-full" />

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
            <p className="text-xs font-semibold text-ink">Nankana Sahib</p>
            <p className="text-[11px] text-ink/50">Click the map or drag the pin</p>
          </div>

          <div className="text-right text-[10px] text-ink/40">
            <p>
              {coords[0].toFixed(5)}, {coords[1].toFixed(5)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
