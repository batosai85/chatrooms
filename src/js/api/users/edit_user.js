import $ from "jquery";

export default function Edit_user(socket){
    
    function edit_user($username, $role){
        $.ajax({
            method : "PUT",
            url : `/edit-user/${$username}`,
            data : JSON.stringify({username : $username, role : $role}),
            contentType : "application/json"
        }).then((data) => {
            if(data !== null){
                if($.trim(data) !== $.trim($(".username").text())){
                    window.location.href="/all-users";
                }else{
                    window.location.href = "/logout/" + data; 
                }
            }
        }).catch((error) => {
            throw error; 
        });
    }

    $(".edit-user").on("click", function(e){
        e.preventDefault();
        let $role = $(this).text();
        let $username = $(this).parents("tr").children("td").first().text();
        edit_user($username, $role);
    });
    
}