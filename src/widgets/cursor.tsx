import React, { FC, useRef,useState, useEffect } from 'react';
import classNames from "classnames";

interface CursorPosition {
    byScript: boolean;
    positionX: number;
    positionY: number;
}

const Cursor: FC<CursorPosition> = ({ byScript, positionX, positionY }: CursorPosition) => {
    const cursor = useRef<HTMLInputElement>(null);
    const [onPoke, setOnPoke] = useState(false);

    function handleMouseMove(e: any) {
        requestAnimationFrame(() => {
            if (cursor.current) cursor.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`
        })
    }
    function handleMouseDown(e: any) {
        if (cursor.current && e.button == 0) setOnPoke(true);
    }
    function handleMouseUp(e: any) {
        if (cursor.current && e.button == 0) setOnPoke(false);
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [])

    return (
        <div className={ classNames('kkcdplayer-cursor', onPoke ? 'kkcdplayer-cursor-poke' : '') }
             ref={ cursor }/>
    );
};

export default Cursor;