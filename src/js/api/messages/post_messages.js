import $ from "jquery";

export default function Post_messages(socket){
    
    
    function post_message(room) {
        socket.emit("new_message", room);
    }
    
    $(".send").on("click", (e) => {
        e.preventDefault();
        let $room = {};
        $room.name = $(".chat-room").text();
        $room.message = $(".message").val();
        $room.username = $("span.username").text();
        $(".message").val("");
        post_message($room);
    });
    
}