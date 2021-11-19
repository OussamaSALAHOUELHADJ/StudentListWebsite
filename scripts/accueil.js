window.onload = async () => {
  initPage(registerForm);

  /* init register form */
  let registerformData = await getRegisterFormData();
  initRegisterForm(registerformData);

  setFormValue(registerForm);

  initInputEventListener(registerForm, registerForm.InputFields);
};

// define global var for users from json file
let jsonf;

//put the user list in jsonf global var

jsonf = fetch("../assets/data/users.json").then((response) => response.json());

let init_table_data = () => {
  jsonf.then((a) => {
    //refresh the list table from another fetch function
    jsonf = a;
    ref_table(a);
  });
};

init_table_data();

//hide edit section and add section and delete buttons and edit buttons

/*document.getElementById("add-edit-section").style.display = "";
let edt_btn = document.getElementsByClassName("edt_btn");
let del_btn = document.getElementsByClassName("del_btn");
for (let i = 0; i < edt_btn.length; i++) {
  edt_btn[i].style.display = "none";
}
for (let i = 0; i < del_btn.length; i++) {
  del_btn[i].style.display = "none";
}
*/

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
    edt_img.setAttribute("src", "../assets/images/edit-icon.png");
    edt_img.setAttribute("alt", "Edit a user");
    edt_img.setAttribute("class", "users-controle-icon");

    btn.setAttribute("class", "edt_btn user_edt_btn");
    btn.setAttribute("onclick", "edit_form('" + user["id"] + "')");
    btn.appendChild(edt_img);

    userHtml.appendChild(btn);

    btn = document.createElement("td");

    let del_img = document.createElement("img");
    del_img.setAttribute("src", "../assets/images/delete-icon.png");
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

function createTdHtmlElem(value) {
  let td = document.createElement("td");
  td.innerHTML = value;
  return td;
}

function show_edit() {
  hide_del_btn();
  //show the edit buttons
  let edt_btn = document.getElementsByClassName("edt_btn");
  for (let i = 0; i < edt_btn.length; i++) {
    edt_btn[i].style.display = "";
  }
}

function show_delet() {
  hide_edt_btn();
  //show the edit buttons
  let del_btn = document.getElementsByClassName("del_btn");
  for (let i = 0; i < del_btn.length; i++) {
    del_btn[i].style.display = "";
  }
}

function show_add() {
  document.getElementById("add/edit").value = "Add user";

  document.getElementById("/edit_btn").style.display = "none";
  document.getElementById("add/edit_btn").style.display = "";

  document.getElementById("users-list-container").style.display = "none";
  document.getElementById("add-edit-section").style.display = "grid";
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
(function (window) {
  //set somthing to the global object
  window.commonFunctions = {
    check_and_add_edit: async function (formObj, type) {
      formObj.isFormValid = formObj.checkInputValidity();
      if (formObj.isFormValid) {
        if (formObj.name == "register-form") {
          if (type == "add") {
            added_user();
          } else {
            edited_user();
          }
          document
            .getElementById("account-success-created-message")
            .classList.add("active-success-message");
          await sleep(12000);
        }
      } else {
        return false;
      }
    },
  };
})(window);

function sleep(lf_ms) {
  return new Promise((resolve) => setTimeout(resolve, lf_ms));
}

function added_user() {
  let new_user = {};

  //create id
  new_user.id = get_id();

  for (let i = 0; i < registerForm.InputFields.length; i++) {
    new_user[registerForm.InputFields[i]] =
      registerForm[registerForm.InputFields[i]].value;
    console.log(registerForm[registerForm.InputFields[i]].value);
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
  //change the adds paragraphs in add/edit section to edit
  document.getElementById("add/edit").value = "Edit user";
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
  let form_edt = document.getElementById("register-form").children;
  form_edt[1].value = edted_usr["firstName"];
  form_edt[3].value = edted_usr["lastName"];
  form_edt[5].value = edted_usr["gender"];
  form_edt[7].value = edted_usr["birthday"];
  form_edt[9].value = edted_usr["adress"];
  form_edt[11].value = edted_usr["wilaya"];
  form_edt[13].value = edted_usr["email"];
  form_edt[15].value = edted_usr["phone"];
  form_edt[17].value = edted_usr["username"];
  form_edt[19].value = edted_usr["password"];
}

function edited_user() {
  for (let i = 0; jsonf.length; i++) {
    if (
      jsonf[i]["id"] == document.getElementById("add-edit-section").classList[0]
    ) {
      for (let j = 0; j < registerForm.InputFields.length; j++) {
        jsonf[i][registerForm.InputFields[j]] =
          registerForm[registerForm.InputFields[j]].value;
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
}
