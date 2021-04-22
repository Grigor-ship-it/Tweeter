$(document).ready(function() {
  //timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  
  
  
  $('#tweet-text').on('input', function() {
    
    let remainingChars = 140 - $(this).val().length
    $(".counter").val(remainingChars)
   

    if (remainingChars < 0){
      $(".counter").addClass("red"); 
    
      $(".button").addClass("character-error"); 
    }


    if (remainingChars >= 0) {
      $(".counter").removeClass("red");
      $(".button").removeClass("character-error"); 
    }
   
    
    
   
    
  });
});









