import $ from "jquery";

export default function Socket_users(socket){
    
    
    socket.on("users_online", function (data) {
        $(".users-online").text(data.length);
        $(".dropdown-menu").empty();
        $.each(data, function (index, user) {
            $(".dropdown-menu").append(`<li><a href="#">${user.username}</a></li>`);
        });
    });
    socket.on("users_increase", function (data) {
        $(".users-online").text(data.length);
        $(".dropdown-menu").empty();
        $.each(data, function (index, user) {
            $(".dropdown-menu").append(`<li><a href="#">${user.username}</a></li>`);
        });
    });
    socket.on("users_decrease", function (data) {
        $(".users-online").text(data.length);
        $(".dropdown-menu").empty();
        $.each(data, function (index, user) {
            $(".dropdown-menu").append(`<li><a href="#">${user.username}</a></li>`);
        });
    });

    socket.on("user_login", function (data) {
        if (window.location.href.indexOf("login") == -1) {
            if ($(".username").text() !== data) {
                let $arr = [];
                $(".show-users li").each(function(){
                    $arr.push($(this).text());
                });
                if($arr.indexOf($.trim(data)) === -1){
                    toastr.warning(`${data} is online`);
                    socket.emit("update_on_login");
                }
            }
        }
    });
    socket.on("user_logout", function (data) {
        if ($(".username").text() !== data) {
            toastr.warning(`${data} is offline`);
            setTimeout(() => {
                socket.emit("update_on_logout");
            }, 1500);
        }
    });
      
}