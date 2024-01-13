$(document).ready(function () {
    $("#save_item").click(function () {
        console.log("sss")
        let codeF = $("#item_id").val();
        let descriptionF = $("#desc").val();
        let qtyF = $("#qty").val();
        let unitPriceF = $("#price").val();
        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8081/mini_pos_war_exploded/item",
            async: true,
            data: JSON.stringify({
                code: codeF,
                descr: descriptionF,
                qty: qtyF,
                unitPrice: unitPriceF
            }),
            success: function (data) {
                alert("saved")
            },
            error: function (xhr, exception) {
                alert("Error")
            }
        })
    })
});

$("#update_item").click(function (){
    let codeF = $("#item_id").val();
    let descrF = $("#desc").val();
    let qtyF = $("#qty").val();
    let unitPriceF = $("#price").val();

    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8081/mini_pos_war_exploded/item",
        async:true,
        data:JSON.stringify({
            code:codeF,
            descr:descrF,
            qty:qtyF,
            unitPrice:unitPriceF

        }),
        success: function (data) {
            alert("saved")
        },
        error: function (xhr, exception) {
            alert("Error")
        }

    })

});

$("#delete_item").click(function () {
    let item_idF = $("#item_id").val();

    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8081/mini_pos_war_exploded/item?code=" + item_idF,
        async: true,
        success: function (data) {
            alert("Item deleted successfully");
        },
        error: function (xhr, exception) {
            alert("Error deleting customer");
        }
    });
});

$("#item_reset").click(function () {
    $("#item_id").val("");
    $("#desc").val("");
    $("#qty").val("");
    $("#unit_price").val("");
});


