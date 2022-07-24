import React, { useState } from 'react';
import classNames from 'classnames';

import '@styles/App.scss';

import Background from '@/components/Background';
import Title from '@/components/Title';
import Cursor from '@/widgets/Cursor';

function App() {
    return (
        <div>
            <Background playing={true} />
            <Title />
            <Cursor />
        </div>
    );
}

export default App;
