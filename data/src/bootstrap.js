import { createRoot } from 'react-dom/client';
import Data from './Data';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<Data />);
}