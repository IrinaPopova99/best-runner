export const validations = (required = false, maxLength = 10000, valueIsNumber = false, pattern = ".") => {
    return ({
        required: { value: required, message: "Это поле обязательно" },
        maxLength: { value: maxLength, message: `Максимальная длина ${maxLength}` },
        valueIsNumber: { value: valueIsNumber, message: `Используйте только числа` },
        pattern: pattern
    });
}