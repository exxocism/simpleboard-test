const submitBtn = document.querySelector(".submit-btn");
const passInput = document.querySelector('input[name="password"]');
const confirmPassInput = document.querySelector(
  'input[name="confirm-password"]'
);
const email = document.querySelector('input[name="email"]');
const form = document.querySelector(".signup");
const usernameErrMsg = document.querySelector(".error-message.username");
const emailErrMsg = document.querySelector(".error-message.email");
const passwordErrMsg = document.querySelector(".error-message.password");

confirmPassInput.addEventListener("keyup", (e) => {
  const value = e.target.value;
  if (passInput.value !== value) {
    passwordErrMsg.style.display = "block";
    passwordErrMsg.textContent = "Password does not match.";
  } else {
    passwordErrMsg.style.display = "none";
  }
});

function isValidEmail() {}

submitBtn.addEventListener("click", (e) => {
  // console.log(email.validity.valid);
  e.preventDefault();
  form.submit();
});

let urlParams = new URLSearchParams(window.location.search);
const errorId = urlParams.get("error");
if (errorId === "0") {
  usernameErrMsg.style.display = "block";
  usernameErrMsg.textContent = "The user name is already in use.";
} else if (errorId === "1") {
  emailErrMsg.style.display = "block";
  errorMessage.textContent = "The email address is already in use.";
} else if (errorId === "2") {
  emailErrMsg.style.display = "block";
  errorMessage.textContent = "The email address is not valiable.";
}
