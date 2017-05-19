declare var $: JQueryStatic;

interface JQuery {
   drag(opt?: any);
}

// tslint:disable-next-line:no-shadowed-variable
(($) => {
    $.fn.drag = function(opt) {
        opt = $.extend({handle: '', cursor: 'move'}, opt);

        let $el = this;
        if (opt.handle === '') {
            $el = this;
        } else {
            $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on('mousedown', function(e) {
            let $drag;
            if (opt.handle === '') {
                $drag = $(this).addClass('draggable');
            } else {
                $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }

            $(window).resize(function(this) {
                $drag.css('top', '');
                $drag.css('left', '');
            });

            let zIdx = $drag.css('z-index');
            let drgH = $drag.outerHeight();
            let drgW = $drag.outerWidth();
            let posY = $drag.offset().top + drgH - e.pageY;
            let posX = $drag.offset().left + drgW - e.pageX;

            $drag.css('z-index', 1000).parents().on('mousemove', (ef) => {
                let wdth = $(window).width() - 17; // $(this).parents('.modal-content')[0]['clientWidth'];

                $('.draggable').offset({
                    top: (ef.pageY + posY - drgH) > $(window).scrollTop() ? (ef.pageY + posY - drgH) : $(window).scrollTop(),
                    left: (ef.pageX + posX - drgW) > 0 ? ((ef.pageX + posX) >= wdth ? (wdth - drgW) : (ef.pageX + posX - drgW)) : 0
                })
                .on('mouseup', function() {
                    $(this).removeClass('draggable').css('z-index', zIdx);
                });
            });
            e.preventDefault(); // disable selection
        })
        .on('mouseup', function(this) {
            if (opt.handle === '') {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    };
})($);
