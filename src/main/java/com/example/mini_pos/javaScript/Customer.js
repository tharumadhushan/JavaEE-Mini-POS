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
        loadCustomerData();

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


// $("#search_customer").click(function () {
//     let customer_idF = $("#cust_id").val();
//
//     $.ajax({
//         method: "GET",
//         contentType: "application/json",
//         url: "http://localhost:8081/mini_pos_war_exploded/customer?customer_id=" + customer_idF,
//         async: true,
//         success: function (data) {
//             // Assuming data contains the customer details
//             if (data && data.customer_id) {
//                 console.log("Customer details:", data);
//
//                 // Assuming you have elements with IDs name, address, and contact
//                 $("#name").val(data.name);
//                 $("#address").val(data.address);
//                 $("#contact").val(data.contact);
//             } else {
//                 alert("Invalid or empty response from the server");
//             }
//         },
//         error: function (xhr, exception) {
//             // Handle errors
//             alert("Error getting customer details");
//         }
//     });
// });

$("#search_customer").click(function (){
    $("#customer-tbl-body").empty();
    $.ajax({
        url: "http://localhost:8081/mini_pos_war_exploded/customer",
        method:"GET",
        dataType:"json",
        success: function (resp) {
            console.log(resp);
            for (const customer of resp) {
                let row = `<tr><td>${customer.customer_id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#customer-tbl-body").append(row);
            }
        }
    });
});

