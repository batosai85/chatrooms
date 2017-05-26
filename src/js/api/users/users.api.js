import $ from "jquery";
import Delete_user from "./delete_user.js";
import Edit_user from "./edit_user.js";
import Edit_profile from "./edit_profile.js";

export default function Users_api(socket){
    
    Delete_user(socket);
    Edit_user(socket);
    
    if (window.location.href.indexOf("profile") > -1) {
        $(".username").text($(".edit-span").text());
    }
    function validateEmail($email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }
    Edit_profile(socket);


    $(".logout").on("click", (e) => {
        e.preventDefault();
        let $user = {};
        $user.username = $(".username").text();
        socket.emit("logout", $(".username").text());
        setTimeout(() => {
            window.location.href = `/logout/${$user.username}`;
        }, 1000);
    });

    
    
}