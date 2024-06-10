var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginBtn = document.getElementById("loginBtn");
var loginEmail = document.getElementById("loginEmail");
var sgininLink = document.getElementById("signinLink");
var loginInputs = document.querySelectorAll("#loginForm .login-input");
var currentAccount;
var accounts = JSON.parse(localStorage.getItem("accounts"));
console.log(accounts);

function checkInput(element) {
  var regex = {
    name: /[a-zA-Z]{4,12}$/,
    signupEmail: /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/gm,
    signupPassword: /[A-Za-z0-9]{8,15}$/,
    loginPassword: /[A-Za-z0-9]{8,15}$/,
    loginEmail: /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[\.][a-z]+$)/gm,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("valid");
    element.classList.remove("invalid");
    element.nextElementSibling.classList.add("hidden");
  } else {
    element.classList.add("invalid");
    element.classList.remove("valid");
  }
}

for (var i = 0; i < loginInputs.length; i++) {
  loginInputs[i].addEventListener("input", function () {
    checkInput(this);
  });
}

function checkCurrentAccount(el1, el2, account, arr) {
  var validAccount;
  for (var i = 0; i < arr.length; i++) {
    if (
      arr[i].email === account.email &&
      arr[i].signupPassword === account.password
    ) {
      validAccount = arr[i];
      break;
    }
  }
  if (validAccount) {
    return validAccount;
  } else {
    el1.nextElementSibling.classList.remove("hidden");
    el1.classList.add("invalid");
    el1.nextElementSibling.innerHTML = "please enter a valid email";
    el2.classList.add("invalid");
    el2.nextElementSibling.classList.remove("hidden");
    return null;
  }
}

// function checkCurrentAccount(el1, el2, account, arr) {

//   for (var i = 0; i < arr.length; i++) {
//     if (
//       account.email !== arr[i].email ||
//       account.password !== arr[i].password
//     ) {
//       el1.nextElementSibling.classList.remove("hidden");
//       el1.classList.add("invalid");
//       el1.nextElementSibling.innerHTML = "please enter a valid email";
//       el2.classList.add("invalid");
//       el2.nextElementSibling.classList.remove("hidden");

//       el2.nextElementSibling.innerHTML = "please enter a valid password";
//     } else if (account.email === arr[i].email) {
//       el1.nextElementSibling.classList.remove("hidden");
//       el1.classList.add("invalid");
//       el1.nextElementSibling.innerHTML = "This email is already exists";
//     }
//   }
// }

loginBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  var currentAccount = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  var validAccount = checkCurrentAccount(
    loginEmail,
    loginPassword,
    currentAccount,
    accounts
  );

  // if (
  //   loginEmail.classList.contains("invalid") ||
  //   loginPassword.classList.contains("invalid")
  // ) {
  //   loginEmail.nextElementSibling.classList.remove("hidden");
  //   loginPassword.nextElementSibling.classList.remove("hidden");
  // } else
  if (validAccount) {
    localStorage.setItem("currentAccount", JSON.stringify(validAccount));
    window.location.href = "home.html";
  }
});
