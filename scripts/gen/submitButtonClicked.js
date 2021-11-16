(function (window) {
  // set something to the global object
  window.commonFunctions = {
    submitButtonClicked: async function (formObj) {
      formObj.isFormValid = formObj.checkInputValidity();
      if (formObj.isFormValid) {
        if (formObj.name == "register-form") {
          document
            .getElementById("account-success-created-message")
            .classList.add("active-success-message");
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
