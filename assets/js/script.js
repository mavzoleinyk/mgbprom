$(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:1
    });
    
    $("input[type='phone']").mask("+7 (999) 999-99-99");

    $('#top-feedback').click(function() {
		$('html, body').animate({scrollTop: 0});
		$('.top-feedback').fadeIn();

		return false;
	}); 
    $('.contacts__feedback').click(function() {
		$('html, body').animate({scrollTop: 0});
		$('.top-feedback').fadeIn();

		return false;
	}); 

    // Закрытие по клавише Esc.
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            // e.stopPropagation();
            $('.top-feedback').fadeOut();
        }
    });

    // Клик по фону, но не по окну.
    $('.top-feedback').click(function(e) {
        if ($(e.target).closest('.popup').length == 0) {
            $(this).fadeOut();					
        }
    });

    $(document).on('submit','.top-feedback .popup form',function(e){
        e.preventDefault();
        let form = $(this).closest('form');
    
        let error = false;
        
        if ( form.find('input[name="user_phone"]').val() == '') {
            form.find('.error').css('display', 'block');
            error = true;
        } else {
            form.find('.error').css('display', 'none');
        }
    
        if ( form.find('input[name="user_phone"]').val() != '' ) {
            let reg = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            let valid = reg.test(form.find('input[name="user_phone"]').val());
            if (!valid) {
                form.find('.errorPhone').css('display', 'block');
                error = true;
            } else {
                form.find('.errorPhone').css('display', 'none');
            }
        }  else {
            form.find('.errorPhone').css('display', 'none');
        }
    
        if ( form.find('.custom_checkbox').is(':not(:checked)') ) {
            form.find('.errorCheckbox').css('display', 'block');
            error = true;
        } else {
            form.find('.errorCheckbox').css('display', 'none');
        }
    
        if (!error) {
            let b = $('.top-feedback .popup form').serialize();
            $.ajax({
                url: '/ajax/feedback_header.php',
                data: b,
                type: 'POST',
                success: function (data) {
                    if (data == 'success'){
                        $('.order-block_inner').hide();
                        $('.order-block__success').addClass('active');
                    } else {
                        alert(data);
                    }
                }
            });
        }
    });

    $(".sender-btn").click(function(e) {
        e.preventDefault();

        let error = false;

        if ( $('.sender-phone').val() == '' ) {
            $('.error2').css('display', 'block');
            error = true;
        } else {
            $('.error2').css('display', 'none');
        }

        if ( $('.sender-phone').val() != '' ) {
            let reg = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            let valid = reg.test($('.sender-phone').val());
            if (!valid) {
                $('.errorPhone2').css('display', 'block');
                error = true;
            } else {
                $('.errorPhone2').css('display', 'none');
            }
        }  else {
            $('.errorPhone2').css('display', 'none');
        }

        if (!error) {
            let b = $('.top-feedback .popup form').serialize();
            $.ajax({
                url: '/ajax/feedback_footer.php',
                data: b,
                type: 'POST',
                success: function (data) {
                    if (data == 'success'){
                        $('.order-block_inner').hide();
                        $('.order-block__success').addClass('active');
                    } else {
                        alert(data);
                    }
                }
            });
        }
    });

    $('.basket-items-list-wrapper.basket-items-list-wrapper-height-fixed').before('<div css="zero-price">Актуальные цены товаров со стоимостью 0 ₽ уточняйте у менеджера </div>');

});