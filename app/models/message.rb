class Message < ApplicationRecord
  has_many_attached :images, service: :s3
end
