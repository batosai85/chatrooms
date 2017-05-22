import $ from "jquery";

export default function Post_room(socket){
    
    function post_room(room) {
        if (room.name === "" || room.description === "") {
            $(".error").removeClass("error-hide").show();
            return false;
        } else {
            $(".error").addClass("error-hide").hide("slow");
        }
        $.ajax({
            method: "POST",
            url: "/create",
            data: JSON.stringify(room),
            contentType: "application/json"
        }).then((data) => {
            if (data !== "error") {
                $(".response").hide();
                socket.emit("room_added", room);
                setTimeout(() => {
                    window.location.href = "/home";
                }, 500);
            } else {
                $(".response").show();
            }
        }).catch((error) => {
            throw error;
        });
    }

    $(".create").on("click", (e) => {
        e.preventDefault();
        let $room = {};
        $room.name = $("input").first().val();
        $room.description = $("input").eq(1).val();
        post_room($room);
    });  
    
    
}