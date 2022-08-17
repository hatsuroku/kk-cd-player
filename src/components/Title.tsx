import React from 'react';
import Volume from '@/widgets/Volume';

const Title: React.FC = () => {
    const songTitle = ''

    return (
        <div className="kkcdplayer-title">
            { songTitle.length }
            <Volume />
        </div>
    );
};

export default Title;
