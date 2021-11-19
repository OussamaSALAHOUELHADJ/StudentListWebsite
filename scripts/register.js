window.onload = async () => {
  initPage(registerForm);

  /* init register form */
  let registerformData = await getRegisterFormData();
  initRegisterForm(registerformData);

  setFormValue(registerForm);

  initInputEventListener(registerForm, registerForm.InputFields);
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
    if (formInput == "gender") {
      formInputObj.htmlElement.value = window.pageCookie.gender;
    } else {
      formInputObj.htmlElement.value = formInputObj.value;
    }
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
    validationRegex: /^((?!\s).)[a-z]{1,20}$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid first name, must be between 1-20 letters only.",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  lastName: {
    name: "Last Name",
    htmlElement: registerHtmlElem["last-name"],
    value: "",
    validationRegex: /^((?!\s).)[a-z]{1,20}$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid last name, must be between 1-20 letters only.",
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
    errorMessage: "",
    validateValue: function () {
      return true;
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
    name: "Address",
    htmlElement: registerHtmlElem["adress"],
    value: "",
    validationRegex: /\b[a-z1-9]+\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid address",
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
    errorMessage: "",
    validateValue: function () {
      return true;
    },
  },
  email: {
    name: "email",
    htmlElement: registerHtmlElem["email"],
    value: "",
    validationRegex: /\b^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+\b$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid email, expected like name@company.dz.com",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  phone: {
    name: "Phone Number",
    htmlElement: registerHtmlElem["phone"],
    value: "",
    validationRegex: /\b\d{3}-?\d{3}-?\d{4}\b$|\b\d{3}\s?\d{3}\s?\d{4}\b$/,
    errorMessageDisplayed: false,
    errorMessage:
      "invalid phone number, must have 10 digits only, expected: 0798651242 or 079-865-1242 or 079 865 1242",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  username: {
    name: "username",
    htmlElement: registerHtmlElem["username"],
    value: "",
    validationRegex: /^((?!\s).)[a-z1-9]{4,15}$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid username, must be between 4-15 character",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  password: {
    name: "password",
    htmlElement: registerHtmlElem["password"],
    value: "",
    validationRegex: /\b.{6,50}\b$/,
    errorMessageDisplayed: false,
    errorMessage: "invalid password, must be between 6-50 character",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  checkInputValidity: function () {
    let elementsToCheckValue = this.InputFields;
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
  onSubmit: function () {
    return this.isFormValid;
  },
};
