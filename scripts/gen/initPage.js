function initPage(formObject) {
  let pageCookie = getCookie("form");

  if (!pageCookie) {
    setCookie("form", '{"gender": "Male", "styleMode":"light"}' + ";path=/");
    pageCookie = getCookie("form");
  }

  window.pageCookie = pageCookie;

  updatePage(formObject);
}

function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + 50 * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}

function getCookie(key) {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? JSON.parse(keyValue[2]) : null;
}

function updatePage(formObject) {
  let gender = window.pageCookie.gender;
  let styleMode = window.pageCookie.styleMode;
  let passwordInput = formObject.password.value == "" ? "" : "_ce";

  let pageObjects = {
    profileImg: {
      htmlElem: document.getElementById("form-profile-image")
        ? document.getElementById("form-profile-image")
        : null,
      src:
        pageCookie.gender == "Male"
          ? "../../assets/images/student_" +
            styleMode +
            "_" +
            "Male" +
            passwordInput +
            ".png"
          : "./../../assets/images/student_" +
            styleMode +
            "_" +
            "Female" +
            passwordInput +
            ".png",
    },
    genderToggleHtml: {
      htmlElem: document.getElementById("change-gender-style")
        ? document.getElementById("change-gender-style").children[0]
        : null,
      src:
        pageCookie.gender == "Male"
          ? "./../../assets/images/student_" + styleMode + "_" + "Female.png"
          : "./../../assets/images/student_" + styleMode + "_" + "Male.png",
    },
    styleModeHtml: {
      htmlElem: document.getElementById("style-mode")
        ? document.getElementById("style-mode").children[0]
        : null,
      src:
        pageCookie.styleMode == "light"
          ? "./../../assets/images/dark-mode.png"
          : "./../../assets/images/light-mode.png",
    },
  };

  for (const pageObject in pageObjects) {
    if (pageObjects[pageObject]) {
      let pageObjectElem = pageObjects[pageObject];
      if (pageObjectElem.htmlElem) {
        pageObjectElem.htmlElem.src = pageObjectElem.src;
      }
    }
  }

  changeStyle(gender, styleMode);

  let nextCookie = {
    gender: gender,
    styleMode: styleMode,
  };
  setCookie("form", JSON.stringify(nextCookie) + ";path=/");
}

function changeStyle(gender, styleMode) {
  let currentPageStyle = {
    gender: gender == "Male" ? "Female" : "Male",
    styleMode: styleMode == "light" ? "dark" : "light",
  };

  let nextPageStyle = {
    gender: gender,
    styleMode: styleMode,
  };

  function getStyle({ gender, styleMode }) {
    return (style = {
      mainColor: "var(--main-" + styleMode + "-" + gender + "-color)",
      secondaryColor: "var(--secondary-" + styleMode + "-" + gender + "-color)",
      thirdColor: "var(--third-" + styleMode + "-" + gender + "-color)",
      textMainColor: "var(--main-" + styleMode + "-color)",
      textSecondaryColor:
        "var(--main-" + currentPageStyle.styleMode + "-color)",
      mainGreenColor: "var(--main-" + styleMode + "-green-color",
      secondaryGreenColor: "var(--secondary-" + styleMode + "-green-color",
      thirdGreenColor: "var(--third-" + styleMode + "-green-color",
      mainErrorColor: "var(--main-" + styleMode + "-error-color",
      secondaryErrorColor: "var(--secondary-" + styleMode + "-error-color",
    });
  }

  let currentStyle = getStyle(currentPageStyle);
  let nextStyle = getStyle(nextPageStyle);

  let documentStye = document.documentElement.style;
  documentStye.setProperty("--main-color", nextStyle.mainColor);
  documentStye.setProperty("--secondary-color", nextStyle.secondaryColor);
  documentStye.setProperty("--third-color", nextStyle.thirdColor);
  documentStye.setProperty("--main-text-color", nextStyle.textMainColor);
  documentStye.setProperty(
    "--secondary-text-color",
    currentStyle.textSecondaryColor
  );
  documentStye.setProperty("--main-green-color", nextStyle.mainGreenColor);
  documentStye.setProperty(
    "--secondary-green-color",
    nextStyle.secondaryGreenColor
  );
  documentStye.setProperty("--third-green-color", nextStyle.thirdGreenColor);
  documentStye.setProperty("--main-error-color", nextStyle.mainErrorColor);
  documentStye.setProperty(
    "--secondary-error-color",
    nextStyle.secondaryErrorColor
  );

  let controlHtmlElems = document.getElementsByClassName(
    "hover-circle-showoff"
  );

  for (const controlHtmlElem of controlHtmlElems) {
    controlHtmlElem.style.backgroundColor =
      controlHtmlElem.parentNode.id == "change-gender-style"
        ? getStyle({
            gender: currentPageStyle.gender,
            styleMode: nextPageStyle.styleMode,
          }).secondaryColor
        : getStyle({
            gender: nextPageStyle.gender,
            styleMode: currentPageStyle.styleMode,
          }).secondaryColor;
  }
}
