
// validates the review form on the movie detail page and the edit review page


document.addEventListener('DOMContentLoaded', function () {

  // used on both movie-detail and edit-review pages, both forms share the same id
  const form      = document.getElementById('reviewForm');

  // if the form doesn't exist on this page just stop
  if (!form) return;

  const bodyInput  = document.getElementById('body');
  const bodyError  = document.getElementById('bodyError');

  // helper functions
  function showError(input, errorSpan, message) {
    input.style.borderColor = '#e05252';
    errorSpan.textContent   = message;
  }

  function clearError(input, errorSpan) {
    input.style.borderColor = '';
    errorSpan.textContent   = '';
  }

  // clear error as user types
  bodyInput.addEventListener('input', function () {
    if (bodyInput.value.trim().length >= 10) {
      clearError(bodyInput, bodyError);
    }
  });

  // check on submit
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    // review needs at least 10 characters
    if (bodyInput.value.trim().length < 10) {
      showError(bodyInput, bodyError, 'Your review must be at least 10 characters.');
      isValid = false;
    } else {
      clearError(bodyInput, bodyError);
    }

    if (isValid) {
      form.submit();
    }
  });

});
