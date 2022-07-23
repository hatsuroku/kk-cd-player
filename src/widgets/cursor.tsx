import React, {MouseEventHandler} from 'react';
import classNames from "classnames";

interface CursorPosition {
    byScript: boolean;
    positionX: number;
    positionY: number;
    onClick?: MouseEventHandler;
}

const Cursor: React.FC<CursorPosition> = ({ byScript, positionX, positionY, onClick }: CursorPosition) => {
    return (
        <div className={classNames('kkcdplayer-cursor','kkcdplayer-cursor-normal')} />
    );
};

export default Cursor;