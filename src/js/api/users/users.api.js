import $ from "jquery";
import Delete_user from "./delete_user.js";
import Edit_user from "./edit_user.js";
import Edit_profile from "./edit_profile.js";

export default function Users_api(socket){
    
    Delete_user(socket);
    Edit_user(socket);
    
   /* function delete_user($username) {
        $.ajax({
            method: "DELETE",
            url: "/all-users",
            data: JSON.stringify({username: $username}),
            contentType: "application/json"
        }).then((data) => {
            window.location.href = "/all-users";
        }).catch((error) => {
            throw error;
        });
    }

    $(".remove-user").on("click", function (e) {
        e.preventDefault();
        let $username = $(this).parents("tr").children("td").first().text();
        delete_user($username);
    });

    function edit_user($username, $role){
        $.ajax({
            method : "PUT",
            url : `/edit-user/${$username}`,
            data : JSON.stringify({username : $username, role : $role}),
            contentType : "application/json"
        }).then((data) => {
            if(data !== null){
                if($.trim(data) !== $.trim($(".username").text())){
                    window.location.href="/all-users";
                }else{
                    window.location.href = "/logout/" + data; 
                }
            }
        }).catch((error) => {
            throw error; 
        });
    }

    $(".edit-user").on("click", function(e){
        e.preventDefault();
        let $role = $(this).text();
        let $username = $(this).parents("tr").children("td").first().text();
        edit_user($username, $role);
    });*/
    if (window.location.href.indexOf("profile") > -1) {
        $(".username").text($(".edit-span").text());
    }
    function validateEmail($email) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }
    Edit_profile(socket);

  /*  function edit_profile(user) {
        if (user.editusername === "" || user.editemail === "" || user.editpassword === "" || user.editconfpassword === "") {
            $(".edit-empty").removeClass("error-hide").show();
            return false;
        } else {
            $(".edit-empty").addClass("error-hide").hide(300);
        }
        if (!validateEmail(user.editemail)) {
            $(".check-email").show();
            return false;
        } else {
            $(".check-email").hide(300);
        }
        if (user.editpassword !== user.editconfpassword) {
            $(".edit-match").show();
            return false;
        } else {
            $(".edit-match").hide(300);
        }
        $.ajax({
            method: "PUT",
            url: `/edit-profile/${user.editoldusername}`,
            data: JSON.stringify(user),
            contentType: "application/json"
        }).then((data) => {
            if (data !== "error") {
                $(".edit-response").hide(300);
                setTimeout(() => {
                    window.location.href = `/logout/${user.editoldusername}`;
                }, 500);
            } else {
                $(".edit-response").show();
            }
        }).catch((error) => {
            $(".edit-error").hide();
        })
    }
    $(".edit-profile").on("click",(e) => {
        e.preventDefault();
        let $user = {};
        $user.editoldusername = $.trim($(".edit-span").text());
        $user.editusername = $(".editusername").val();
        $user.editemail = $(".editemail").val();
        $user.editpassword = $(".editpassword").val();
        $user.editconfpassword = $(".editconfpassword").val();
        edit_profile($user);
    });*/


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