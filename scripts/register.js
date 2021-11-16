window.onload = async () => {
  /* init register form */
  let registerformData = await getRegisterFormData();
  initRegisterForm(registerformData);

  setFormValue(registerForm);

  initInputEventListener(registerForm, registerForm.InputFields);

  document.forms["register-form"].addEventListener(
    "keypress",
    function (event) {
      if (event.key == "Enter") {
        window.commonFunctions.submitButtonClicked(registerForm);
      }
    }
  );
};

async function getRegisterFormData() {
  let response = await fetch("../assets/data/registerFormData.json");
  return response.json();
}

function initRegisterForm(registerformData) {
  for (const selectInput in registerformData) {
    let selectHtmlElem = registerForm[selectInput].htmlElement;
    for (const selectInputType in registerformData[selectInput]) {
      let optionHtmlElem = document.createElement("option");
      optionHtmlElem.attributes.name = selectInputType;
      optionHtmlElem.innerHTML = registerformData[selectInput][selectInputType];
      selectHtmlElem.appendChild(optionHtmlElem);
    }
  }
}

function setFormValue(formObj) {
  for (const formInput of formObj.InputFields) {
    let formInputObj = formObj[formInput];
    formInputObj.htmlElement.value = formInputObj.value;
  }
}

let registerHtmlElem = document.forms["register-form"];

let registerForm = {
  name: "register-form",
  htmlElement: registerHtmlElem,
  InputFields: [
    "firstName",
    "lastName",
    "gender",
    "birthday",
    "adress",
    "wilaya",
    "email",
    "phone",
    "username",
    "password",
  ],
  isFormValid: false,

  firstName: {
    name: "First Name",
    htmlElement: registerHtmlElem["first-name"],
    value: "",
    validationRegex: /\b[a-z]{1,15}\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid first name, must be between 1-15 letters only.",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  lastName: {
    name: "Last Name",
    htmlElement: registerHtmlElem["last-name"],
    value: "",
    validationRegex: /\b[a-z]{1,15}\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid last name, must be between 1-15 letters only.",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  gender: {
    name: "Gender",
    htmlElement: registerHtmlElem["gender"],
    value: "Male",
    validationRegex: /\b[a-z]{1,15}\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid last name, must be between 1-15 letters only",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  birthday: {
    name: "Birthday",
    htmlElement: registerHtmlElem["birthday"],
    value: "",
    validationRegex: /\b\d{4}-\d{2}-\d{2}\b$/,
    errorMessageDisplayed: false,
    errorMessage: "invalid date of birth",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  adress: {
    name: "Adress",
    htmlElement: registerHtmlElem["adress"],
    value: "",
    validationRegex: /\b[a-z1-9]+\b$/i,
    errorMessageDisplayed: false,
    errorMessage:
      "invalid adress, follow the format: house number, street, city",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  wilaya: {
    name: "wilaya",
    htmlElement: registerHtmlElem["wilaya"],
    value: "Adrar",
    validationRegex: /\b[a-z]{1,15}\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid last name, must be between 1-15 letters only",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  email: {
    name: "email",
    htmlElement: registerHtmlElem["email"],
    value: "",
    validationRegex: /\b\w+@\w+\.[a-z0-9]+\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid email",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  phone: {
    name: "Phone Number",
    htmlElement: registerHtmlElem["phone"],
    value: "",
    validationRegex: /\b\d{1,3}\d{9}\b$/,
    errorMessageDisplayed: false,
    errorMessage: "invalid phone number, must be +(country code) then 9 digits",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  username: {
    name: "username",
    htmlElement: registerHtmlElem["username"],
    value: "",
    validationRegex: /\b[a-z1-9]{4,15}\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid username, must be between 4-15 letters",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  password: {
    name: "password",
    htmlElement: registerHtmlElem["password"],
    value: "",
    validationRegex: /\b.{8,20}\b$/,
    errorMessageDisplayed: false,
    errorMessage: "invalid password, must be between 8-20 letters",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  checkInputValidity: function () {
    let elementsToCheckValue = this.InputFields;
    let areElementsValid = true;
    for (const element of elementsToCheckValue) {
      let formElement = this[element];
      let isValid = formElement.validateValue();
      let isErrorMessageDisplayed = formElement.errorMessageDisplayed;

      if (!isValid && !isErrorMessageDisplayed) {
        this.fireInvalidInputErrorMessage(formElement);
        areElementsValid = false;
      } else if (isValid && isErrorMessageDisplayed) {
        this.removeInvalidInputErrorMessage(formElement);
      }
      if (!isValid && isErrorMessageDisplayed) {
        areElementsValid = false;
      }
    }

    return areElementsValid;
  },
  fireInvalidInputErrorMessage: function (formElement) {
    let errorMessageHtmlElement = document.createElement("p");
    errorMessageHtmlElement.classList.add("invalid-input-error-message");
    errorMessageHtmlElement.innerHTML = formElement.errorMessage;
    formElement.htmlElement.parentNode.insertBefore(
      errorMessageHtmlElement,
      formElement.htmlElement.nextSibling
    );
    formElement.htmlElement.classList.add("invalid-input-field");
    formElement.errorMessageDisplayed = true;
  },
  removeInvalidInputErrorMessage: function (formElem) {
    formElem.htmlElement.parentElement.removeChild(
      formElem.htmlElement.nextSibling
    );

    formElem.htmlElement.classList.remove("invalid-input-field");
    formElem.errorMessageDisplayed = false;
  },
  onSubmit: function () {
    return this.isFormValid;
  },
};
