window.onload = () => {
  initPage(logInForm);
  initInputEventListener(logInForm, logInForm.logInInputFields);
};

let logInHtmlElem = document.forms["login-form"];

let logInForm = {
  name: "login-form",
  htmlElement: logInHtmlElem,
  logInInputFields: ["username", "password"],
  username: {
    name: "username",
    htmlElement: logInHtmlElem["username"],
    value: "",
    validationRegex: /^((?!\s).)[a-z1-9]{4,15}$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid username, must be between 4-15 character",
    validateValue: function () {
      return this.validationRegex.test(this.value.trim());
    },
  },
  password: {
    name: "password",
    htmlElement: logInHtmlElem["password"],
    value: "",
    validationRegex: /\b.{6,50}\b$/,
    errorMessageDisplayed: false,
    errorMessage: "invalid password, must be between 6-50 character",
    validateValue: function () {
      return this.validationRegex.test(this.value.trim());
    },
  },
  gender: {
    value: "Male",
  },
  checkInputValidity: function () {
    let elementsToCheckValue = this.logInInputFields;
    let areElementsValid = true;
    for (const element of elementsToCheckValue) {
      let formElement = this[element];
      formElement.value = formElement.value.trim();
      formElement.htmlElement.value = formElement.value;
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
};
