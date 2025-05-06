import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const isAdmin = user && user.email === 'tom.zurawski@interia.pl';

    const [form, setForm] = useState({
        name: '',
        type: '',
        location: '',
        description: '',
        ticketLink: '',
        days: 1,
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAdmin) return alert('Tylko administrator może dodawać wydarzenia');

        try {
            await addDoc(collection(db, 'events'), {
                ...form,
                days: Number(form.days),
                startDate: Timestamp.fromDate(new Date(form.startDate)),
                endDate: Timestamp.fromDate(new Date(form.endDate)),
            });

            alert('Wydarzenie dodane!');
            navigate('/');
        } catch (err) {
            console.error('Błąd dodawania:', err);
            alert('Błąd przy dodawaniu wydarzenia');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h2>➕ Dodaj nowe wydarzenie</h2>
            {!isAdmin ? (
                <p style={{ color: 'red' }}>Tylko administrator może dodać wydarzenie.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Nazwa" required onChange={handleChange} style={input} />
                    <input name="type" placeholder="Typ (Festiwal / Koncert)" required onChange={handleChange} style={input} />
                    <input name="location" placeholder="Lokalizacja" required onChange={handleChange} style={input} />
                    <input name="ticketLink" placeholder="Link do biletów" onChange={handleChange} style={input} />
                    <input name="days" type="number" placeholder="Ile dni" min="1" required onChange={handleChange} style={input} />
                    <input name="startDate" type="datetime-local" required onChange={handleChange} style={input} />
                    <input name="endDate" type="datetime-local" required onChange={handleChange} style={input} />
                    <textarea name="description" placeholder="Opis wydarzenia" rows={4} onChange={handleChange} style={{ ...input, resize: 'vertical' }} />
                    <button type="submit" style={button}>Zapisz wydarzenie</button>
                </form>
            )}
        </div>
    );
};

const input = {
    display: 'block',
    width: '100%',
    margin: '10px 0',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const button = {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
};

export default AddEvent;
