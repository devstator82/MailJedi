var options_popup_tpl = '\
<div id="options-popup" class="overlay">\
    <div class="overlay-inner">\
        <h2 class="overlay-header">Configure your accounts</h2>\
        <div class="overlay-body">\
			{{if configured.length > 0}}\
			<table id="setup-list" class="table-list setup-list">\
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
				<em id="setup-list-empty">Start by adding one or more of your accounts</em>\
			{{/if}}\
			\
			<p>Add more accounts:</p>\
			{{each available}}\
				<div class="channel-add-icon">\
					<a class="configure-link" rel="${$value.toLowerCase()}">\
						<img src="resource://mailjedi/jedi-js/images/channels/logo_${$value.toLowerCase()}_channel.png" border="0" alt="${$value}" />\
						<div class="add-channel-displayname">${$value.toLowerCase()}</div>\
					</a>\
				</div>\
			{{/each}}\
		</div>\
        </div>\
        <div class="overlay-footer">\
            <label class="button fr close">\
                <input type="button" value="Close">\
            </label>\
        </div>\
    </div>\
</div>';