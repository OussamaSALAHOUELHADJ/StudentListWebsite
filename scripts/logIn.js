window.onload = () => {
  initInputEventListener(logInForm, logInForm.logInInputFields);
};

let logInHtmlElem = document.forms["login-form"];

let logInForm = {
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
    errorMessageHtmlElement.classList.add("errorMessage");
    errorMessageHtmlElement.innerHTML = formElement.errorMessage;
    formElement.htmlElement.parentNode.insertBefore(
      errorMessageHtmlElement,
      formElement.htmlElement.nextSibling
    );
    formElement.htmlElement.className += " error";
    formElement.errorMessageDisplayed = true;
  },
  removeInvalidInputErrorMessage: function (formElem) {
    formElem.htmlElement.parentElement.removeChild(
      formElem.htmlElement.nextSibling
    );

    formElem.htmlElement.classList.remove("wrong");
    formElem.errorMessageDisplayed = false;
  },
};

function submitButtonClicked(formObj) {
  return formObj.checkInputValidity();
}
