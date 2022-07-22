import React from 'react';
import '@styles/app.scss';
const waveArr = ["wave1", "wave2", "wave3"];
const waves = waveArr.map(item => require(`@assets/waves/${item}.svg`));

function App() {
    return (
        <div id="content">
            <div id="pointer" />
        </div>
    );
}

export default App;
