// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

//ERB flavored HTML forms and links that automatically connects with the controller
import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import 'bootstrap/dist/js/bootstrap.bundle'

//server will either look for a 'channels.js file in app/javascript or index.js inside app/javasrcipt/channels'
import "channels"

Rails.start()
ActiveStorage.start()