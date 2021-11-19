(function (window) {
  // set something to the global object
  window.commonFunctions = {
    submitButtonClicked: async function (formObj) {
      formObj.isFormValid = formObj.checkInputValidity();
      if (formObj.isFormValid) {
        if (formObj.name == "register-form") {
          let successMessageHtml = document.getElementById(
            "account-success-created-message"
          );
          successMessageHtmlChildren(
            successMessageHtml,
            "Account has been created with Success!",
            "Congrats! your account has been created, you'll be forwarded to the home page..."
          );
          successMessageHtml.classList.add("active-success-message");
          await sleep(12000);
        }
        formObj.htmlElement.submit();
      } else {
        return false;
      }
    },
  };
})(window);

function sleep(lf_ms) {
  return new Promise((resolve) => setTimeout(resolve, lf_ms));
}

function successMessageHtmlChildren(parent, title, message) {
  let messageTitle = document.createElement("h2");
  messageTitle.textContent = title;

  let messageBody = document.createElement("p");
  messageBody.textContent = message;
  parent.appendChild(messageTitle);
  parent.appendChild(messageBody);
}
