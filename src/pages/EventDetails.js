// src/pages/EventDetails.js
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            const ref = doc(db, 'events', id);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setEvent({ id: snap.id, ...snap.data() });
            }
        };

        const checkAdminRole = async () => {
            const user = auth.currentUser;
            if (user) {
                // Sprawdzamy, czy email użytkownika to Twój (admin)
                if (user.email === 'tom.zurawski@interia.pl') {
                    setIsAdmin(true);  // Użytkownik jest adminem
                }
            }
        };

        fetchEvent();
        checkAdminRole();  // Sprawdzamy rolę użytkownika po załadowaniu wydarzenia
    }, [id]);

    const handleDeleteEvent = async () => {
        const user = auth.currentUser;
        if (!user || !isAdmin) return alert('Tylko admin może usunąć wydarzenie!');
        try {
            const ref = doc(db, 'events', event.id);
            await deleteDoc(ref);
            alert('Wydarzenie zostało usunięte!');
        } catch (error) {
            console.error('Błąd przy usuwaniu:', error);
        }
    };

    if (!event) return <p>Ładowanie szczegółów wydarzenia...</p>;

    const formatDate = (ts) => new Date(ts.seconds * 1000).toLocaleString();

    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', background: '#f9f9f9', borderRadius: '10px' }}>
            <h2>{event.name}</h2>
            <p><strong>📍 Lokalizacja:</strong> {event.location}</p>
            <p><strong>🎤 Typ:</strong> {event.type}</p>
            <p><strong>🕓 Start:</strong> {formatDate(event.startDate)}</p>
            <p><strong>🛑 Koniec:</strong> {formatDate(event.endDate)}</p>
            <p><strong>🧮 Dni:</strong> {event.days}</p>
            <p><strong>⏳ Odliczanie:</strong> {event.startDate.seconds <= Date.now() / 1000 ? '🎉 Wydarzenie się odbyło' : 'Wydarzenie nadchodzi'}</p>
            <p><strong>📝 Opis:</strong> {event.description}</p>

            {/* Przycisk edytowania wydarzenia (widoczny tylko dla admina) */}
            {isAdmin && (
                <button
                    onClick={() => navigate(`/edytuj/${event.id}`)}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    ✏️ Edytuj wydarzenie
                </button>
            )}

            <div style={{ marginTop: '20px' }}>
                {isAdmin && (
                    <button
                        onClick={handleDeleteEvent}
                        style={{
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        🗑️ Usuń wydarzenie
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
