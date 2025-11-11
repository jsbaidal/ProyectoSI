import React from 'react';

interface WorkerMapProps {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

const WorkerMap: React.FC<WorkerMapProps> = ({ lat, lng, address, name }) => {
  // Usar Google Maps con coordenadas - funciona sin API key para visualización básica
  // Alternativa: usar OpenStreetMap o crear un mapa mockup visual
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h3 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📍</span>
        <span>Ubicación en el Mapa</span>
      </h3>
      <div
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid #e0e0e0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          backgroundColor: '#f5f5f5',
          position: 'relative'
        }}
      >
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title={`Mapa de ubicación de ${name}`}
        />
        {/* Overlay informativo para prototipo */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          📍 {lat.toFixed(4)}, {lng.toFixed(4)}
        </div>
      </div>
      <div style={{ marginTop: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#495057', fontWeight: '500' }}>
          📍 {address}
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#6c757d' }}>
          Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      </div>
      <div style={{ marginTop: '10px' }}>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🗺️ Obtener Direcciones
        </a>
      </div>
    </div>
  );
};

export default WorkerMap;

