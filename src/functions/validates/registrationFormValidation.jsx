export default function registrationFormValidation(formData) {
    const errors = {};
    errors.isSuccess = true;

    if (formData.username.trim() < 0) {
        errors.username = `Ваше имя должно быть не меньше 1 символа`;
        errors.isSuccess = false;
    }

    if (formData.email.trim() < 0 || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Некорректная почта';
        errors.isSuccess = false;
    }

    if (formData.password.length < 8) {
        errors.password = `Пароль должен быть не меньше 8 символов`;
        errors.isSuccess = false;
    } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Пароль не совпадает';
        errors.isSuccess = false;
    }

    return errors;
}
