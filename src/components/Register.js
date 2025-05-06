// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // używamy tego samego jak w Login.js
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('✅ Konto zostało utworzone!');
            setTimeout(() => navigate('/'), 1000); // automatyczne przejście po 1s
        } catch (error) {
            setMessage('❌ Błąd: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 320, margin: '2rem auto' }}>
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '.5rem', margin: '.5rem 0' }}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '.5rem', margin: '.5rem 0' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '.5rem 1rem' }}>
                    {loading ? 'Rejestracja...' : 'Zarejestruj się'}
                </button>
            </form>
            {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        </div>
    );
};

export default Register;
