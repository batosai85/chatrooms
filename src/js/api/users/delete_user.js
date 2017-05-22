import $ from "jquery";

export default function Delete_user(socket){
    
    function delete_user($username) {
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

}