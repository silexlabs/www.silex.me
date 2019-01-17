
/////////////
// info box
$(function() {
    setTimeout(function() {
        $('body').addClass('show-info');
    }, 15000)
    $('.fixed-info .button').click(function() {
        $('body').removeClass('show-info');
    })
})
/////////////
        ////////////////////////////////////
                    // github issues
                    var widgetScriptUrl = 'js/widgets.js';
                    if(typeof(Worker) !== 'undefined'){
                      // web workers supported
                      // create the worker
                      var worker = new Worker(widgetScriptUrl);
                      // define silex_github_widget
                      window.silex_github_widget = function (containerSelector, labels, imageMode) {
                        $(containerSelector).append('<p class="loading">Loading...</p>');
                        worker.postMessage({
                          operation: 'silex_github_widget',
                          selector: containerSelector,
                          labels: labels,
                          imageMode: imageMode
                        });
                      };
                      // define silex_rss_widget
                      window.silex_rss_widget = function (containerSelector, feedUrl, count) {
                        $(containerSelector).append('<p class="loading">Loading...</p>');
                        worker.postMessage({
                          operation: 'silex_rss_widget',
                          selector: containerSelector,
                          url: feedUrl,
                          count: count
                        });
                      }
                      // result of the web worker calls
                      worker.onmessage = function (event) {
                        $(event.data.selector+' p.loading').remove();
                        $(event.data.selector).append(event.data.html);
                      };
                    }
                    else{
                      // no web workers, so load the script
                      if (typeof console !== "undefined") console.error('NO WEBWORKER');
                      document.write('<script src="'+widgetScriptUrl+'"></'+'script>')
                    }

                    ////////////////////////////////////
                    // google analytics

                    ////////////////////////////////////
                    // google analytics
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                    ga('create', 'UA-19608894-23', 'auto');
                    ga('send', 'pageview');

                    // track links
                    $(function(){
                        $('a, [data-silex-href]').click(function(){
                            var text = $(this).text().trim();
                            var link = this.getAttribute('href') || this.getAttribute('data-silex-href');
                            var target = this.getAttribute('target') || this.getAttribute('data-silex-href');
                            trackLink(text, link, target);
                        });
                        function trackLink(text, url, target){
                            ga('send', 'event', 'outbound', 'link', text + ' (' + url +')', {'hitCallback':
                                function () {
                                    if (!target || target === 'self') {
                                        document.location = url;
                                    }
                                }
                            });
                        }
                    });
    
    $(function() {
        // this will be executed when the page is loaded
        var current = $('body').pageable('option').currentPage;
        $('body').addClass(current + '-opened');
        $('body').on('pageChanged', function (event, pageName) {
            // this will add a css class on the body, with the name of the page + '-opened'
            // e.g. open the page `page-test1` will add the css class `page-test1-opened` to the body
            $('body').addClass(pageName + '-opened');
            // remove previous one
            $('body').removeClass(current + '-opened');
            current = pageName;
        });
  
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 3000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });
});
/*
 * active menu widget for Silex
 * create an element which links to an anchor, e.g. an element with a link to #anchor1
 * add the css class "anchor-link" to this element
 * create an element which is the anchor, e.g. an element with the css class "anchor1"
 * when the user clicks on the link, the scroll slides until the element is visible
 * when the user slides and the element is visible, the link gets a css class "active-menu"
 */
$(function() {
    // Cache selectors
    var lastId,
        // All list items
        menuItems = $(".anchor-link"),
        // Anchors corresponding to menu items
        // find the name of the elements which are anchors
        scrollItems = menuItems.map(function(){
            // the names are in the href attribute of the anchor links
            var attr = $(this).attr("data-silex-href") || $(this).attr("href");
            // case of a link in text field or an external link after publish
            $(this).find("[href]").each(function() {
                attr = $(this).attr("href");
            });
            // case of an "external link" before publish
            $(this).find("[data-silex-href]").each(function() {
                attr = $(this).attr("href");
            });
            // the links to anchors are expected to start with #
            if(attr && attr.indexOf("#") === 0) {
                var name = attr.substring(1);
                var item = $("." + name);
                // check if there is a hash in the URL to scroll to the anchor at start
                if(window.location.hash.indexOf(name) === 1) {
                    var offsetTop = item.offset().top;
                    $('html, body').stop().animate({
                        scrollTop: offsetTop
                    }, 300);
                }
                // now find the element itself, which has the name as a css class
                if (item.length) { return {
                        "link": this,
                        "item": item.get(0)
                    };
                }
            }
        });
    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    scrollItems.each(function() {
        var link = this.link;
        var item = this.item;
        $(link).click(function(e){
          var offsetTop = $(item).offset().top - 25;
          $('html, body').stop().animate({
              scrollTop: offsetTop
          }, 300);
          e.preventDefault();
        });
    })

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop() + 50;
       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this.item).offset().top <= fromTop)
           return this;
       });
       // add the css class on the current menu item
       $(".active-menu").removeClass("active-menu");
       if(cur.length > 0) {
           cur = cur[cur.length-1];
           $(cur.link).addClass("active-menu");
       }
    });
});
    