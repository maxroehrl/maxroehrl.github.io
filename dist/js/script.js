$(document).ready(function(){$(".navbar > a").on("click",function(t){var a=this.hash;""!==a&&(t.preventDefault(),$("html, body").animate({scrollTop:$(a).offset().top},800,function(){window.location.hash=a}))}),$("main a[href ^= 'http']").attr("target","_blank");var t=$("#overlay");$("img").click(function(){t.fadeTo(600,1).css({backgroundImage:"url("+this.src+")"})}),t.click(function(){$(this).stop().fadeTo(600,0,function(){$(this).hide()})})});
//# sourceMappingURL=script.js.map
