window.onload = () => {
  initInputEventListener(logInForm, logInForm.logInInputFields);
  document.forms["login-form"].addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      window.commonFunctions.submitButtonClicked(logInForm);
    }
  });
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
    validationRegex: /\b[a-z1-9]{4,15}\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid username, must be between 4-15 letters",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  password: {
    name: "password",
    htmlElement: logInHtmlElem["password"],
    value: "",
    validationRegex: /\b.{8,20}\b$/,
    errorMessageDisplayed: false,
    errorMessage: "invalid password, must be between 8-20 letters",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  checkInputValidity: function () {
    let elementsToCheckValue = this.logInInputFields;
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
};
