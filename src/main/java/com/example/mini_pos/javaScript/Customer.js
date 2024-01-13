$(document).ready(function (){
    $("#save_customer").click(function (){
        let customer_idF = $("#cust_id").val();
        let nameF = $("#name").val();
        let addressF = $("#address").val();
        let contactF = $("#contact").val();

        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8081/mini_pos_war_exploded/customer",
            async:true,
            data:JSON.stringify({
                customer_id:customer_idF,
                name:nameF,
                address:addressF,
                contact:contactF

            }),
            success: function (data) {
                alert("saved")

            },
            error: function (xhr, exception) {
                alert("Error")
            }

        })
    });
});

$("#update_customer").click(function (){
    let customer_idF = $("#cust_id").val();
    let nameF = $("#name").val();
    let addressF = $("#address").val();
    let contactF = $("#contact").val();

    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8081/mini_pos_war_exploded/customer",
        async:true,
        data:JSON.stringify({
            customer_id:customer_idF,
            name:nameF,
            address:addressF,
            contact:contactF

        }),
        success: function (data) {
            alert("saved")
        },
        error: function (xhr, exception) {
            alert("Error")
        }

    })

});

$("#delete_customer").click(function () {
    let customer_idF = $("#cust_id").val();

    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8081/mini_pos_war_exploded/customer?customer_id=" + customer_idF,
        async: true,
        success: function (data) {
            alert("Customer deleted successfully");
        },
        error: function (xhr, exception) {
            alert("Error deleting customer");
        }
    });
});

$("#customer_reset").click(function () {
    $("#cust_id").val("");
    $("#name").val("");
    $("#address").val("");
    $("#contact").val("");
});