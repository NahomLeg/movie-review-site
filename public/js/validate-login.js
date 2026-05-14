
// client side validation for the login form


// waits for the whole page to load before running any code
document.addEventListener('DOMContentLoaded', function () {

  // grabs the form and the input fields we need to check
  const form          = document.getElementById('loginForm');
  const emailInput    = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const emailError    = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // clears all error messages
  function clearErrors() {
    emailError.textContent    = '';
    passwordError.textContent = '';
  }

  // shows a red border and message under a field
  function showError(input, errorSpan, message) {
    input.style.borderColor   = '#e05252';
    errorSpan.textContent     = message;
  }

  // resets a field back to normal
  function clearError(input, errorSpan) {
    input.style.borderColor   = '';
    errorSpan.textContent     = '';
  }

  // clear the error as soon as the user starts typing again
  emailInput.addEventListener('input', function () {
    if (emailInput.value.trim() !== '') {
      clearError(emailInput, emailError);
    }
  });

  passwordInput.addEventListener('input', function () {
    if (passwordInput.value !== '') {
      clearError(passwordInput, passwordError);
    }
  });

  // when the form is submitted, run our checks
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // reset all errors first
    clearErrors();

    let isValid = true;

    // email checks
    if (emailInput.value.trim() === '') {
      showError(emailInput, emailError, 'Email is required.');
      isValid = false;
    }
    
    else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // password checks
    if (passwordInput.value === '') {
      showError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    }

    // if all good, submit
    if (isValid) {
      form.submit();
    }
  });

});
