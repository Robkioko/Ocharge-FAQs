/*
  Template Name: Voinss
  Version: 1.0
  Author: Allies Interactive
  Website: http://www.diziana.com/
  Corporate Website : http://www.diziana.com
  Contact: support@diziana.com
  Follow: https://www.twitter.com/dizianaEngage
  Like: https://www.facebook.com/diziana.engage
  Purchase: Diziana.com
  License: You must have a valid license purchased only from
  diziana.com in order to legally use the theme for your project.
  Copyright: © 2015 Allies Interactive Services Pvt. Ltd. All Rights Reserved
*/
$(function(){ 
	$(".dropdown-menu li a").click(function(){
	  $(this).parents(".btn-group").find('.selector').text($(this).text());
	  $(this).parents(".btn-group").find('.selector').val($(this).text());
	});
	$(".track").bind("touchstart", function(event){
        // alert(event.touches.length);
    });
});

$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
});
