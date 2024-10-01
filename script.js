let inputs = document.querySelectorAll('input');
let errors = {
  "full_name": [],
  "username": [],
  "email": [],
  "password": [],
  "confirm_password": []
};

inputs.forEach((element) => {
  element.addEventListener('change', e => {

    let currentInput = e.target;
    let inputValue = currentInput.value;
    let inputName = currentInput.getAttribute('name');

    if (inputValue.length > 4) {
      errors[inputName] = [];

      switch (inputName) {
        case 'full_name':
          let validation = inputValue.trim();
          validation = validation.split(" ");
          if (validation.length < 2) {
            errors[inputName].push('You must enter both first and last name.');
          }
          break;

        case 'email':
          if (!validateEmail(inputValue)) {
            errors[inputName].push('Invalid email address.');
          } else {
            console.log('Looks good');
          }
          break;

        case 'confirm_password':
          let password = document.querySelector(`input[name="password"]`).value;
          if (inputValue !== password) {
            errors[inputName].push('Passwords do not match.');
          }
          break;
      }

    } else {
      errors[inputName] = ['Field cannot have less than 5 characters.'];
    };

    populateErrors();

  })
});

const populateErrors = () => {
  for (let elem of document.querySelectorAll('ul')) {
    elem.remove();
  }

  for (let key of Object.keys(errors)) {
    let input = document.querySelector(`input[name="${key}"]`);

    let parentElement = input.parentElement;
    let errorsElement = document.createElement('ul');
    parentElement.appendChild(errorsElement);

    errors[key].forEach((error) => {
      let li = document.createElement('li');
      li.innerText = error;

      errorsElement.appendChild(li);
    });

  }
}

//"I didn't write this :)"
const validateEmail = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}
