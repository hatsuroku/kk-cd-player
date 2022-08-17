import React, {useEffect, useState} from 'react';
import VolumeIndicator from './VolumeIndicator';
import VolumeBtn from './VolumeBtn';

const Volume: React.FC = () => {
    const volumeStatus = ['none', 'low', 'middle', 'high'] as const;
    const [status, setStatus] = useState(2);

    useEffect(() => {
        const volumeIndex = localStorage.getItem('volume');
        if (volumeIndex) { setStatus(Number(volumeIndex)) }
    }, [])

    return (
        <div className='kkcdplayer-volume'>
            <VolumeBtn
                disabled={status === 0}
                usage="decrease"
                onClick={() => {
                    setStatus(index => {
                        const newIndex = index > 0 ? index - 1 : index
                        localStorage.setItem('volume', String(newIndex))
                        return newIndex
                    });
                }}
            />
            <VolumeIndicator volume={volumeStatus[status]} />
            <VolumeBtn
                disabled={status === volumeStatus.length - 1}
                usage="increase"
                onClick={() => {
                    setStatus(index => {
                        const newIndex = index < volumeStatus.length - 1 ? index + 1 : index
                        localStorage.setItem('volume', String(newIndex))
                        return newIndex
                    });
                }}
            />
        </div>
    );
};

export default Volume;
