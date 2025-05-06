// src/pages/Home.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(data);
      } catch (error) {
        console.error('Błąd przy pobieraniu wydarzeń:', error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter(event =>
      event.name?.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter ? event.type === typeFilter : true) &&
      (locationFilter ? event.location === locationFilter : true)
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // sortowanie po dacie

  const uniqueTypes = [...new Set(events.map(e => e.type))];
  const uniqueLocations = [...new Set(events.map(e => e.location))];

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎶 Festiwale i Koncerty</h2>

      <input
        type="text"
        placeholder="Szukaj po nazwie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', width: '100%', maxWidth: '400px', marginBottom: '10px' }}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Wszystkie typy</option>
          {uniqueTypes.map(type => <option key={type}>{type}</option>)}
        </select>

        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">Wszystkie lokalizacje</option>
          {uniqueLocations.map(loc => <option key={loc}>{loc}</option>)}
        </select>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {filteredEvents.length === 0 ? (
          <p>Brak dopasowanych wydarzeń.</p>
        ) : (
          filteredEvents.map(event => (
            <div
              key={event.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <Link to={`/event/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                  src={event.imageUrl || 'https://via.placeholder.com/300x180?text=Brak+plakatu'}
                  alt={event.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '10px' }}>
                  <h3 style={{ margin: '0 0 5px' }}>{event.name}</h3>
                  <p style={{ margin: 0 }}>{event.type} – {event.location}</p>
                  <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#555' }}>
                    {new Date(event.startDate?.seconds * 1000).toLocaleDateString()} – {new Date(event.endDate?.seconds * 1000).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
