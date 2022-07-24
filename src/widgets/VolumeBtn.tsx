import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import { ReactComponent as IncIcon } from '@img/title/increase.svg';
import { ReactComponent as DecIcon } from '@img/title/decrease.svg';

interface VolumeBtnProps {
    disabled: boolean;
    usage: 'increase' | 'decrease';
    onClick?: MouseEventHandler;
}

const VolumeBtn: React.FC<VolumeBtnProps> = ({ usage, disabled, onClick }: VolumeBtnProps) => {
    const Icon = usage === 'increase' ? IncIcon : DecIcon;

    return <Icon className={classNames('kkcdplayer-volumebtn', disabled ? 'disabled' : 'normal')} onClick={onClick}></Icon>;
};

export default VolumeBtn;
