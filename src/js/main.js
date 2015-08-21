var jq = document.createElement('script');
jq.src = "../components/jquery/dist/jquery.js";
document.querySelector('head').appendChild(jq);

jq.onload = procede;

function procede()
{
  $( "#notMe" ).css( "border", "3px solid red" );
  $( "#notMe" ).click( function(){
    var n = noty({text: 'noty - a jquery notification library!'});
  })
}
