var welcomeMsg = document.getElementById("welcome");
var currentAccount;

if (localStorage.getItem("currentAccount")) {
  var currentAccount = JSON.parse(localStorage.getItem("currentAccount"));
  console.log(currentAccount.name);
  welcomeMsg.innerHTML = `Hello ${currentAccount.name
    .split(" ")
    .splice("0", "1")
    .join("")}`;
}
