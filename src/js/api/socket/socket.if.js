import $ from "jquery";

export default function Socket_if(socket){
       
    if (window.location.href.indexOf("home") > -1) {
        socket.emit("login", $(".username").text());
    }
    if (window.location.href.indexOf("chatrooms") > -1) {

        socket.on("confirm_delete", function (data) {
            $(".display").text("");
        });

        socket.on("rooms_delete_update", function (data) {
            $(".rooms-list").empty();
            $.each(data, function (index, room) {
                $(".rooms-list").append(`<li class="list-group-item room">${room.name}</li>`);
            });
        });

        socket.on("rooms_add_update", function (data) {
            $(".rooms-list").empty();
            $.each(data, function (index, room) {
                $(".rooms-list").append(`<li class="list-group-item room">${room.name}</li>`);
            });
        });
    }   
    
}