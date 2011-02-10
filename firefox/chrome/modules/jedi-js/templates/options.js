var options_popup_tpl = '\
<div id="options-popup" class="overlay">\
    <div class="overlay-inner">\
        <h2 class="overlay-header">Configure your accounts</h2>\
        <div class="overlay-body">\
            <p><a class="configure-link" rel="google" href="javascript:;">Add Google</a></p>\
            <p><a class="configure-link" rel="facebook" href="javascript:;">Add Facebook</a></p>\
            <p><a class="configure-link" rel="twitter" href="javascript:;">Add Twitter</a></p>\
            <p><a class="configure-link" rel="linkedin" href="javascript:;">Add LinkedIn</a></p>\
        </div>\
        <div class="overlay-footer">\
            <label class="button fr close">\
                <input type="button" value="Close">\
            </label>\
        </div>\
    </div>\
</div>';

gslayer.ui.appendHtml(options_popup_tpl);
gslayer.ui.addOverlayTrigger('#show-options');

$('.configure-link').click(function() {
    mailjedi.configure($(this).attr('rel'));
});