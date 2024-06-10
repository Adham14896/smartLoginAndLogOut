var signupBtn = document.getElementById("signupBtn");
var nameInput = document.getElementById("name");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupLink = document.getElementById("signupLink");
var signupForm = document.getElementById("signupForm");
var signupInputs = document.querySelectorAll("#signupForm .signin-input");
var errorMsg = document.querySelector(".errormsg");
var accounts;

if (localStorage.getItem("accounts")) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
} else {
  accounts = [];
}

console.log(accounts);

function createAccount() {
  var account = {
    name: nameInput.value,
    email: signupEmail.value,
    signupPassword: signupPassword.value,
  };

  for (var i = 0; i < signupInputs.length; i++) {
    if (
      signupInputs[i].classList.contains("invalid") ||
      !signupInputs[i].value.length
    ) {
      signupInputs[i].classList.add("invalid");
      signupInputs[i].nextElementSibling.classList.remove("hidden");
    }
  }

  accounts.push(account);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  window.location.href = "login.html";
}

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

for (var i = 0; i < signupInputs.length; i++) {
  signupInputs[i].addEventListener("input", function () {
    checkInput(this);
  });
}

signupBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  createAccount();
});
