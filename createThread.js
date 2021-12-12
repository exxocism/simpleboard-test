window.addEventListener("DOMContentLoaded", async (event) => {

    let tokenInfo;
    try {
        tokenInfo = await getTokenInfo();
    } catch (error) {
        window.location.href = "/login";
    }
    
    const writeButton = document.querySelector(".write");
    writeButton.addEventListener("click", async (event) => {
        const subject = document.querySelector(".title").value;
        const content = document.querySelector(".context").value;
        const category = document.querySelector("#tags").value;

        if( !subject ) {
            alert("제목을 입력해주세요.");
            return;
        }

        if( !content ) {
            alert("내용을 입력해주세요.");
            return;
        }

        if( !category ) {
            alert("카테고리를 선택해주세요.");
            return;
        }
        const form = document.querySelector("#article");
        form.submit();
    });
    console.dir(tokenInfo);
});