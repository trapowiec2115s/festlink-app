// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // ← Po zalogowaniu przekieruj na stronę główną
        } catch (err) {
            setError("Błędny email lub hasło.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 320, margin: '2rem auto' }}>
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '.5rem', margin: '.5rem 0' }}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '.5rem', margin: '.5rem 0' }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading} style={{ padding: '.5rem 1rem' }}>
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                </button>
            </form>
        </div>
    );
};

export default Login;
