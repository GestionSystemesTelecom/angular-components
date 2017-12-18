/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
function JQuery() { }
function JQuery_tsickle_Closure_declarations() {
    /** @type {?} */
    JQuery.prototype.drag;
}
// tslint:disable-next-line:no-shadowed-variable
(function ($) {
    $.fn.drag = function (opt) {
        opt = $.extend({ handle: '', cursor: 'move' }, opt);
        var /** @type {?} */ $el = this;
        if (opt.handle === '') {
            $el = this;
        }
        else {
            $el = this.find(opt.handle);
        }
        return $el.css('cursor', opt.cursor).on('mousedown', function (e) {
            var /** @type {?} */ $drag;
            if (opt.handle === '') {
                $drag = $(this).addClass('draggable');
            }
            else {
                $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            $(window).resize(function () {
                $drag.css('top', '');
                $drag.css('left', '');
            });
            var /** @type {?} */ zIdx = $drag.css('z-index');
            var /** @type {?} */ drgH = $drag.outerHeight();
            var /** @type {?} */ drgW = $drag.outerWidth();
            var /** @type {?} */ posY = $drag.offset().top + drgH - e.pageY;
            var /** @type {?} */ posX = $drag.offset().left + drgW - e.pageX;
            $drag.css('z-index', 1000).parents().on('mousemove', function (ef) {
                var /** @type {?} */ wdth = $(window).width() - 17; // $(this).parents('.modal-content')[0]['clientWidth'];
                $('.draggable').offset({
                    top: (ef.pageY + posY - drgH) > $(window).scrollTop() ? (ef.pageY + posY - drgH) : $(window).scrollTop(),
                    left: (ef.pageX + posX - drgW) > 0 ? ((ef.pageX + posX) >= wdth ? (wdth - drgW) : (ef.pageX + posX - drgW)) : 0
                })
                    .on('mouseup', function () {
                    $(this).removeClass('draggable').css('z-index', zIdx);
                });
            });
            e.preventDefault(); // disable selection
        })
            .on('mouseup', function () {
            if (opt.handle === '') {
                $(this).removeClass('draggable');
            }
            else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });
    };
})($);
//# sourceMappingURL=drag.js.map