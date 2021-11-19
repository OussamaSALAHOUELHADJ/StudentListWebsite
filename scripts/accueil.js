window.onload = async () => {
  initPage(addEditForm);

  /* init register form */
  let registerformData = await getRegisterFormData();
  initRegisterForm(registerformData);

  setFormValue(addEditForm);

  initInputEventListener(addEditForm, addEditForm.InputFields);
  loged_username(window.location.search);
};

async function getRegisterFormData() {
  let response = await fetch("../assets/data/registerFormData.json");
  return response.json();
}

function initRegisterForm(registerformData) {
  for (const selectInput in registerformData) {
    let selectHtmlElem = addEditForm[selectInput].htmlElement;
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

let addEditHtmlElem = document.forms["add-edit-form"];
let addEditForm = {
  name: "add-edit-form",
  htmlElement: addEditHtmlElem,
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
    htmlElement: addEditHtmlElem["first-name"],
    value: "",
    validationRegex: /^((?!\s).)[a-z]{1,20}$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid first name, must be between 1-15 letters only.",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  lastName: {
    name: "Last Name",
    htmlElement: addEditHtmlElem["last-name"],
    value: "",
    validationRegex: /^((?!\s).)[a-z]{1,20}$/i,
    errorMessageDisplayed: false,
    errorMessage: "invalid last name, must be between 1-15 letters only.",
    validateValue: function () {
      return this.validationRegex.test(this.value);
    },
  },
  gender: {
    name: "Gender",
    htmlElement: addEditHtmlElem["gender"],
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
    htmlElement: addEditHtmlElem["birthday"],
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
    htmlElement: addEditHtmlElem["adress"],
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
    htmlElement: addEditHtmlElem["wilaya"],
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
    htmlElement: addEditHtmlElem["email"],
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
    htmlElement: addEditHtmlElem["phone"],
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
    htmlElement: addEditHtmlElem["username"],
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
    htmlElement: addEditHtmlElem["password"],
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

// define global var for users from json file
let jsonf;

//put the user list in jsonf global var

jsonf = fetch("/assets/data/users.json").then((response) => response.json());

let init_table_data = () => {
  jsonf.then((a) => {
    //refresh the list table from another fetch function
    jsonf = a;
    ref_table(a);
  });
};

init_table_data();

//hide edit section and add section and delete buttons and edit buttons

//update the table
async function ref_table(users) {
  //delete every thing in the table
  let users_lst = document.getElementById("users-list-body").children;
  for (let index = users_lst.length - 1; index >= 0; index--) {
    users_lst[index].remove();
  }

  //get the data from jsonf object
  let userHtml;
  let rowNumber = 1;
  for (let user of users) {
    userHtml = document.createElement("tr");
    userHtml.id = user["id"];
    /*creates the columns*/
    /*then append it to the table*/

    for (const info in user) {
      let tdHtml;
      if (info == "id") {
        tdHtml = createTdHtmlElem(rowNumber++);
      } else {
        tdHtml = createTdHtmlElem(user[info]);
      }
      userHtml.appendChild(tdHtml);
    }

    //add the edit and remover button
    let btn = document.createElement("td");

    let edt_img = document.createElement("img");
    edt_img.setAttribute("src", "/assets/images/edit-icon.png");
    edt_img.setAttribute("alt", "Edit a user");
    edt_img.setAttribute("class", "users-controle-icon");

    btn.setAttribute("class", "edt_btn user_edt_btn");
    btn.setAttribute("onclick", "edit_form('" + user["id"] + "')");
    btn.appendChild(edt_img);

    userHtml.appendChild(btn);

    btn = document.createElement("td");

    let del_img = document.createElement("img");
    del_img.setAttribute("src", "/assets/images/delete-icon.png");
    del_img.setAttribute("alt", "Delete a user");
    del_img.setAttribute("class", "users-controle-icon");

    btn.setAttribute("class", "del_btn user_del_btn");
    btn.setAttribute("onclick", "del_form('" + user["id"] + "')");
    btn.appendChild(del_img);
    userHtml.appendChild(btn);

    document.getElementById("users-list-body").appendChild(userHtml);
  }

  hide_edt_btn();
  hide_del_btn();
}

function hide_edt_btn() {
  let edt_btn = document.getElementsByClassName("edt_btn");
  for (let i = 0; i < edt_btn.length; i++) {
    edt_btn[i].style.display = "none";
  }
}

function hide_del_btn() {
  let del_btn = document.getElementsByClassName("del_btn");
  for (let i = 0; i < del_btn.length; i++) {
    del_btn[i].style.display = "none";
  }
}

//hide form and show table
function hide_form() {
  ref_table(jsonf);
  document.getElementById("add-edit-section").style.display = "none";
  document.getElementById("users-list-container").style.display = "grid";
}

function createTdHtmlElem(value) {
  let td = document.createElement("td");
  td.innerHTML = value;
  return td;
}

function show_add() {
  removeErrorMessageWhenInit();
  ref_form();
  document.getElementById("add/edit").innerHTML = "Add user";

  document.getElementById("/edit_btn").style.display = "none";
  document.getElementById("add/edit_btn").style.display = "";

  document.getElementById("users-list-container").style.display = "none";
  document.getElementById("add-edit-section").style.display = "grid";
}

function show_edit() {
  hide_form();
  ref_form();
  hide_del_btn();
  //show the edit buttons
  let edt_btn = document.getElementsByClassName("edt_btn");
  for (let i = 0; i < edt_btn.length; i++) {
    edt_btn[i].style.display = "";
  }
}

function show_delet() {
  hide_form();
  ref_form();
  hide_edt_btn();
  //show the edit buttons
  let del_btn = document.getElementsByClassName("del_btn");
  for (let i = 0; i < del_btn.length; i++) {
    del_btn[i].style.display = "";
  }
}

function ref_form() {
  document.getElementById("add-edit-section").classList = [];
  for (let i = 0; i < addEditForm.InputFields.length; i++) {
    if (addEditForm.InputFields[i] == "gender") {
      addEditForm[addEditForm.InputFields[i]]["htmlElement"].value = "Male";
    } else if (addEditForm.InputFields[i] == "wilaya") {
      addEditForm[addEditForm.InputFields[i]]["htmlElement"].value = "Adrar";
    } else {
      addEditForm[addEditForm.InputFields[i]]["htmlElement"].value = "";
    }
  }
}

function get_id() {
  let date = new Date();
  let components = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ];

  return components.join("");
}

//this function will check and call added_user function

function sleep(lf_ms) {
  return new Promise((resolve) => setTimeout(resolve, lf_ms));
}

function added_user() {
  let new_user = {};

  //create id
  new_user.id = get_id();

  for (let i = 0; i < addEditForm.InputFields.length; i++) {
    new_user[addEditForm.InputFields[i]] =
      addEditForm[addEditForm.InputFields[i]].value;
  }

  jsonf.push(new_user);
  ref_table(jsonf);

  document.getElementById("add-edit-section").style.display = "none";
  document.getElementById("users-list-container").style.display = "grid";
}

function cancel_form() {
  document.getElementById("add-edit-section").style.display = "none";
  document.getElementById("users-list-container").style.display = "grid";
}

function edit_form(id) {
  removeErrorMessageWhenInit();
  //change the adds paragraphs in add/edit section to edit
  document.getElementById("add/edit").innerHTML = "Edit user";
  //hide the add button
  document.getElementById("add/edit_btn").style.display = "none";
  //show the edit button
  document.getElementById("/edit_btn").style.display = "";
  //show the add/edit section
  document.getElementById("users-list-container").style.display = "none";
  document.getElementById("add-edit-section").style.display = "grid";
  document.getElementById("add-edit-section").classList.add(id);
  //change the places to edit to the user depending on the user id passed as an argument
  let edted_usr;
  for (let i = 0; i < jsonf.length; i++) {
    if (jsonf[i]["id"] == id) {
      edted_usr = jsonf[i];
      break;
    }
  }

  //i can change this to a loop later
  //set the input values to the one that will be edited
  /* for (let i = 0; i < addEditForm.InputFields.length; i++) {

    addEditForm[addEditForm.InputFields[i]]

    addEditForm[addEditForm.InputFields[i]].htmlElement.value =
      edted_usr[addEditForm.InputFields[i]];
  } */

  for (const Input of addEditForm.InputFields) {
    addEditForm[Input].htmlElement.value = edted_usr[Input];
    addEditForm[Input].value = edted_usr[Input];
  }
}

function edited_user() {
  for (let i = 0; jsonf.length; i++) {
    if (
      jsonf[i]["id"] == document.getElementById("add-edit-section").classList[0]
    ) {
      for (let j = 0; j < addEditForm.InputFields.length; j++) {
        jsonf[i][addEditForm.InputFields[j]] =
          addEditForm[addEditForm.InputFields[j]].value;
      }
      break;
    }
  }

  //in this we delete that class that changes depeding on the
  document.getElementById("add-edit-section").classList = [];
  ref_table(jsonf);

  document.getElementById("add-edit-section").style.display = "none";
  document.getElementById("users-list-container").style.display = "grid";
}

function del_form(id) {
  for (let i = 0; i < jsonf.length; i++) {
    if (jsonf[i]["id"] == id) {
      jsonf.splice(i, 1);
      break;
    }
  }
  ref_table(jsonf);
  //reshow the delete buttons
  show_delet();
}

function removeErrorMessageWhenInit() {
  for (const Input of addEditForm.InputFields) {
    let inputElem = addEditForm[Input];
    if (inputElem.errorMessageDisplayed) {
      addEditForm.removeInvalidInputErrorMessage(addEditForm[Input]);
    }
  }
}

function loged_username(urlParm) {
  urlParms = new URLSearchParams(urlParm);
  document.getElementsByClassName("user-info")[0].innerHTML =
    urlParms.get("username") + " !";
}

function show_users_list() {
  document.getElementById("users-list-container").style.display = "grid";
  document.getElementById("add-edit-section").style.display = "none";
}
