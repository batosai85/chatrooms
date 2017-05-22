import $ from "jquery";

export default function Delete_messages(socket){
      
    function delete_message(room) {
        let $room = {
            room: room
        };
        let $url = `/chatrooms/${room}/messages`;
        $.ajax({
            method: "DELETE",
            url: $url,
            data: JSON.stringify($room),
            contentType: "application/json"
        }).then((data) => {
            socket.emit("delete_messages", $room);
        }).catch((error) => {
            throw error;
        });
    }
    
    $(".delete").on("click", () => {
        let $room = $(".chatroom").text();
        delete_message($room);
    });
    
    
}