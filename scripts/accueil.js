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

jsonf = fetch("/assets/data/users.json").then((response) => response.json());

let init_table_data = () => {
  jsonf.then((a) => {
    //refresh the list table from another fetch function
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
  console.log("here");
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

  document.getElementById("add-edit-section").style.display = "";
  let edt_btn = document.getElementsByClassName("edt_btn");
  let del_btn = document.getElementsByClassName("del_btn");
  for (let i = 0; i < edt_btn.length; i++) {
    edt_btn[i].style.display = "none";
  }
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
  //show the edit buttons
  let edt_btn = document.getElementsByClassName("edt_btn");
  for (let i = 0; i < edt_btn.length; i++) {
    edt_btn[i].style.display = "";
  }
}

function show_delet() {
  //show the edit buttons
  let del_btn = document.getElementsByClassName("del_btn");
  for (let i = 0; i < del_btn.length; i++) {
    del_btn[i].style.display = "";
  }
}

function show_add() {
  document.getElementById("Add_section").style.display = "";
}

function edit_form(id) {
  //change the adds paragraphs in add/edit section to edit
  document.getElementById("add/edit").value = "Edit user";
  //hide the add button
  document.getElementById("add/_btn").style.display = "none";
  //show the edit button
  document.getElementById("/edit_btn").style.display = "";
  //show the add/edit section
  document.getElementById("add-edit-section").style.display = "";
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

  //there are a problem though when he hits edit there must be a user to delet and another to add or just replace but its id need to be puted in a variable this is way am using id_to_edit as global variable
  id_to_edit = id;
}

let id_to_edit;

function edited_user() {
  for (let i = 0; jsonf.length; i++) {
    if (jsonf[i]["id"] == id_to_edit) {
      for (let j = 0; j < registerForm.InputFields.length; j++) {
        jsonf[i][registerForm.InputFields[j]] =
          registerForm[registerForm.InputFields[j]].value;
      }
      break;
    }
  }
}

function del_form(id) {
  let users_lst = document.getElementById("users_list-body").children;
  users_lst[id - 1].remove();
  jsonf[id].remove();
}
