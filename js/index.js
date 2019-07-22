
const gitUrl = `https://api.github.com/search/users?q=`
const reposUrl = 'https://api.github.com/users/'

//calls all the function
function main(){
    const form = document.getElementById("github-form")
    form.addEventListener("submit", function(e){
      e.preventDefault();
      let userList = document.getElementById("user-list")
  //clears the User currently displayed
      while (userList.firstChild){
        userList.removeChild(userList.firstChild);
      }
      username = e.target[0].value
      findUser(username)
      .then(user => displayUser(user))
    })
}

//fetches the user
function findUser(user){
  return fetch(gitUrl + user)
  .then(res => res.json())
}


//Displays the user on the front end
function displayUser(users){
  const user = users.items[0]
  const username = user.login
  const userImg =  user.avatar_url
  const userList = document.getElementById("user-list")
  const name = document.createElement("h2")
  name.innerText = username;
  const profilePic = document.createElement("img")
  profilePic.src = userImg;
  const repoButton = document.createElement("button")
  repoButton.innerText = "Show Repos"
  repoButton.addEventListener("click", function(e){
    fetchRepos(username)
    .then(repos => displayRepos(username,repos, repoButton))

  })

  userList.appendChild(name)
  userList.appendChild(profilePic)
  userList.appendChild(repoButton)
}

//fetches repos
function fetchRepos(user){
  return fetch(reposUrl + user + "/repos")
  .then(res => res.json())
}

//displays or hides all the repos
function displayRepos(username, repos, repoButton){
  let reposList = document.getElementById("repos-list")
  if (repoButton.innerText === "Show Repos"){
    repoButton.innerText = "Hide Repos"
  for (var i = 0; i < 10; i++){
      const repo = repos[i]
      console.log(repo)
      let repoName = repo.name
      let result = repoName.link(`https://github.com/${username}/${repoName}`)
      let li = document.createElement("li")
      li.innerHTML = result
      result.target = "_blank"
      reposList.appendChild(li)
    }
  }
  else if (repoButton.innerText === "Hide Repos") {
    repoButton.innerText = "Show Repos"
    while (reposList.firstChild){
      reposList.removeChild(reposList.firstChild);
    }
  }
}


document.addEventListener('DOMContentLoaded', (event) => {
    main();
});
