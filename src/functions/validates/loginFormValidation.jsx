export default function loginFormValidation(formData) {
    const errors = {};
    errors.isSuccess = true;

    if (formData.email.trim() < 0 || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Некорректная почта';
        errors.isSuccess = false;
    }

    if (formData.password.length < 8) {
        errors.password = `Пароль должен быть не меньше 8 символов`;
        errors.isSuccess = false;
    }

    return errors;
}
