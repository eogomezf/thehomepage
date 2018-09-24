jQuery(function($){

    initMain();


    showNavbarLeft();
});

function initMain(){

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > 0 ){
            $('header .navbar .navbar-brand img').addClass('narrowLogo');
        } else {
            $('header .navbar .navbar-brand img').removeClass('narrowLogo');
        }
    });
}

// $('.bdp-date').datepicker({
//     format: "dd/mm/yyyy",
//     startDate: "today"
// }); 

//   $('#datepicker').datepicker({
//         autoclose: true
//     });
//     $('#datepicker').datepicker({
//         setDate: new Date()
//     });
//     $("#datepicker").datepicker({
//         minDate: "-1D",
//         maxDate: "+1M +10D"
//     });

//      $('#datepicker2').datepicker({
//         autoclose: true
//     });
//     $('#datepicker2').datepicker({
//         setDate: new Date()
//     });
//     $("#datepicker2").datepicker({
//         minDate: "1D",
//         maxDate: "+1M +10D"
//     });

$('#quieroir').on('click', function(){
    
})

        $("#btnlink").hover(
            function(){
                $("#btnlink").css({"background-color":"#cccccc"});
            },
            function(){
                $("#btnlink").css({"background-color":"#ffffff"});
            }
        );

function showNavbarLeft(){

    $('.navbar-toggler').on('click',function(){
        $('.glass').fadeIn();
        $('#navbarLinkPage').addClass('navbar-left-show');
    });

    $('.glass').on('click',function(){
        $('#navbarLinkPage').removeClass('navbar-left-show');
        $(this).fadeOut();
    });

    $( document ).keypress(function(){       
        $('#navbarLinkPage').removeClass('navbar-left-show');
        $('.glass').fadeOut();
    });

    $('#close-nav').on('click',function(){
        $('.glass').trigger('click');
    })
}