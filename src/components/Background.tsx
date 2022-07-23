import React from 'react';
const waveArr = ["wave1", "wave2", "wave3"];
const waves = waveArr.map(item => require(`@assets/img/waves/${item}.svg`));

const Background: React.FC = () => {
    return (
        <div className="kkcdplayer-background">

        </div>
    );
};

export default Background;