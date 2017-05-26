import $ from "jquery";

export default function Get_messages(socket){
    
    let height = 0;

    function get_messages(room) {
        let $url = `/chatrooms/${room}/messages`;
        $.get($url)
            .then((data) => {
            let arr = [];
            for (let i = 0; i < data.length; ++i) {
                arr[i] = 50;
                height += arr[i];
                $(".display").append(`<div class='show-message'><h4 class='username'>${data[i].user} :</h4><h5>${data[i].message}</h5></div>`);
            }
            $(".display").animate({
                scrollTop: height + "px"
            }, 1000);
        });
    }
    
    let $whichRoom = "";
    $(".room").on("click", (e) => {
        $(".chatroom").removeClass("chat-room").hide(300);
        $(".display").text("");
        let $this = $(e.currentTarget);
        let $text = $this.text();
        $whichRoom = $text;
        setTimeout(() => {
            $(".chatroom").addClass("chat-room").text($text).show();
            get_messages($text);
        }, 400);
    });
    
    const $username = $(".username").text();
    socket.on("get_new_message", function (data) {
        if ($.trim($username) != data.user) {
             toastr.warning(`new message in ${data.room}`);
        }
        $(".display").append(`<div class='show-message'><h4 class='username'>${data.user} :</h4><h5>${data.message}</h5></div>`);
        height += 50;
        $(".display").animate({
            scrollTop: height + "px"
        }, 500);
    });

    
}