import React from 'react';
import MyButton from '../../../../shared/components/MyButton/MyButton';
import { ActionsType } from '../Actions';

const Buttons: React.FC<ActionsType> = ({ selected, onDelete, onAdd, onEdit }) => {
    const isDisabled = selected.length === 0 ? true : false;

    return (
        <div>
            <MyButton
                action={onAdd}
                isDisabled={false}
            >
                Добавить
            </MyButton>
            <MyButton
                action={onDelete}
                isDisabled={isDisabled}
                color="secondary"
            >
                Удалить
            </MyButton>
            <MyButton
                action={onEdit}
                isDisabled={isDisabled}
                color="primary"
            >
                Изменить
            </MyButton>
        </div>
    )
}

export default Buttons;
