$(function (){
  console.log('Document loaded');

  getSongs();
  $('#addSong').on('submit', addSong);
});

function getSongs(){
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs

  });
}
function addSong(event){
  //stop the browser from trying to navigate away from our page
  //only needs this to prevent the default web browser function
  //usually just used for forms.
  event.preventDefault();
  //get the information out of the form
  var songData = $(this).serialize();
  console.log(songData);

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    sucess: getSongs
  })
}
 function displaySongs(songs){
   console.log(songs);

   $('#songs').empty();

   songs.forEach(function(song){
     $('#songs').append('<li>' + song.title + ' by ' +
     song.artist + ' from album ' + song.album + ' added on ' + song.dateAdded + '</li>');
   });
 }
