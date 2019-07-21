let searchUser = null;
let searchRepo = null;
const searchUrl =  "https://api.github.com/search/users?q=";
const searchRepoUrl =  "https://api.github.com/search/repositories?q=";


function getSearchContent() {
  const submitButton1 = document.getElementById('search-user');
  const submitButton2 = document.getElementById('search-repo');
  const input = document.querySelector('#search');
  submitButton1.addEventListener('click', function(e) {
    e.preventDefault();
    searchUser = input.value;
    fetchSearchUserData();
  });

  submitButton2.addEventListener('click', function(e) {
    e.preventDefault();
    searchRepo = input.value;
    fetchSearchRepoData();
  });
}

function fetchSearchRepoData() {
  fetch(searchRepoUrl + searchRepo)
  .then(resp => resp.json())
  .then(json => renderSearchRepoList(json))
}

function renderSearchRepoList(json) {
  const ul = document.getElementById('repos-list');
  json.items.forEach(repo => {
    const name = repo.description;
    const repoUrl = repo.html_url;
    const li = document.createElement('li');
    const aTag = document.createElement('a');
    aTag.href = repoUrl;
    aTag.innerText = name;
    li.appendChild(aTag);
    ul.appendChild(li);
  })
}

function fetchSearchUserData() {
  fetch(searchUrl + searchUser)
  .then(resp => resp.json())
  .then(json => renderSearchList(json))
}

function renderSearchList(json) {
  const ul = document.getElementById('user-list');
  json.items.forEach(user => {
    const userName = user.login;
    const imgUrl = user.avatar_url;
    const li = document.createElement('li');
    const avatar = document.createElement('img');
    li.innerText = userName;
    avatar.src = imgUrl;
    ul.appendChild(li);
    ul.appendChild(avatar);
    li.addEventListener('click', function(e) {
      createUserProfile();
    })
  })
}

function createUserProfile() {
  const ul = document.getElementById('repos-list');
  fetch(`https://api.github.com/users/${searchUser}/repos`)
  .then(resp => resp.json())
  .then(json => renderRepos(json, ul));
}

function renderRepos(json, ul) {
  json.forEach(repo => {
    const name = repo.name;
    const repoUrl = repo.html_url;
    const li = document.createElement('li');
    const aTag = document.createElement('a');
    aTag.href = repoUrl;
    aTag.innerText = name;
    li.appendChild(aTag);
    ul.appendChild(li);
  })
}



document.addEventListener('DOMContentLoaded', function() {
  getSearchContent();
});