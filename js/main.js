$(document).ready(function(){

  var url;
  var twitchUserArr = ["freecodecamp", "riotgames", "Arteezy", "bmkibler", "ProfessorBroman", "ESL_SC2", "ESL_CSGO", "DreadzTV", "lirik", "brunofin", "OgamingSC2"];

  $(".button-online").on("click", function() {
    if ( $(".button-online").text().includes("Online Only") ) {
      $(".button-online").html("&nbsp;&nbsp;&nbsp;Show All&nbsp;&nbsp;&nbsp;")
    } else {
      $(".button-online").html("Online Only")
    }
    $("[class*=twitch-box-]").each(function(){
      // console.log($(this));
      if ( $(this).context.style.border != "3px solid green" ) {
        $(this).slideToggle(500);
      }
    });
  });  // close button click

  for (var i=0; i < twitchUserArr.length; i++){
    (function(i){
      $.ajax({
        url: "https://api.twitch.tv/kraken/streams/"+twitchUserArr[i],
        type: "GET",
        //data: {action: 'query', list: 'search', format: 'json'},
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(datastream) {
          //console.log(datastream);
          $.ajax({
            url: "https://api.twitch.tv/kraken/channels/"+twitchUserArr[i],
            type: "GET",
            //data: {action: 'query', list: 'search', format: 'json'},
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(datachannel) {
              var name = twitchUserArr[i];
              $(".results").append("<div class=twitch-box-"+i+">");
              $(".twitch-box-"+i).append("<div class=twitch-icon-"+i+">");
              $(".twitch-box-"+i).append("<div class=twitch-info-"+i+">");
              $(".twitch-icon-"+i).append("<img src='#' class=twitch-image-"+i+">");
              $(".twitch-info-"+i).append("<div class=twitch-username-"+i+">");

              if (datastream.stream === null) {
                $(".twitch-username-"+i).html(twitchUserArr[i]+" is offline at the moment.");
              } else if (datastream.error) {
                $(".twitch-username-"+i).html(twitchUserArr[i]+"'s account is closed or doesn't exist.");
              } else {
                $(".twitch-box-"+i).css("border", "3px solid green")
                $(".twitch-info-"+i).append("<div class=twitch-status-"+i+">");
                $(".twitch-info-"+i).append("<div class=twitch-game-"+i+">");
                $(".twitch-info-"+i).append("<div class=twitch-stream-create-"+i+">");
                $(".twitch-info-"+i).append("<div class=twitch-stream-viewers-"+i+">");
                $(".twitch-box-"+i).append("<div class=twitch-stream-preview-container-"+i+">");
                $(".twitch-stream-preview-container-"+i).append("<img src='#' class=twitch-stream-preview-"+i+">");
                $(".twitch-username-"+i).html(datastream.stream.channel.display_name+" is online!");
                $(".twitch-stream-create-"+i).html("<span style='color: yellow'>Stream Started: </span>"+new Date(datastream.stream.created_at).toLocaleString());
                $(".twitch-stream-viewers-"+i).html("<span style='color: yellow'>Viewers: </span>"+datastream.stream.viewers);
                $(".twitch-stream-preview-"+i).attr("src", datastream.stream.preview.medium);
                $(".twitch-status-"+i).html("<span style='color: yellow'>Status: </span>"+datachannel.status);
                $(".twitch-game-"+i).html("<span style='color: yellow'>Game: </span>"+datachannel.game);
              }

              (function(name){
                $(".twitch-box-"+i).on("click", (function(){
                  window.open("https://twitch.tv/"+name, 'mywindow');
                }));
              })(name); // use a closure to pass title variable correctly

              if (datachannel.logo === null || datastream.error) {
                $(".twitch-image-"+i).attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png");
              } else {
                $(".twitch-image-"+i).attr("src", datachannel.logo);
              }
            } // close success
          }); // second API call
        } // close success
      }); // first API call
    })(i);
  } // close for loop
}); // close document ready
