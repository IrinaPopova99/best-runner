import React from 'react';
import Buttons from './Buttons/Buttons';
import './Actions.scss';

export type ActionsType = {
    selected: string[];
    onDelete(): void;
    onAdd(): void;
    onEdit(): void;
}

const Actions: React.FC<ActionsType> = ({ selected, onDelete, onAdd, onEdit }) => (
    <div className="action">
        <Buttons selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
    </div>
)

export default Actions;
