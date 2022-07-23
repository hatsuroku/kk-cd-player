import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

interface VolumeBtnProps {
    disabled: boolean;
    usage: 'increase' | 'decrease';
    onClick?: MouseEventHandler;
}

const VolumeBtn: React.FC<VolumeBtnProps> = ({ usage, disabled, onClick }: VolumeBtnProps) => {
    return (
        <img
            className={classNames(`kkcdplayer-volumeindicator-${usage}-${disabled ? 'disabled' : 'normal'}`)}
            onClick={onClick}
        ></img>
    );
};

export default VolumeBtn;
