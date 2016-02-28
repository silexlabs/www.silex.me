
        // anchors and scrolling
                    $(function(){
                        newAnchorLink('home', 0);
                        newAnchorLink('showcase', 1322-10);
                        newAnchorLink('silex', 2437-10);
                        newAnchorLink('templates', 4107-10);
                        newAnchorLink('contact', 4754-10);
                    });
                    function newAnchorLink(link, pos){
                        $('a[href="#'+link+'"]').click(function(){
                            silexScrollTo(pos);
                            return false;
                        });
                        // check the hash at start
                        if(window.location.hash && window.location.hash === '#' + link) {
                            silexScrollTo(pos);
                        }
                    }
                    function silexScrollTo(pos) {
                        $('html, body').animate({
                            scrollTop: pos
                        }, 400);
                    }

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
});
    