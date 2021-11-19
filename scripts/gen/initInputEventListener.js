function initInputEventListener(formObject, inputFieldsList) {
  document.forms[formObject.name] &&
    document.forms[formObject.name].addEventListener(
      "keypress",
      function (event) {
        if (event.key == "Enter" && formObject.name != "add-edit-form") {
          window.commonFunctions.submitButtonClicked(formObject);
        } else if (event.key == "Enter" && formObject.name == "add-edit-form") {
          window.commonFunctions.check_and_add_edit(formObject);
        }
      }
    );

  for (const input of inputFieldsList) {
    let inputObj = formObject[input];
    inputObj.htmlElement.addEventListener("input", function () {
      inputObj.value = this.value;
      if (inputObj.errorMessageDisplayed) {
        formObject.checkInputValidity();
      }
    });

    if (input == "password" && formObject.name != "add-edit-form") {
      inputObj.htmlElement.addEventListener("input", function () {
        let profileImg = document.getElementById("form-profile-image");
        if (inputObj.value == "") {
          profileImg.src =
            "../../assets/images/student_" +
            window.pageCookie.styleMode +
            "_" +
            window.pageCookie.gender +
            ".png";
        } else {
          profileImg.src =
            "../../assets/images/student_" +
            window.pageCookie.styleMode +
            "_" +
            window.pageCookie.gender +
            "_ce.png";
        }
      });
    }

    if (input == "gender" && formObject.name == "register-form") {
      inputObj.htmlElement.addEventListener("input", function () {
        let profileImg = document.getElementById("form-profile-image");

        if (formObject.password.value == "") {
          profileImg.src =
            "../../assets/images/student_" +
            window.pageCookie.styleMode +
            "_" +
            window.pageCookie.gender +
            ".png";
        } else {
          profileImg.src =
            "../../assets/images/student_" +
            window.pageCookie.styleMode +
            "_" +
            window.pageCookie.gender +
            "_ce.png";
        }

        window.pageCookie.gender = formObject.gender.value;
        updatePage(formObject);
      });
    }
  }
}
