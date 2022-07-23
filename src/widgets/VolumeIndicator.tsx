import React from 'react';
import classNames from 'classnames';

export interface VolumeIndicatorProps {
    volume: 'none' | 'low' | 'middle' | 'high';
}

const VolumeIndicator: React.FC<VolumeIndicatorProps> = ({ volume }: VolumeIndicatorProps) => {
    return <img className={classNames(`kkcdplayer-volumeindicator-${volume}`, 'kkcdplayer-block')}></img>;
};

export default VolumeIndicator;
