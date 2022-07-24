import React, { useState } from 'react';
import classNames from 'classnames';

import '@styles/app.scss';

import Background from '@/components/Background';
import Title from '@/components/title';

function App() {
    const [mouseDown, setMouseDown] = useState(false);

    return (
        <div
            className={classNames('kkcdplayer-top-container', {
                'cursor-down': mouseDown,
            })}
            onMouseDown={(e) => {
                // 0 鼠标左键
                if (e.button === 0) {
                    setMouseDown(true);
                }
            }}
            onMouseUp={() => setMouseDown(false)}
        >
            <Background playing={true} />
            <Title />
        </div>
    );
}

export default App;
