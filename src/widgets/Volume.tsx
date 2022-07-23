import React, { useState } from 'react';
import VolumeIndicator from './VolumeIndicator';
import VolumeBtn from './VolumeBtn';

const Volume: React.FC = () => {
    const volumeStatus = ['none', 'low', 'middle', 'high'] as const;
    const [status, setStatus] = useState(0);

    return (
        <div>
            <VolumeBtn
                disabled={status === 0}
                usage="decrease"
                onClick={() => {
                    setStatus((index) => (index > 0 ? index - 1 : index));
                }}
            />
            <VolumeIndicator volume={volumeStatus[status]} />
            <VolumeBtn
                disabled={status === volumeStatus.length - 1}
                usage="increase"
                onClick={() => {
                    setStatus((index) => (index < volumeStatus.length - 1 ? index + 1 : index));
                }}
            />
        </div>
    );
};

export default Volume;
