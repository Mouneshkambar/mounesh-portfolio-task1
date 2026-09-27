const navigationToggle = document.querySelector('.nav-toggle');
const navigationMenu = document.querySelector('.nav-list');

if (navigationToggle && navigationMenu) {
    navigationToggle.addEventListener('click', () => {
        const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true';
        navigationToggle.setAttribute('aria-expanded', String(!isOpen));
        navigationMenu.classList.toggle('is-open', !isOpen);
    });
}

document.querySelectorAll('.current-year').forEach((yearElement) => {
    yearElement.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    const fields = {
        name: {
            input: document.querySelector('#name'),
            error: document.querySelector('#name-error'),
            message: 'Please enter your full name.'
        },
        email: {
            input: document.querySelector('#email'),
            error: document.querySelector('#email-error'),
            message: 'Please enter a valid email address.'
        },
        subject: {
            input: document.querySelector('#subject'),
            error: document.querySelector('#subject-error'),
            message: 'Please enter a subject.'
        },
        message: {
            input: document.querySelector('#message'),
            error: document.querySelector('#message-error'),
            message: 'Please enter a message.'
        }
    };
    const status = document.querySelector('#form-status');

    const validateField = (fieldName) => {
        const field = fields[fieldName];
        const value = field.input.value.trim();
        let errorMessage = '';

        if (!value) {
            errorMessage = field.message;
        } else if (fieldName === 'email' && !field.input.validity.valid) {
            errorMessage = field.message;
        }

        field.error.textContent = errorMessage;
        field.input.setAttribute('aria-invalid', String(Boolean(errorMessage)));
        return !errorMessage;
    };

    Object.keys(fields).forEach((fieldName) => {
        fields[fieldName].input.addEventListener('blur', () => validateField(fieldName));
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const isValid = Object.keys(fields).map(validateField).every(Boolean);

        if (!isValid) {
            status.className = 'form-status error';
            status.textContent = 'Please correct the highlighted fields and try again.';
            const firstInvalidField = Object.values(fields).find((field) => field.input.getAttribute('aria-invalid') === 'true');
            firstInvalidField.input.focus();
            return;
        }

        status.className = 'form-status success';
        status.textContent = 'Your message passed validation. No email was sent because this site has no backend.';
        contactForm.reset();
        Object.values(fields).forEach((field) => {
            field.input.removeAttribute('aria-invalid');
            field.error.textContent = '';
        });
        status.focus();
    });
}
