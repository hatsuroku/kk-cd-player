import React from 'react';
import '@styles/app.scss';

import Background from "@/components/Background";
import Volume from '@/widgets/Volume';

function App() {
    return (
        <>
            <Background playing={true} />
            <Volume />
        </>
    );
}

export default App;
