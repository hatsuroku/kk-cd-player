import React from 'react';
import classNames from 'classnames';
import { ReactComponent as VolumeIcon } from '@img/title/volume_indicator.svg';

export interface VolumeIndicatorProps {
    volume: 'none' | 'low' | 'middle' | 'high';
}

const VolumeIndicator: React.FC<VolumeIndicatorProps> = ({ volume }: VolumeIndicatorProps) => {
    return <VolumeIcon className={classNames('kkcdplayer-volumeindicator', `volumestatus-${volume}`)} />;
};

export default VolumeIndicator;
