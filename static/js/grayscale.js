(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

$(document).ready(function() {
  $('#contact-form').submit(function(e) {
    var name    = document.getElementById('inputName')
    var email   = document.getElementById('inputEmail')
    var message = document.getElementById('inputMessage')

    if (!name.value || !email.value || !message.value) {
      alertify.error("Please check your entries");
      return false;
    } else {
      $.ajax({
        method: 'POST',
        url: '//formspree.io/julian.a.garza11@gmail.com',
        data: $('#contact-form').serialize(),
        datatype: 'json'
      });
      e.preventDefault();
      $(this).get(0).reset();
      alertify.success("Message sent");
    }
  });
});

function getDataFromApi() {
    var status = document.getElementById("api_status");
    status.innerText = 'Fetching data from API...';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/pricing.json');
    xhr.setRequestHeader('Content-type','application/json')

    xhr.onload = function() {

        if (xhr.status === 200) {
            var apiResponse = JSON.parse(xhr.responseText);
            console.log(apiResponse);

            var apiData = document.getElementById("api_data");
            apiData.innerHTML = '';

            apiResponse.part.forEach(function(pricing) {
                addTable(pricing);
            });
            addTotal(apiResponse.total);
            status.innerText = '';
        }
        else {
            alert('Request failed. Returned status of ' + xhr.status);
            status.innerText = 'Error: Could not get data from API.';
        }
    };
    var e = document.getElementById("engine");
    var engine = e.options[e.selectedIndex].text;
    var w = document.getElementById("wheel");
    var wheel = w.options[w.selectedIndex].text;
    var wi = document.getElementById("window");
    var windows = wi.options[wi.selectedIndex].text;
    xhr.send(JSON.stringify({'engine':engine, 'wheel':wheel,'windows':windows}));
}

function addTable(pricing) {
    var apiData = document.getElementById("api_data");
        var table = document.createElement("p");
        table.classList.add("table");
        table.textContent = pricing.name;
        apiData.appendChild(table);

        var tableBody = document.createElement("div");
        tableBody.classList.add("table-body");
        tableBody.textContent = pricing.body;
        table.appendChild(tableBody);
}

function addTotal(total) {
     var totalData = document.getElementById("total_data");
            totalData.innerHTML = '';
            totalData.classList.add("table");

        var table2 = document.createElement("p2");
        table2.classList.add("table2","result");
        table2.textContent = "Total";
        totalData.appendChild(table2);

        var tableBody = document.createElement("div");
        tableBody.classList.add("table-body");
        tableBody.textContent = total;
        table2.appendChild(tableBody);

}






















