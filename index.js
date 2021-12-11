window.addEventListener("DOMContentLoaded", (event) => {
  const endpoint = "https://boardapi.eax.kr:4500";

  // check if a user is logged in
  let fetchURL = `${endpoint}/users/userinfo`;
  fetch(fetchURL, { method: "GET", credentials: 'include' })
    .then((response) => response.json())
    .then((response) => {
      const userName = document.querySelector(".username");
      const loginOrLogout = document.querySelector(".loginOrLogout");

      userName.innerHTML = `Logged in as <span style="color:blue;font-weight:bold;">${response.name}</span>`;
      loginOrLogout.innerHTML = `<a href="${endpoint}/users/logout">Logout <i class="fa-solid fa-power-off"></i></a>`;
    })
    .catch((error) => {
      //do nothing
      console.dir(error);
    });

  //fetch data from api
  fetchURL = `${endpoint}/border/list`;
  // fetchURL = "reference/mockup.json";
  fetch(fetchURL)
    .then((res) => res.json())
    // .then(({ boarddata }) => {
    .then((boarddata) => {
      const threadStart = document.getElementById("board");
      for (thread of boarddata) {
        const threadElement = document.createElement("div");
        threadElement.classList.add("thread");

        const nameTag = document.createElement("div");
        nameTag.classList.add("nameTag");

        const name = document.createElement("div");
        name.classList.add("name");
        name.innerHTML = `<a href="content.html?id=${thread.border_idx}">${thread.subject}</a>`;
        nameTag.appendChild(name);

        const tag = document.createElement("div");
        tag.classList.add("tag");
        tag.textContent = thread.category;
        nameTag.appendChild(tag);

        threadElement.appendChild(nameTag);

        const authorAndTime = document.createElement("div");
        authorAndTime.classList.add("authorAndTime");

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = thread.writer_name;
        authorAndTime.appendChild(author);

        const time = document.createElement("div");
        time.classList.add("time");
        time.textContent = new Date(thread.modify_date).toLocaleDateString();
        authorAndTime.appendChild(time);

        threadElement.appendChild(authorAndTime);

        const comments = document.createElement("div");
        comments.classList.add("comments");
        comments.textContent = thread.reply_count;
        threadElement.appendChild(comments);

        threadStart.appendChild(threadElement);
        const line = document.createElement("hr");
        threadStart.appendChild(line);
      }
    });
});
