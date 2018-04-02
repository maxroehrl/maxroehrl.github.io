$(document).ready(function () {
    // Scroll to the id if a navigation link is clicked.
    $('.navbar > a').on('click', function (event) {
        var hash = this.hash;
        if (hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
    $("main a[href ^= 'http']").attr("target", "_blank");
});
