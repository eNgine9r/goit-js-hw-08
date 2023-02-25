import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value;
    const formDataJSON = JSON.stringify(formData);
    const parseFormData = JSON.parse(formDataJSON);
    console.log(formDataJSON);
})

populateTextarea();

function onFormSubmit(e){
    e.preventDefault();

    if (refs.input.value === '' || refs.textarea.value === '') {
        alert ("Заповніть поля")
    }

    console.log('Відправляємо форму');
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function onTextareaInput(){
    const message = localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const parseSavedMessage = JSON.parse(savedMessage)
    if (parseSavedMessage) {
        refs.input.value = parseSavedMessage.email;
        refs.textarea.value = parseSavedMessage.message;
    }
}