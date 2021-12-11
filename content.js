window.addEventListener("DOMContentLoaded", (event) => {
  const endpoint = "https://boardapi.eax.kr:4500";

  // check if a user is logged in
  let fetchURL = `${endpoint}/users/userinfo`;
  fetch(fetchURL, { method: "GET", credentials: "include" })
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

  //get parameter from address bar
  let urlParams = new URLSearchParams(window.location.search);
  const fetchID = urlParams.get("id");
  if (fetchID === null) {
    const article = document.getElementById("article");

    const articleName = document.createElement("div");
    articleName.classList.add("articleName");
    articleName.textContent = "400 Bad Request, redirecting...";
    article.appendChild(articleName);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
    return;
  }

  //fetch data from api
  fetchURL = `${endpoint}/border/view?border_idx=${fetchID}`;
  // fetchURL = `reference/mockupArticle${fetchID}.json`;
  fetch(fetchURL)
    .then((res) => res.json())
    .then((articleData) => {
      const forumTag = document.getElementsByClassName("forumTag")[0];
      forumTag.textContent = articleData.category;

      const article = document.getElementById("article");

      const articleName = document.createElement("div");
      articleName.classList.add("articleName");
      articleName.textContent = articleData.subject;
      article.appendChild(articleName);

      const tagsAndCommentCount = document.createElement("div");
      tagsAndCommentCount.classList.add("tagsAndCommentCount");
      const tag = document.createElement("div");
      tag.id = "tag";
      tag.innerHTML = `<i class="fa-solid fa-hashtag"></i> ${articleData.category}`;
      tagsAndCommentCount.appendChild(tag);

      const commentCount = document.createElement("div");
      commentCount.classList.add("commentCount");
      commentCount.innerHTML = `<i class="fa-regular fa-comments"></i> ${articleData.reply_count}`;
      tagsAndCommentCount.appendChild(commentCount);
      article.appendChild(tagsAndCommentCount);

      const hr = document.createElement("hr");
      article.appendChild(hr);

      const nameAndTime = document.createElement("div");
      nameAndTime.classList.add("nameAndTime");
      const name = document.createElement("div");
      name.id = "name";
      name.textContent = articleData.writer_name;
      nameAndTime.appendChild(name);

      const time = document.createElement("div");
      time.id = "time";
      time.textContent = new Date(articleData.modify_date).toLocaleDateString();
      nameAndTime.appendChild(time);
      article.appendChild(nameAndTime);

      const content = document.createElement("div");
      content.id = "content";
      content.textContent = articleData.content;
      article.appendChild(content);

      const hr2 = document.createElement("hr");
      article.appendChild(hr2);

      const comments = document.createElement("div");
      comments.classList.add("comments");
      const commentsMetadata = document.createElement("div");
      commentsMetadata.classList.add("commentsMetadata");
      commentsMetadata.innerHTML = `<i class="fa-regular fa-comments"></i> <span class="commentCount">${articleData.reply_count}</span> Replies`;
      comments.appendChild(commentsMetadata);
      article.appendChild(comments);

      /* for (const comment of articleData.comments) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.textContent = comment;
        article.appendChild(commentDiv);
      } */
    })
    .catch((err) => {
      const article = document.getElementById("article");

      const articleName = document.createElement("div");
      articleName.classList.add("articleName");
      articleName.textContent = "404 Not Found. redirecting...";
      article.appendChild(articleName);

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    });
});
