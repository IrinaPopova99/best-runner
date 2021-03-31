export const validations = (nameItem, valueItem, required = false, maxLength = 10000, valueIsNumber = false, pattern = ".") => {
    return ({
        // validate: { value: valueItem => (valueItem === getValues().email) || 'Email confirmation error!' },
        required: { value: required, message: "Это поле обязательно" },
        maxLength: { value: maxLength, message: `Максимальная длина ${maxLength}` },
        // valueIsNumber: { value: valueIsNumber, message: `Используйте только числа` },
        pattern: pattern
    });
}