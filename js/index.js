usersApi = "https://api.github.com/search/users?q=";

function main() {
  let searchForm = document.getElementById("github-form");
  searchForm.addEventListener("submit", searchGit);
}

function searchGit(e) {
  e.preventDefault();
  let userInput = e.target.elements["search"].value;

  fetch(usersApi + userInput)
    .then(res => res.json())
    .then(json => {
      allUsers(json);
    });
}

function allUsers(users) {
  let ul = document.getElementById("user-list");

  userInfo = users.items[0];

  let userName = userInfo.login;
  let li = document.createElement("li");
  ul.appendChild(li);
  li.innerText = userName;

  let userPic = userInfo.avatar_url;
  let img = document.createElement("img");
  ul.appendChild(img);
  img.src = userPic;

  let userProfile = userInfo.url;

  let button = document.createElement("button");
  button.setAttribute("id", userProfile);
  ul.appendChild(button);
  button.innerText = `${userName}'s` + " Repos";
  button.addEventListener("click", fetchRepos);
}

function fetchRepos(e) {
  const userUrl = e.target.id;

  fetch(userUrl + "/" + "repos")
    .then(res => res.json())
    .then(json => {
      displayRepos(json);
    });
}

function displayRepos(userRepos) {
  let ul = document.getElementById("repos-list");




  for(i=0; i < userRepos.length; i++){
    let repo = userRepos[i]["name"];
    let li = document.createElement("li");
    li.innerText = repo
    ul.appendChild(li)
    // console.log(repo)
  }

}

main();
