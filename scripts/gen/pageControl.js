function updateGenderStyle(formObject) {
  let genderToggle = document.getElementById("change-gender-style");
  let nextGender;
  if (window.pageCookie.gender == "Male") {
    nextGender = "Female";
    window.pageCookie.gender = "Female";
  } else {
    nextGender = "Male";
    window.pageCookie.gender = "Male";
  }

  updatePage(formObject);
}

function updateStyleMode(formObject) {
  let styleMode = document.getElementById("style-mode");
  let nextStyleMode;
  if (window.pageCookie.styleMode == "light") {
    nextStyleMode = "dark";
    window.pageCookie.styleMode = nextStyleMode;
  } else {
    nextStyleMode = "light";
    window.pageCookie.styleMode = "light";
  }

  updatePage(formObject);
}
