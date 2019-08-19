(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  // Handle Nivite rendering
  var elemArray = document.getElementsByTagName("nelem-nivite");
  if (elemArray && elemArray.length) {
    var elem = elemArray[0];
    elem.addEventListener("login", function (userevent) {
      if (userevent.detail) {
        console.log('logged in as: ' + userevent.detail.displayName + ' - ' + userevent.detail.email);
      } else {
        console.log('logoff event');
      }
    }, false);
    elem.addEventListener("invite", function (inviteevent) {
      if (inviteevent.detail) {
        var invite = inviteevent.detail;
        var sd = new showdown.Converter();
        console.log('invite: ' + JSON.stringify(invite));
        $("#n3title").text(invite.title);
        $("#n3LongMsg").html(sd.makeHtml(invite.longMsg));
        $("#n3ShortMsg").text(invite.shortMsg);
        $("#n3AddrText").text(invite.addrText);
        $("#n3timeFrom").text(invite.timeFromString);
        $("#n3timeTo").text(invite.timeToString);
        $("#n3HostPhno").text(invite.hostPhno);
        $("#n3HostEmail").text(invite.hostEmail);

        if (invite && invite.photos && invite.photos.length) {
          invite.photos.forEach(function (photo) {
            if (photo.tags && photo.tags.length) {
              photo.tags.forEach(function (tag) {
                if (tag && ('bg' === tag.toLowerCase() || 'background' === tag.toLowerCase())) {
                  $("header.masthead").css("background-image", "linear-gradient(to bottom, #{fade-out($brown, .2)} 0%,#{fade-out($brown, .2)} 100%), url('" + photo.url + "')");
                  $("header.masthead").css("background-image", "-webkit-gradient(linear, left top, left bottom, from(rgba(92, 77, 66, 0.8)), to(rgba(92, 77, 66, 0.8))), url('" + photo.url + "')");
                }
              });
            }
          });
        }
      }
    }, false);
    elem.addEventListener("guest", function (guestevent) {
      if (guestevent.detail) {
        console.log('guest event: ' + JSON.stringify(guestevent.detail));
      }
    }, false);
  }
})(jQuery); // End of use strict
