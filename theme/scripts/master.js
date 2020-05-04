/*!
 * Fullstack Overflow
 * 2020 | KEL
 */

FED = {

    init: function() {
        FED.globalFunction();
        FED.carousel();
    },

    globalFunction: function() { 

        //Sidebar open
        $(document).on('click', '.burgernav', function(e) {
            e.preventDefault();
            $(".wrapper, footer.main").toggleClass("open");
            $('.burgernav').toggleClass('open');
        });

        //Modal target
        $(document).on('click', '[data-toggle="lightbox"], [data-toggle="modal"]', function(e) {
            e.preventDefault();
            var target = $(this).data("target");
            $(target).fadeIn('fast');
            $('body').addClass('lightbox-open'); //used to disable scroll outside
            if ($(".lightbox-search").length > 0) {
                setTimeout(function(){ $('#search').focus(); }, 300);
            }
        });

        //Modal Close [Custom]
        $(document).on('click', '[data-toggle="close"]', function(e) {
            e.preventDefault();
            $(this).closest('.lightbox').fadeOut();
            $('body').removeClass('lightbox-open');
        });


        $(window).scroll(function() { 

            var scroll = $(window).scrollTop();

            if ($('.banner-block').length > 0) {

                var article_block = $('.banner-block');
                var position = article_block.position().top - $(window).scrollTop();

                if (position <= 10) {
                    article_block.addClass('bg-fixed');
                } else {
                    article_block.removeClass('bg-fixed');
                }

            }

            if (scroll >= 400) {
                $(".header-main").addClass("scrolled");
                $("body").addClass("scrolled");
            } else {
                $(".header-main").removeClass("scrolled");
                $("body").removeClass("scrolled");
            }

        });

        $(window).on('resize orientationchange', function() {
            if ($(".carousel-testimonials").length > 0) {
                $('.carousel-testimonials').slick('resize');
            }
        });
    },

    carousel: function() {
        //check if element exist
        if ($(".carousel-testimonials").length > 0) {
            $('.carousel-testimonials').slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }

    },
 
};

$(document).ready(function() {
  FED.init();
});