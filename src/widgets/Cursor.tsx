import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

interface CursorImgProps {
    position: {
        x: number;
        y: number;
    };
    poke: boolean;
}

const CursorImg: FC<CursorImgProps> = ({ position, poke }: CursorImgProps) => {
    return (
        <ins
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                // left: position.x,
                // top: position.y,
            }}
            className={classNames('kkcdplayer-cursor', {
                poke: poke,
            })}
        />
    );
};

const Cursor = () => {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [poke, setPoke] = useState(false);

    const onMouseDown = () => {
        setPoke(true);
    };
    const onMouseUp = () => {
        setPoke(false);
    };
    const onMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX - 10, y: e.clientY - 10 });
    };

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return <CursorImg position={position} poke={poke}></CursorImg>;
};

export default Cursor;
