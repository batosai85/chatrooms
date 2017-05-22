import $ from "jquery";

export default function Put_room(socket){
    
    function put_room(room) {
        let $url = `/edit/${room.name} - ${room.description}`;
        if (room.name === "" || room.description === "") {
            $(".error").removeClass("error-hide").show();
            return false;
        } else {
            $(".error").addClass("error-hide").hide("slow");
        }
        $.ajax({
            method: "PUT",
            url: $url,
            data: JSON.stringify(room),
            contentType: "application/json"
        }).then((data) => {
            if (data !== "error") {
                $(".response").hide();
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
    
    $(".edit").on("click", (e) => {
        e.preventDefault();
        let $room = {};
        $room.oldName = $("input").first().attr("placeholder");
        $room.oldDescription = $("input").eq(1).attr("placeholder");
        $room.name = $("input").first().val();
        $room.description = $("input").eq(1).val();
        put_room($room);
    });
}