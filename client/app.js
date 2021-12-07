const rootURL = "http://localhost:5000/api/"

let posts = [];

const getPosts = async () => {
    const res = await fetch(`${rootURL}getposts`);
    const data = await res.json();
    posts = data.posts;
    document.querySelector("#posts").innerHTML = posts.map(post => `<div>
        <h3>${post.title}</h3>
        <p>${post.content}</p>
    </div>`).join("");
};

window.addEventListener("load", getPosts)