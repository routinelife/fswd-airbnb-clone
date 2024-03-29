class MessagesController < ApplicationController
    def create
        message = Message.create!(message_params)
        redirect_to message
    end

    private
        def message_params
            params.require(:message).permit(:title, :city, images: [])
        end
end
