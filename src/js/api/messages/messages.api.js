import $ from "jquery";
import Get_messages from "./get_messages.js";
import Post_messages from "./post_messages.js";
import Delete_messages from "./delete_messages";

export default function Messages_api(socket){ 
    
    Get_messages(socket);
    Post_messages(socket);
    Delete_messages(socket);
      
}