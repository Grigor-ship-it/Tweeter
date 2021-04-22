/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Loops through our database and prepends existing tweets and any future tweets.
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

//Function to help escape text to prevent XSS attacks
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Our function which creates our tweets based off the established data it fetches.
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
</article>`);

  return $tweet;

};

//our get function to load tweets into our page.
const loadTweets = function() {
  $.get("/tweets/", function(data, status) {
    renderTweets(data);
  });
};


//our Dom ready function which loads tweets on submission and displays errors if there are any.
$(document).ready(function() {
  
  loadTweets();

  $("form").submit(function(event) {
  
    event.preventDefault();
 
    $(".error").remove();
    const textArea = $("#tweet-text").val();

    if (!textArea) {
      $(".container").append(`<div class="error">Your Tweet is empty. Cannot Tweet empty string.</div>`);
      $(".error").addClass("error-message");
      $(".error").slideDown();
      return;
    }

    let text = $(this).serialize();
  
 
    $.ajax("/tweets/", {method: "POST",data: text})
      .then(() => {
        loadTweets();
      }
 
      );
  
  
    timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  
    $("#tweet-text").val('');
    $(".counter").val(140);
  
  });
});


