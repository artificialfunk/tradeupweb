(function($) {
    'use-strict';
    /* ---------------------------------------------- /*
     * Initialization general scripts for all pages
    /* ---------------------------------------------- */
    var mobile_test = false,
        inline_title = $('.inline-title'),
        layer_parallax = $('.layer-parallax'),
        menu_btn = $('.menu-btn'),
        scroll_to = $('a.scroll-to'),
        bg_img = $('.element-background-image'),
        parallax_background = $('.element-parallax'),
        popup_iframe = $('.popup-iframe'),
        bar_chart = $('#bar-chart'),
        doughnut_chart = $('#doughnut-chart'),
        brands_carousel = $('.owl-carousel.brands'),
        brands_items = parseInt($('.owl-carousel.brands').data('limits')),
        header_logo_white_svg = $('header svg#logo-white'),
        header_logo_colorful_svg = $('header svg#logo-colorful'),
        navbar_fixed = $('nav.navigation-clean.navbar-fixed-top'),
        navbar_search = $('.navigation-pushy input[type=search]'),
        navbar_transparent = $('nav.navbar-fixed-top.navbar-transparent'),
        showcase_col = $('.element-showcase .showcase-col'),
        instafeed = $('#instafeed');
    /* ---------------------------------------------- /*
     * Mobile detect
    /* ---------------------------------------------- */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile_test = true;
        $('body').addClass('mobile-device');
    } else {
        mobile_test = false;
    }
    /* ---------------------------------------------- /*
     * Load whenever the document is fully loaded
    /* ---------------------------------------------- */
    $(document).ready(function($) {
        /* ---------------------------------------------- /*
         *  Enable all tooltips in the document
        /* ---------------------------------------------- */
        $('[data-toggle="tooltip"]').tooltip();
        /* ---------------------------------------------- /*
         *  Auto-Hiding Navbar
        /* ---------------------------------------------- */
        if (navbar_fixed.length > 0) {
            if (Boolean(navbar_fixed.data('auto-hide')) === true) {
                navbar_fixed.autoHidingNavbar({
                    animationDuration: 100
                });
            }
        }
        /* ---------------------------------------------- /*
         *  Add "scrolled" class to navbar on page scroll
         *  Toggle between white & colorful logo on scroll
        /* ---------------------------------------------- */
        if (navbar_transparent.length > 0) {
            $(window).scroll(function() {
                var top_scroll = $(window).scrollTop(),
                    transparent_offset = parseInt(navbar_transparent.data('transparent-offset')),
                    start_y = navbar_fixed.height() * transparent_offset;
                if (top_scroll > start_y) {
                    navbar_transparent.removeClass('navbar-transparent');
                    if (header_logo_white_svg.length > 0 && header_logo_colorful_svg.length > 0) {
                        header_logo_white_svg.addClass('hidden-lg hidden-md');
                        header_logo_colorful_svg.removeClass('hidden-lg hidden-md');
                    }
                } else {
                    navbar_transparent.addClass('navbar-transparent');
                    if (header_logo_white_svg.length > 0 && header_logo_colorful_svg.length > 0) {
                        header_logo_white_svg.removeClass('hidden-lg hidden-md');
                        header_logo_colorful_svg.addClass('hidden-lg hidden-md');
                    }
                }
            }).scroll();
        } else {
            navbar_transparent.removeClass('navbar-transparent');
        }
        /* ---------------------------------------------- /*
         *  Toggle navbar search field on click
         *  Disable scroll jumping while clicking on links
        /* ---------------------------------------------- */
        if (navbar_search.length > 0) {
            $('#toggle-search').click(function(event){
                navbar_search.fadeToggle();
                event.preventDefault();
                event.stopPropagation();
            });
            if(menu_btn.length > 0) {
                menu_btn.click(function(event){
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        }
        /* ---------------------------------------------- /*
         * Parallax background image
        /* ---------------------------------------------- */
        if (parallax_background.length > 0) {
            parallax_background.each(function(){
                var bg_src = $(this).data('background');
                if (bg_src.length > 0) {
                    $(this).css('background-image', 'url(' + bg_src + ')');
                }
                $(this).jarallax({
                    speed: 0.2
                });
            });
        }
        /* ---------------------------------------------- /*
         * Static background image
        /* ---------------------------------------------- */
        if (bg_img.length > 0) {
            bg_img.each(function(){
                var bg_src = $(this).data('background'),
                    bg_pos = ($(this).data('background-position')) ? $(this).data('background-position') : 'center center',
                    bg_siz = ($(this).data('background-size')) ? $(this).data('background-size') : 'cover';
                if (bg_src.length > 0) {
                    $(this).css({'background-image' : 'url(' + bg_src + ')', 'background-position' : bg_pos, 'background-size' : bg_siz});   
                }
            });
        }
        /* ---------------------------------------------- /*
         * Smooth scroll to section or div
        /* ---------------------------------------------- */
        if ($(scroll_to).length > 0) {
            $(scroll_to).click(function(event) {
                var target = '#';
                target += $(this).data('scroll-to');
                if ($(target).length > 0) {
                    $('html, body').stop().animate({
                        scrollTop: $(target).offset().top
                    }, 900, 'swing');
                }
                event.preventDefault();
                return;
            });
        }
        /* ---------------------------------------------- /*
         *  Displaying iframe content on Magnific Popup
        /* ---------------------------------------------- */
        if (popup_iframe.length > 0) {
            popup_iframe.magnificPopup({
                disableOn: 768,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 500,
                preloader: true
            });
        }
        /* ---------------------------------------------- /*
         *  Adjusting inline title position dynamically
        /* ---------------------------------------------- */
        if (inline_title.length > 0) {
            inline_title.each(function() {
                var top = ($(this).data('top')) ? $(this).data('top') : '',
                    left = ($(this).data('left')) ? $(this).data('left') : '';
                if (top !== '') {
                    $(this).css('top', $(this).data('top'));
                }
                if (left !== '') {
                    $(this).css('left', $(this).data('left'));
                }
            });
        }
        /* ---------------------------------------------- /*
         *  Doughnut chart
        /* ---------------------------------------------- */
        if (doughnut_chart.length > 0) {
            new Chart(doughnut_chart, {
                type: 'doughnut',
                data: {
                    labels: ['Direct', 'Organic', 'Referrals'],
                    datasets: [{
                        data: [100, 60, 80],
                        backgroundColor: [
                            "#ff566d",
                            '#ffc725',
                            '#47aaff'
                        ],
                        hoverBackgroundColor: [
                            '#ff566d',
                            '#ffc725',
                            '#47aaff'
                        ]
                    }]
                },
                options: {
                    legend: {
                        display: false
                    }
                }
            });
        }
        /* ---------------------------------------------- /*
         *  Brands image carousel slider
        /* ---------------------------------------------- */
        if (brands_carousel.length > 0) {
            // Add mask image according to img path
            brands_carousel.find('a img').each(function(){
                $(this).parent('a').attr('style', '-webkit-mask-box-image:url(' + $(this)[0].src + ')');
            });
            // Update container width and height on screen resize
            $(window).resize(function(){
                brands_carousel.find('a').each(function(){
                    $(this).css({'width': $('.owl-item.active.center img').innerWidth(), 'height': $('.owl-item.active.center img').innerHeight()});
                });
            });
            // Initialize brands carousel
            brands_carousel.owlCarousel({
                autoplay: true,
                center: true,
                loop: true,
                dots: false,
                lazyLoad: true,
                mouseDrag: true,
                touchDrag: true,
                items: brands_items,
                responsiveClass: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            });
        }
        /* ---------------------------------------------- /*
         *  Layer Parallax Effect
        /* ---------------------------------------------- */
        if (layer_parallax.length > 0) {
            if (!Modernizr.touch) {
                setTimeout(function() {
                    layer_parallax.each(function() {
                        new Parallax($(this).get(0));
                    });
                }, 100);
            }
        }
        /* ---------------------------------------------- /*
         *  Makes the height of all showcase columns equal
        /* ---------------------------------------------- */
        if (showcase_col.length > 0) {
            showcase_col.matchHeight();
        }
        /* ---------------------------------------------- /*
         * Instafeed
        /* ---------------------------------------------- */
        if (instafeed.length > 0) {
            instafeed.empty();
            var instafeed_user_id = instafeed.data('user-id'),
                instafeed_access_token = instafeed.data('access-token'),
                instafeed_amount = parseInt(instafeed.data('amount'));
                feed = new Instafeed({
                    limit: instafeed_amount,
                    sortBy: 'most-recent',
                    resolution: 'standard_resolution',
                    get: 'user',
                    userId: instafeed_user_id,
                    accessToken: instafeed_access_token,
                    template: '<a href="{{link}}" class="instafeed-item" target="_blank"><img id="{{id}}" src="{{image}}" class="img-responsive" alt="{{caption}}" /><div class="instafeed-item-overlay"><p><i class="fa fa-instagram instagram"></i></p><h4 class="tag">#ClassicCars</h4></div></a>'
            });
            feed.run();
        }
    });
})(jQuery);