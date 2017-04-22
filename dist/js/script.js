$(document).ready(function(){$(".navbar > a").on("click",function(t){var a=this.hash;""!==a&&(t.preventDefault(),$("html, body").animate({scrollTop:$(a).offset().top},800,function(){window.location.hash=a}))}),$("main a[href ^= 'http']").attr("target","_blank")});
//# sourceMappingURL=script.js.map
