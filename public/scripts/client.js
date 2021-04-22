/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/*const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
} */

const renderTweet = function(tweets) {

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
// make div with ID perhaps or use existing ID for tweets container
// $("#tweets").append(<h1> tweet </h1>)   make sure h1 is already created
// copy paste our HTML entire all tweet container 
// grab disc/title etc from object traversal
// user.name, user.avatars for img. user.handle use template literals to inject into HTML etc..
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
     $('#tweets-container').prepend(createTweetElement(tweet));
  }
}
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(data) {
  const username = data.user.name;
  const avatar = data.user.avatars;
  const handle = data.user.handle;
  const tweetContent = data.content.text;
  const date = data.created_at;


let $tweet =     
(`<article class="all-tweets">
<header>
<div><img src="${avatar}"></img>
  <output name="username" class="username" for="all-tweets">${username}</output> </div>
  <output name="loginfo" class="loginfo" for="all-tweets">${handle}</output>
</header>
<div class="tweet-message">${escape(tweetContent)}</div>
<footer><span class="need_to_be_rendered" datetime="${date}">${moment(data.created_at).fromNow()}</span>
  <div class="icons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
</div>
</footer>
</article>`)

return $tweet 

}

const loadTweets = function() {
  $.get("/tweets/", function(data, status) {
    renderTweets(data)
  })
}

$(document).ready(function() {
  

loadTweets();







$("form").submit(function( event ) { 
  
  event.preventDefault();
 
  $(".error").remove();
  const textArea = $("#tweet-text").val();

  if (!textArea) {
    $(".container").append(`<div class="error">Your Tweet is empty. Cannot Tweet empty string.</div>`)
    $(".error").addClass("error-message");
    $(".error").slideDown() 
    return
  }

  let text = $( this ).serialize()
  
 
  $.ajax( "/tweets/", {method: "POST",data: text})
  .then(() => {loadTweets()}
 
  )
  
  
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  
  $("#tweet-text").val('');
  $(".counter").val(140);
  
});
})


