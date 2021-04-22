$(document).ready(function() {
  
  
  
  
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









