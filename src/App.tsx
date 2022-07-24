import React from 'react';
import '@styles/app.scss';

import Background from '@/components/Background';
import Title from '@/components/title';
import Cursor from '@/widgets/Cursor';

function App() {
    return (
        <div onContextMenu={ e => e.preventDefault() }>
            <Background playing={true} />
            <Cursor byScript={false} positionX={0} positionY={0} />
            <Title />
        </div>
    );
}

export default App;
