import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <nav
            style={{
                padding: '10px 20px',
                background: '#1e1e1e',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div>
                <Link to="/" style={linkStyle}>Strona Główna</Link>
                {user && (
                    <>
                        <Link to="/profil" style={linkStyle}>Mój Profil</Link>
                        <Link to="/dodaj" style={linkStyle}>Dodaj Wydarzenie</Link>
                        {/* Jeśli użytkownik jest adminem, pokaż przycisk usuwania */}
                        {user && user.email === 'twój_email@example.com' && (
                            <Link to="/admin" style={linkStyle}>Panel Admina</Link>
                        )}
                    </>
                )}
            </div>

            <div>
                {!user ? (
                    <>
                        <Link to="/login" style={linkStyle}>Zaloguj się</Link>
                        <Link to="/register" style={linkStyle}>Rejestracja</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={buttonStyle}>Wyloguj się</button>
                )}
            </div>
        </nav>
    );
};

const linkStyle = {
    marginRight: '20px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const buttonStyle = {
    background: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
};

export default Navbar;
