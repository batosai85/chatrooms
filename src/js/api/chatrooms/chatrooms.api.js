import $ from "jquery";
import Post_room from "./post_room.js";
import Put_room from "./put_room.js";
import Delete_room from "./delete_room.js";

export default function Chatrooms_api(socket){
    
    $(".error").hide();
    $(".response").hide();
    
    Post_room(socket);
    Put_room(socket);
    Delete_room(socket);
     
}