import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const formDataCollecting = throttle(() => {
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

}, 500);

function localSavedData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        emailInput.value = email;
        messageInput.value = message;
    }
}

document.addEventListener('DOMContentLoaded', localSavedData);
form.addEventListener('input', formDataCollecting);
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    
    localStorage.removeItem(STORAGE_KEY);
    console.log('Datele din form:', formData);
});

