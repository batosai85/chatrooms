import $ from "jquery";

export default function Delete_room(socket){
    
    function delete_room(room) {
        $.ajax({
            method: "DELETE",
            url: "/home",
            data: JSON.stringify({
                room: room
            }),
            contentType: "application/json"
        }).then((data) => {
            socket.emit("room_deleted", room);
            setTimeout(() => {
                window.location.href = "/home";
            }, 100);
        }).catch((error) => {
            throw error;
        })
    }

    $(".remove-room").on("click", function () {
        let $room = $(this).parents("tr").children("td").first().text();
        delete_room($room);
    });
    
}