window.addEventListener('DOMContentLoaded', (event) => {

    //get parameter from address bar
    let urlParams = new URLSearchParams(window.location.search);
    const fetchID = urlParams.get('id');
    if (fetchID === null) {
        const article = document.getElementById('article');

        const articleName = document.createElement('div');
        articleName.classList.add('articleName');
        articleName.textContent = "400 Bad Request, redirecting...";
        article.appendChild(articleName);

        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        return ;
    }
    console.log(fetchID);


    //fetch data from api
    const endpoint = `reference/mockupArticle${fetchID}.json`;
    fetch(endpoint).then( res => res.json() )
        .then( ({articleData}) => {
            const article = document.getElementById('article');

            const articleName = document.createElement('div');
            articleName.classList.add('articleName');
            articleName.textContent = articleData.name;
            article.appendChild(articleName);

            const tagsAndCommentCount = document.createElement('div');
            tagsAndCommentCount.classList.add('tagsAndCommentCount');
                const tag = document.createElement('div');
                tag.id = 'tag';
                tag.innerHTML = `<i class="fa-solid fa-hashtag"></i> ${articleData.tag}`;
                tagsAndCommentCount.appendChild(tag);

                const commentCount = document.createElement('div');
                commentCount.classList.add('commentCount');
                commentCount.innerHTML = `<i class="fa-regular fa-comments"></i> ${articleData.comments.length}`;
                tagsAndCommentCount.appendChild(commentCount);
            article.appendChild(tagsAndCommentCount);

            const hr = document.createElement('hr');
            article.appendChild(hr);

            const nameAndTime = document.createElement('div');
            nameAndTime.classList.add('nameAndTime');
                const name = document.createElement('div');
                name.id = 'name';
                name.textContent = articleData.author;
                nameAndTime.appendChild(name);
                
                const time = document.createElement('div');
                time.id = 'time';
                time.textContent = articleData.lastModified;
                nameAndTime.appendChild(time);
            article.appendChild(nameAndTime);

            const content = document.createElement('div');
            content.id = 'content';
            content.textContent = articleData.contents;
            article.appendChild(content);
            
            const hr2 = document.createElement('hr');
            article.appendChild(hr2);

            const comments = document.createElement('div');
            comments.classList.add('comments');
                const commentsMetadata = document.createElement('div');
                commentsMetadata.classList.add('commentsMetadata');
                commentsMetadata.innerHTML = `<i class="fa-regular fa-comments"></i> <span class="commentCount">${articleData.comments.length}</span> Replies`;
                comments.appendChild(commentsMetadata);
            article.appendChild(comments);

            for( const comment of articleData.comments ) {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.textContent = comment;
                article.appendChild(commentDiv);
            }

        })
        .catch( err => {
            const article = document.getElementById('article');

            const articleName = document.createElement('div');
            articleName.classList.add('articleName');
            articleName.textContent = "404 Not Found. redirecting...";
            article.appendChild(articleName);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
        });
});