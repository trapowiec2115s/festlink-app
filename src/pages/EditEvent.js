// src/pages/EditEvent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        name: '',
        type: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        days: 0,
        ticketLink: ''
    });

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            const ref = doc(db, 'events', id);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setEvent(snap.data());
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            return alert('Tylko administrator może edytować wydarzenia!');
        }

        try {
            const ref = doc(db, 'events', id);
            await updateDoc(ref, {
                name: event.name,
                type: event.type,
                location: event.location,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate),
                description: event.description,
                days: event.days,
                ticketLink: event.ticketLink
            });
            alert('Wydarzenie zostało zaktualizowane!');
            navigate(`/event/${id}`);
        } catch (error) {
            console.error('Błąd przy edytowaniu wydarzenia:', error);
        }
    };

    if (!isAdmin) {
        return <p>Nie masz uprawnień do edytowania wydarzenia.</p>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', background: '#f9f9f9', borderRadius: '10px' }}>
            <h2>Edytuj wydarzenie</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="name">Nazwa wydarzenia:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={event.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="type">Typ wydarzenia:</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={event.type}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="location">Lokalizacja:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="startDate">Data rozpoczęcia:</label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        name="startDate"
                        value={event.startDate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="endDate">Data zakończenia:</label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        name="endDate"
                        value={event.endDate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="description">Opis:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="days">Liczba dni:</label>
                    <input
                        type="number"
                        id="days"
                        name="days"
                        value={event.days}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="ticketLink">Link do biletów:</label>
                    <input
                        type="url"
                        id="ticketLink"
                        name="ticketLink"
                        value={event.ticketLink}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', marginTop: '10px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#28a745',
                        color: '#fff',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '16px',
                    }}
                >
                    Zaktualizuj wydarzenie
                </button>
            </form>
        </div>
    );
};

export default EditEvent;
