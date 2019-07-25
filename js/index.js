document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('github-form');
  searchForm.addEventListener('submit', getUserSearch);
});

const url = "https://api.github.com/search/users?q="


function getUserSearch(e) {
  e.preventDefault();
  let user = e.target[0].value;
  return fetch(`https://api.github.com/search/users?q=${user}`)
  .then(res => res.json())
  .then(json => getUserData(json));
  console.log(json);
}

function getUserData(json) {


}

function displayUser() {

  const userUl = document.getElementById('user-list')
  let li = document.createElement('li')
  userUl.appendChild(li)
  //create elements for displaying user in github-container, under ul id 'user-list'
}
//(You might include showing their username, avatar and a link to their
// profile.)

avatar_url: "https://avatars3.githubusercontent.com/u/583231?v=4"
events_url: "https://api.github.com/users/octocat/events{/privacy}"
followers_url: "https://api.github.com/users/octocat/followers"
following_url: "https://api.github.com/users/octocat/following{/other_user}"
gists_url: "https://api.github.com/users/octocat/gists{/gist_id}"
gravatar_id: ""
html_url: "https://github.com/octocat"
id: 583231
login: "octocat"
node_id: "MDQ6VXNlcjU4MzIzMQ=="
organizations_url: "https://api.github.com/users/octocat/orgs"
received_events_url: "https://api.github.com/users/octocat/received_events"
repos_url: "https://api.github.com/users/octocat/repos"
score: 174.55942
site_admin: false
starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}"
subscriptions_url: "https://api.github.com/users/octocat/subscriptions"
type: "User"
url: "https://api.github.com/users/octocat"
