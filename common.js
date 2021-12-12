const endpoint = "https://boardapi.eax.kr:4500";
let loggedIn = false;

function getTokenInfo() {
  return new Promise((resolve, reject) => {
    // check if a user is logged in
    let fetchURL = `${endpoint}/users/userinfo`;
    fetch(fetchURL, { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((response) => {
        const userName = document.querySelector(".username");
        const loginOrLogout = document.querySelector(".loginOrLogout");

        userName.innerHTML = `Logged in as <span style="color:blue;font-weight:bold;">${response.name}</span>`;
        loginOrLogout.innerHTML = `<a href="${endpoint}/users/logout">Logout <i class="fa-solid fa-power-off"></i></a>`;
        loggedIn = true;
        resolve(response);
      })
      .catch((error) => {
        //do nothing
        reject(error);
      });
  });
}

function isLoggedIn() {
  return loggedIn;
}

window.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".mainImage");
  mainImage.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
