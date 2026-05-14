
// client side validation for the register form


document.addEventListener('DOMContentLoaded', function () {

  const form                  = document.getElementById('registerForm');
  const nameInput             = document.getElementById('name');
  const emailInput            = document.getElementById('email');
  const passwordInput         = document.getElementById('password');
  const confirmPasswordInput  = document.getElementById('confirmPassword');

  const nameError             = document.getElementById('nameError');
  const emailError            = document.getElementById('emailError');
  const passwordError         = document.getElementById('passwordError');
  const confirmPasswordError  = document.getElementById('confirmPasswordError');

  // a red error message under a field
  function showError(input, errorSpan, message) {
    input.style.borderColor = '#e05252';
    errorSpan.textContent   = message;
  }

  // clears the error from a field
  function clearError(input, errorSpan) {
    input.style.borderColor = '';
    errorSpan.textContent   = '';
  }

  // clears all errors at once
  function clearAllErrors() {
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    clearError(confirmPasswordInput, confirmPasswordError);
  }

  // clear errors as the user types
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim().length >= 2) clearError(nameInput, nameError);
  });

  emailInput.addEventListener('input', function () {
    if (emailInput.value.includes('@')) clearError(emailInput, emailError);
  });

  passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length >= 8) clearError(passwordInput, passwordError);
    // also re check to confirm password if user already typed it
    if (confirmPasswordInput.value !== '') {
      if (passwordInput.value === confirmPasswordInput.value) {
        clearError(confirmPasswordInput, confirmPasswordError);
      }
    }
  });

  confirmPasswordInput.addEventListener('input', function () {
    if (confirmPasswordInput.value === passwordInput.value) {
      clearError(confirmPasswordInput, confirmPasswordError);
    }
  });

  // checks to be run when user clicks "create account"
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearAllErrors();

    let isValid = true;

    // name must be at least 2 characters
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    }

    // email must not be empty and must look like an email
    if (emailInput.value.trim() === '') {
      showError(emailInput, emailError, 'Email is required.');
      isValid = false;
    } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // password must be at least 8 characters
    if (passwordInput.value.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
      isValid = false;
    }

    // confirm password must match
    if (confirmPasswordInput.value === '') {
      showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
      isValid = false;
    }

    // if all good, send it to the server
    if (isValid) {
      form.submit();
    }
  });

});
