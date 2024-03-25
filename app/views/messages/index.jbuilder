json.messages do
  json.array! @messages do |message|
    json.id message.id
    json.username message.user.username    
    json.message message.image    

    if message.image.attached?
      json.image url_for(message.image)
    else
      json.image nil
    end
  end
end