const rootURL = "http://localhost:5000/api/"

let posts = [];

//Respons message
const showResponseMessage = (message) => {
        document.querySelector("#response-message").style.display = "block"
        document.querySelector("#response-message").innerHTML = message;

    setTimeout(() => {
        document.querySelector("#response-message").innerHTML = "";
        document.querySelector("#response-message").style.display = "none"
    }, 1000);
}

//GET POSTS
const getPosts = async () => {
    const res = await fetch(`${rootURL}getposts`);
    const data = await res.json();
    posts = data.posts;
    document.querySelector(".forum-topics").innerHTML = posts.map(post => `
    <div id="post">
        <div class="post-message">
            <h4 id="'${post._id}'-title">${post.title}</h4>
            <p id="'${post._id}'-content">${post.content}</p>
        </div>
        <div class="post-rightside">
            <div class="post-edit">
                <a class="update-icon" onclick="showUpdateForm('${post._id}')"><i class="fas fa-cog"></i></a>
                <a class="delete-icon" onclick="deletePost('${post._id}')"><i class="fas fa-trash-alt"></i></a>
            </div>
            <div class="post-user">
                <h4 id="'${post._id}'-username">${post.username}</h4>
                <h4 id="'${post._id}'-email">${post.email}</h4>
            </div>
        </div>
        <div id="forum-update-${post._id}" class="forum-update-form">
                    <span class="form-modal-exit"><a onclick="exitFormModal()"><i class="fas fa-times"></i></a></span>
                    <h2>Update post</h2>
                    <form id="update-form" onsubmit="updatePost('${post._id}'); return false;">
                    <div class="update-form-field">
                        <input id="update-post-'${post._id}'-title" placeholder="Subject">
                    </div>
                    <div class="update-form-field">
                        <textarea id="update-post-'${post._id}'-content" placeholder="Message"></textarea>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </div>
                </div>`).join("");
            };


            //NEW POST
            const newPost = async () => {
    const email = document.querySelector("#post-email").value;
    const username = document.querySelector("#post-username").value;
    const title = document.querySelector("#post-title").value;
    const content = document.querySelector("#post-content").value;
    
    const post = {
        email,
        username,
        title,
        content
    };
    
    const res = await fetch(`${rootURL}newpost`,{
        method: "post",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    document.getElementsByClassName("form-modal")[0].style.display = "none"
    getPosts();
    showResponseMessage(data.message.msgBody)
    
    document.querySelector("#post-email").value = "";
    document.querySelector("#post-username").value = "";
    document.querySelector("#post-title").value = "";
    document.querySelector("#post-content").value = "";
}

//UPDATE POST
const updatePost = async (id) => {
    const title = document.getElementById(`update-post-'${id}'-title`).value;
    const content = document.getElementById(`update-post-'${id}'-content`).value;
    
    const post = {
        title: title ? title : document.getElementById(`'${id}'-title`).innerHTML,
        content: content ? content : document.getElementById(`'${id}'-content`).innerHTML,
    };
    
    const res = await fetch(`${rootURL}updatepost/${id}`, {
        method: "put",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    getPosts();
    showResponseMessage(data.message.msgBody)
}

const showUpdateForm = (id) => {
    const updateForm = document.getElementById("forum-update-"+id);
    updateForm.style.display = "block";
}

//DELETE POST
const deletePost = async (id) => {
    const res = await fetch(`${rootURL}deletepost/${id}`, {
        method: "delete",
    });
    const data = await res.json();
    getPosts();
    showResponseMessage(data.message.msgBody);
}


window.addEventListener("load", getPosts)



//FORM MODAL
const formModal = document.getElementsByClassName("form-modal")[0];
const mainPage = document.getElementById("content-container");
const updateForm = document.getElementsByClassName("forum-update-form")[0];

const showForm = () => {
    formModal.style.display = "block";
}

const exitFormModal = () => {
    formModal.style.display = "none";
    updateForm.style.display = "none";
}

let myIndex = 0;
carousel();

function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

