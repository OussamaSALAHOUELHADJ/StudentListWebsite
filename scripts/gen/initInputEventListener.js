function initInputEventListener(formObject, inputFieldsList) {
  for (const input of inputFieldsList) {
    let inputObj = formObject[input];
    inputObj.htmlElement.addEventListener("input", function () {
      inputObj.value = this.value;
      if (inputObj.errorMessageDisplayed) {
        formObject.checkInputValidity();
      }
    });

    if (input == "password") {
      inputObj.htmlElement.addEventListener("input", function () {
        let profileImg = document.getElementById("form-profile-image");
        if (inputObj.value == "") {
          profileImg.src = "../../assets/images/student.png";
        } else {
          profileImg.src = "../../assets/images/closed-eyes.png";
        }
      });
    }
  }
}
