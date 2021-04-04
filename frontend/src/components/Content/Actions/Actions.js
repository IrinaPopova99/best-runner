import React from 'react';
import Buttons from './Buttons/Buttons';
import './Actions.scss';

const Actions = ({ selected, onDelete, onAdd, onEdit }) => (
    <div className="action">
        <Buttons selected={selected} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
    </div>
)

export default Actions;
