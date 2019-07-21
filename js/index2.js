function handleSearch(event) {
  event.preventDefault();
  let search = event.target.elements["search"].value
  loadUsers(search)
  .then(data => {
    displayUser(data.items[0])
    return data.items[0]}
  )
  .then(data => loadRepos(data))
}

function displayUser(data) {
  console.log(data  )
  let li = document.createElement("li");
  li.innerText = data.login

  let ul = document.getElementById('user-list');
  ul.appendChild(li);

  let img = document.createElement("img");
  img.src = data.avatar_url
  ul.appendChild(img)
}

function loadRepos(data) {
  return fetch(data.repos_url)
  .then(response => response.json())
  .then(banana => displayRepos(banana))
}

function createRepo(banana) {

  let li = document.createElement("li");
  li.innerText = banana.name

   let ul = document.getElementById('repos-list');
   ul.appendChild(li);
}


function displayRepos(bananas) {
  for(let i=0; i < bananas.length; i++){
    let banana = bananas[i]
    createRepo(banana)
  }
}

function loadUsers(search){
  return fetch(`https://api.github.com/search/users?q=${search}`)
  .then(response => response.json())
  .then(data => data)
}


function main() {
  let searchForm = document.getElementById('github-form');
  searchForm.addEventListener("submit", handleSearch)
}

main();
