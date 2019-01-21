$(document).ready(function () {
    // Scroll to the id if a navigation link is clicked.
    $(".navbar > a").on("click", function (event) {
        var hash = this.hash;
        if (hash !== "") {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
    $("main a[href ^= 'http']").attr("target", "_blank");

    // Image overlay
    var overlay = $("#overlay");

    $("img").click(function () {
        overlay.fadeTo(600, 1).css({
            backgroundImage: "url(" + this.src + ")"
        });
    });
    overlay.click(function () {
        $(this).stop().fadeTo(600, 0, function () {
            $(this).hide();
        });
    });
});
