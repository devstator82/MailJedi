var options_popup_tpl = '\
<div id="options-popup" class="overlay">\
    <div class="overlay-inner">\
        <h2 class="overlay-header">Configure your accounts</h2>\
        <div class="overlay-body">\
			<p>Your accounts:</p>\
            {{tmpl options_popup_channels_tpl}}\
			\
			<p>Add more accounts:</p>\
			{{each available}}\
				<div class="channel-add-icon">\
					<a class="configure-link" rel="${$value.toLowerCase()}">\
						<img src="resource://mailjedi/jedi-js/images/channels/logo_${$value.toLowerCase()}_channel.png" border="0" alt="${$value}" />\
						<div class="add-channel-displayname">${$value}</div>\
					</a>\
				</div>\
			{{/each}}\
		</div>\
        <div class="overlay-footer">\
            <label class="button fr close">\
                <input type="button" value="Close">\
            </label>\
        </div>\
    </div>\
</div>';

var options_popup_channels_tpl = '\
{{if configured.length > 0}}\
<table id="setup-list" class="table-list setup-list channels-root">\
    <colgroup>\
        <col class="col-1" />\
        <col class="col-2" />\
        <col class="col-3" />\
    </colgroup>\
    <tbody>\
        {{each configured}}\
        <tr>\
          <td>\
              <img src="resource://mailjedi/jedi-js/images/channels/logo_${$value.source}_dock.png" alt="${$value.source}" width="23" height="25" />\
          </td>\
          <td>\
              <span class="username">${$value.username}</span>\
          </td>\
          <td>\
              <a class="delete-channel" rel="${$value.channel_id}" href="javascript:;">Remove</a>\
          </td>\
        </tr>\
        {{/each}}\
    </tbody>\
</table>\
{{else}}\
    <em id="setup-list-empty" class="channels-root">Start by adding one or more of your accounts</em>\
{{/if}}';

var dashboard_tpl = '\
<div id="content" class="mail-jedi pam">\
    <div class="row-resize-height row clearfix">\
        <div class="column-16">\
            <div id="message-stream-container" class="box rounded-corner-box">\
                <div class="inner">\
                    <div class="header">\
                        <h3 class="icon-contact float-left">Your Contacts</h3>\
                        <div class="search-field textfield wrap-centered">\
                            <label for="searchfield-input">Search for a contact</label>\
                            <input id="searchfield-input" name="searchfield-input" type="text" />\
                            <a id="button-search" title="Search" class="search-button"></a>\
                        </div>\
                    </div>\
                    <div class="body">\
                        {{each groups}}\
                        <h3 class="section-header">${$value.title}</h3>\
                        <ul class="thumbnail-list wrap-centered">\
                            {{each $value.people}}\
                                <li>\
                                    <div class="thumb-container">\
                                        <a href="person-detail.html">\
                                            <div class="mbm"><img src="${$value.avatar}" width="70" height="70" /></div>\
                                            <strong class="text-wrap">${$value.displayname}</strong>\
                                        </a>\
                                        <span class="badge-counter-rt">3</span>\
                                    </div>\
                                </li>\
                            {{/each}}\
                        </ul>\
                        {{/each}}\
                        <div class="clear"></div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
</div>';