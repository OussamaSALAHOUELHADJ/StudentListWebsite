(function (window) {
  //set somthing to the global object
  window.commonFunctions = {
    check_and_add_edit: function (formObj, type) {
      formObj.isFormValid = formObj.checkInputValidity();
      if (formObj.isFormValid) {
        if (formObj.name == "add-edit-form") {
          let successMessageHtml;
          if (type == "add") {
            added_user();
            successMessageHtml = document.getElementById(
              "account-success-created-message"
            );
            successMessageHtmlChildren(
              successMessageHtml,
              "New User has been Added Successfully!🎉",
              "Congrats! new account has been added..."
            );
            successMessageHtml.classList.add("active-success-message");
            successMessageHtml.classList.remove("hidden-success-message");
          } else {
            edited_user();
            successMessageHtml = document.getElementById(
              "account-success-created-message"
            );
            successMessageHtmlChildren(
              successMessageHtml,
              "A User has been Modified Successfully!🎉",
              "Congrats! an account has been modified..."
            );
            successMessageHtml.classList.add("active-success-message");
            successMessageHtml.classList.remove("hidden-success-message");
          }
          setTimeout(() => {
            successMessageHtml.classList.remove("active-success-message");
            successMessageHtml.classList.add("hidden-success-message");
          }, 5000);
        }
      } else {
        return false;
      }
    },
  };
})(window);

function successMessageHtmlChildren(parent, title, message) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  let messageTitle = document.createElement("h2");
  messageTitle.textContent = title;

  let messageBody = document.createElement("p");
  messageBody.textContent = message;
  parent.appendChild(messageTitle);
  parent.appendChild(messageBody);
}
