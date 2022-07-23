import React from 'react';
import '@styles/app.scss';

import Background from "@/components/Background";
import Volume from '@/widgets/Volume';
import Cursor from "@/widgets/cursor";

function App() {
    return (
        <>
            <Background playing={true} />
            <Cursor byScript={false} positionX={0} positionY={0} />
            <Volume />
        </>
    );
}

export default App;
