class SessionsController < ApplicationController
  def create
    auth = request.env['rack.auth']

    @result = {
        :provider => auth['provider'],
        :token => auth['credentials']['token'] }

    #render :text => auth.inspect
  end
end