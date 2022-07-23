import React from 'react';
import classNames from "classnames";

interface BackgroundStatus {
    playing: boolean;
}

const Background: React.FC<BackgroundStatus> = ({ playing }: BackgroundStatus) => {
    return (
        <div className={classNames('kkcdplayer-background', playing ? 'playing' : '')}>
            <div className="kkcdplayer-background-wave1"  />
            <div className="kkcdplayer-background-wave2"  />
            <div className="kkcdplayer-background-wave3"  />
        </div>
    );
};

export default Background;