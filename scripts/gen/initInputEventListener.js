function initInputEventListener(formObject, inputFieldsList) {
  for (const input of inputFieldsList) {
    let inputObj = formObject[input];
    inputObj.htmlElement.addEventListener("input", function () {
      inputObj.value = this.value;
    });
  }
}
