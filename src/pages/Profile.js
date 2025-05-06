// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
        setUser(currentUser);
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);  // Ustawienie użytkownika na null po wylogowaniu
        } catch (error) {
            console.error('Błąd przy wylogowaniu', error);
        }
    };

    return (
        <div
            style={{
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto',
                background: '#f9f9f9',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    paddingBottom: '1rem',
                }}
            >
                <h2 style={{ color: '#4CAF50' }}>Mój profil</h2>
                {user ? (
                    <div>
                        <p style={{ fontSize: '18px', color: '#555' }}>Jesteś zalogowany jako: {user.email}</p>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '100%',
                                fontSize: '16px',
                                marginTop: '20px',
                            }}
                        >
                            Wyloguj się
                        </button>
                    </div>
                ) : (
                    <p style={{ fontSize: '18px', color: '#333' }}>Musisz być zalogowany, aby zobaczyć swój profil!</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
