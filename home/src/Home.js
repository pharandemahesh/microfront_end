import React from 'react';

const Data = () => {
    const sampleData = [
        { id: 1, name: 'System Logs', status: 'Active' },
        { id: 2, name: 'User Metrics', status: 'Pending' },
        { id: 3, name: 'Revenue Alpha', status: 'Stable' },
    ];

    return (
        <div style={{
            padding: '1rem',
            border: '2px solid #6c5ce7',
            borderRadius: '8px',
            margin: '1rem'
        }}>
            <h2 style={{ color: '#6c5ce7' }}>Home Remote (Port 3001)</h2>

        </div>
    );
};

export default Data;