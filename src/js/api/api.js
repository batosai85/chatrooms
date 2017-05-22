import $ from "jquery";
import Socket_api from "./socket/socket.api.js";
import Chatrooms_api from "./chatrooms/chatrooms.api.js";
import Messages_api from "./messages/messages.api.js";
import Users_api from "./users/users.api.js";

export default function Api(){  
    
    $(".edit-empty").hide();
    $(".edit-response").hide();
    $(".check-email").hide();
    $(".edit-match").hide();
    
    const socket = io.connect();
    
    Socket_api(socket);
    Chatrooms_api(socket);
    Messages_api(socket);
    Users_api(socket);
}
    