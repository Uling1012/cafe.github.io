$(document).ready(function(){
    //nav-bar-background
    $(window).scroll(function(){
        scrolledPx = $(this).scrollTop();
        if(scrolledPx >= 200){
            $('.navbar').addClass('active');
        }else{
            $('.navbar').removeClass('active');
        }
    })
    //nav-toggle
    $('.nav-toggle').on('click', function(){
        $(this).toggleClass('active');
        $('.navbar .nav').toggleClass('active');
    })
    $('.nav-link').on('click',function(){
        $('.nav-toggle').removeClass('active');
        $('.navbar .nav').removeClass('active')
    })
    //menu-Slider
    $(".owl-carousel").owlCarousel({
        nav:true,
        loop:false,
        margin:16,
        responsive:{  
            0:{
                items:2
            },
            769:{
                items:4
            }
        }
    });
    //jumbotron-BackgroundVideo
    $('.jumbotron').vide({
        mp4 :  './video/bg.mp4',
        webm : 'video/bg.webm',
        ogv : 'video/bg.ogv',
        poster: 'mages/bg/bg001.jpg'
    },{
        posterType:'none',
    });
    //decoration
    var rellax = new Rellax('.rellax', {
        center: true, //基準在視窗中間（預設在最上方）
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false,
        breakpoints: [425, 768, 1024]
    });
    //lightbox
    $('[data-fancybox="gallery"]').fancybox({
		// loop: true,
		buttons: [
			"zoom",
			//"share",
			//"slideShow",
			//"fullScreen",
			//"download",
			//"thumbs",
			"close"
		],
		infobar: false,
	    hideScrollbar: true,
	});
    // 進場效果
    ScrollReveal().reveal('.slideUp',{
        origin:'bottom',
        distance:'50px',
        duration: 800,
        delay: 50,
    });
    ScrollReveal().reveal('.slideRight',{
        origin:'left',
        distance:'50px',
        duration: 800,
        delay: 50,
        viewFactor:0.3,
    });
    ScrollReveal().reveal('.slideLeft',{
        origin:'right',
        distance:'50px',
        duration: 800,
        delay: 50,
        viewFactor:0.3,
    });
    ScrollReveal().reveal('.service .product-group .product',{
        origin:'bottom',
        distance:'50px',
        duration: 800,
        interval:300,
    });
    //視窗滾動
    $('#nav').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: 'other',
        easing: 'swing',
        begin: function() {
            //I get fired when the animation is starting
        },
        end: function() {
            //I get fired when the animation is ending
        },
        scrollChange: function($currentListItem) {
            //I get fired when you enter a section and I pass the list item of the section
        }
    });

    //Firebase Auth
    function memberState(){
        let state = localStorage.getItem('memberState');
        console.log(state)
        //JSON.parse(state):轉成布林值
        if(JSON.parse(state)){
            $('.unauth').hide();
            $('.auth').show();

        } else{
            $('.auth').hide();
            $('.unauth').show();
        }
    }
    memberState();
    //onAuthStateChanged
    firebase.auth().onAuthStateChanged(function(user) {
        console.log('user',user);
        let state = localStorage.getItem('memberState');
        if (user) {
            // User is signed in.
            if(!JSON.parse(state)){
                $('.btn-close').hide();
                $('.login').hide();
                $('.login-success').hide();
                $('.logout-success').hide();
                $('#exampleModal').modal('show');
                $('#loader').show();

                setTimeout(function(){
                $('.btn-close').show();
                $('.login-success').show();
                $('#loader').hide();
                },1000);
            }
        }
    });

    //signOut
    $('.nav-item.auth').on('click', function(){
        // console.log('logout');
        firebase.auth().signOut().then(function(){
            $('.login').hide();
            $('.login-success').hide();
            $('.logout-success').show();

            $('#exampleModal').modal('show');

        }).catch(function(err){
            console.log('Logout fail', err);
        });
    });

    $('.nav-item.unauth').on('click', function(){
        // console.log('login')
        $('.login').show();
        $('.login-success').hide();
        $('.logout-success').hide();

        $('#exampleModal').modal('show');
    });
    
    //狀態紀錄
    $('.btn-close').on('click', function(){
        if($('.login-success').css('display') === 'block'){
            localStorage.setItem('memberState', 'true')
            setTimeout(function(){
                $('.login').show();
                $('.login-success').hide();
                $('.logout-success').hide(); 
            },1000);
           
        };
        if($('.logout-success').css('display') === 'block'){
            localStorage.setItem('memberState', 'false')
            setTimeout(function(){
                $('.login').show();
                $('.login-success').hide();
                $('.logout-success').hide(); 
            },1000);
        
        };   
        memberState();
    });
})