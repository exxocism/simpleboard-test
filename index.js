window.addEventListener('DOMContentLoaded', (event) => {
    // check if a user is authorized
    

    //fetch data from api
    const endpoint = 'reference/mockup.json';
    fetch(endpoint).then( res => res.json())
        .then( ({boarddata}) => {
            const threadStart = document.getElementById('board');
            for( thread of boarddata ){
                const threadElement = document.createElement('div');
                threadElement.classList.add('thread');

                const nameTag = document.createElement('div');
                nameTag.classList.add('nameTag');

                    const name = document.createElement('div');
                    name.classList.add('name');
                    name.innerHTML = `<a href="content.html?id=${thread.contentID}">${thread.name}</a>`;
                    nameTag.appendChild(name);
                    
                    const tag = document.createElement('div');
                    tag.classList.add('tag');
                    tag.textContent = thread.tag;
                    nameTag.appendChild(tag);

                threadElement.appendChild(nameTag);

                const authorAndTime = document.createElement('div');
                authorAndTime.classList.add('authorAndTime');

                    const author = document.createElement('div');
                    author.classList.add('author');
                    author.textContent = thread.author;
                    authorAndTime.appendChild(author);

                    const time = document.createElement('div');
                    time.classList.add('time');
                    time.textContent = thread.lastModified;
                    authorAndTime.appendChild(time);

                threadElement.appendChild(authorAndTime);

                const comments = document.createElement('div');
                comments.classList.add('comments');
                comments.textContent = thread.comments.length;
                threadElement.appendChild(comments);

                threadStart.appendChild(threadElement);
                const line = document.createElement('hr');
                threadStart.appendChild(line);
            }
        });
});