import $ from "jquery";
import Socket_users from "./socket.users.js";
import Socket_if from "./socket.if.js";

export default function Socket_api(socket){
    
    Socket_if(socket);
    Socket_users(socket);

    $(".send").prop("disabled", true);
    $(".disabled").show();
    $(".room").on("click", () => {
        $(".send").prop("disabled", false);
        $(".disabled").hide(500);
        $(".display").animate({opacity: "1"},500);
        $(".delete").animate({opacity: "1"},500);
    });
    
}