import $ from "jquery";

export default function Edit_profile(scoket){
    
    function edit_profile(user) {
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
    });
  
}