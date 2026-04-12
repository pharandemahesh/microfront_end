import { useSharedStore } from "state/store";

const Data = () => {
    const { user, theme } = useSharedStore();
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
            <h2 style={{ color: '#6c5ce7' }}>Data Remote (Port 3002)</h2>
            <p>Theme: {theme}</p>
            <button onClick={() => useSharedStore.setState({ theme: theme === 'light' ? 'dark' : 'light' })}>Toggle Theme</button>
        </div>
    );
};

export default Data;