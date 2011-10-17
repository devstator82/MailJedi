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
                                        <a class="person-link" rel="${$value.id}">\
                                            <div class="mbm"><img src="${$value.avatar}" width="70" height="70" /></div>\
                                            <strong class="text-wrap">${$value.displayname}</strong>\
                                        </a>\
                                        <span class="badge-counter-rt">${$value.message_count}</span>\
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

var person_tpl = '\
div id="wrapper" class="grid-container">\
	<div id="content">\
		<div class="row-resize-height row clearfix">\
			<div class="column-3">\
				<!-- Contact Information Block [Begin] -->\
				<div class="media-block mbm"> <a href="#" class="img"> <img alt="" src="images/no-avatar-50.png" width="50" height="50" /> </a>\
					<div class="body">\
						<ul>\
							<li><a class="text-wrap" href="#"><strong>{Contact Name}</strong></a></li>\
							<li><span class="text-wrap">{Current City}</span></li>\
						</ul>\
					</div>\
				</div>\
				<!-- Contact Information Block [End] -->\
				<!-- Side Navigation [Begin] -->\
				<div id="side-nav-container">\
					<ul id="side-nav">\
						<li class="folder-list">\
							<ul>\
								<li><a class="icon-back" href="/">Go Back</a></li>\
							</ul>\
						</li>\
						<li class="folder-list"> <strong class="title">Content</strong>\
							<ul>\
								<li class="active"><a class="icon-archive" href="#">Mail<span class="badge-counter float-right">3</span></a></li>\
								<li><a class="icon-attachment" href="#">Attachments</a></li>\
								<li><a class="icon-todo" href="#">Follow Ups</a></li>\
							</ul>\
						</li>\
						<li class="folder-list mtm"> <strong class="title">Social Networks</strong>\
							<ul>\
								<li><a class="icon-facebook" href="#">Facebook</a></li>\
								<li><a class="icon-linkedin" href="#">LinkedIn</a></li>\
								<li><a class="icon-twitter" href="#">Twitter</a></li>\
							</ul>\
						</li>\
					</ul>\
				</div>\
				<!-- Side Navigation [End] -->\
			</div>\
			<div class="column-13">\
				<!-- Inbox Stream [Begin] -->\
				<div id="message-stream-container" class="box rounded-corner-box">\
					<div class="inner">\
						<div class="header">\
							<h3 class="icon-archive">Mail</h3>\
						</div>\
						<div class="body">\
							<!-- Search Box [Begin] -->\
							<div class="search-field textfield wrap-centered">\
								<label for="searchfield-input">Search your mail</label>\
								<input id="searchfield-input" name="searchfield-input" type="text" />\
								<a id="button-search" title="Search" class="search-button"></a>\
                            </div>\
							<!-- Search Box [End] -->\
							<table class="table-list message-list">\
								<colgroup>\
								<col class="col-1" />\
								<col class="col-2" />\
								<col class="col-4" />\
								<col class="col-5" />\
								<col class="col-6" />\
								<col class="col-7" />\
								<col class="col-8" />\
								<col class="col-9" />\
								<col class="col-10" />\
								</colgroup>\
								<tbody>\
									<tr class="message-row unread">\
										<td><a title="Unread" class="unread-badge"></a></td>\
										<td><input type="checkbox" class="message-selection"></td>\
										<td><a class="icon icon-unstarred action-star"></a></td>\
										<td><div class="channel-icon gmail-s" title="GMail (dineshdug@gmail.com)"></div></td>\
										<td><a href="/#contacts/c39f6b631af9/threadsy"> <span class="inbox-item-contact">From</span> </a></td>\
										<td></td>\
										<td><a href=""> <span class="inbox-item-subject">subject</span> &ndash;<span class="inbox-item-content">preiew</span> </a></td>\
										<td></td>\
										<td class="last"><span title="6/21/2010 9:32 PM" class="inbox-item-datetime">Mon 21 Jun 2010</span></td>\
									</tr>\
								</tbody>\
							</table>\
							<div class="clear"></div>\
						</div>\
					</div>\
				</div>\
				<!-- Inbox Stream [End] -->\
			</div>\
		</div>\
		<!-- Person View [End] -->\
	</div>\
</div>';