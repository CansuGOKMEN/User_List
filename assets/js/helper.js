$(document).ready(function () {
    $(".btn").click(function () {
        if ($(this).parents("tbody").find('.fa-plus-circle').length > 0) {
            $(this).parents("tbody").find(".fa.fa-plus-circle").addClass("fa-minus-circle");
            $(this).parents("tbody").find(".fa.fa-plus-circle").removeClass("fa-plus-circle");
            $(this).parents("tbody").find(".toggle").addClass("active");
        }
        else if ($(this).parents("tbody").find('.fa-minus-circle').length > 0) {
            $(this).parents("tbody").find(".fa-minus-circle").addClass("fa-plus-circle");
            $(this).parents("tbody").find(".fa-minus-circle").removeClass("fa-minus-circle");
            $(this).parents("tbody").find(".toggle").removeClass("active");
        }
    });
    $('a').on("click", function () {
        $('.modal.fade').attr('id','exampleModel');

        var value = this.text;
        var dataTarget = $(this).data().target;

        if (dataTarget == "#userInformationModal") {
            $('#exampleModel').attr('id', 'userInformationModal');
            $('#userInformationModal').modal('show');
            getData(value);
        }
        else if (dataTarget == "#phoneModal") {
            $('#exampleModel').attr('id', 'phoneModal');
            $('#phoneModal').modal('show');
            setHtml();
        }
    });

    $('button.btn.btn-secondary').click(function(){ 
        $('.modal-body .row').empty();
        $('.modal-body #modalTable').empty();
    });

    var obj = new Object();
    function getData(identityNumber) {
        $.ajax({
            type: "Get",
            url: "data.json",
            dataType: "json",
            cache: false,
            async: true,
            success: function (data) { obj = data, searchData(identityNumber) },
            error: function () {
                alert("Not found");
            }
        });
    }

    function searchData(identityNumber) {
        if (obj != null) {
            var person = obj.data.filter(function (item) {
                return item.identityNumber == identityNumber;
            });

            if (person.length == 0) {
                obj.data.forEach(function (item) {
                    if (item.children != null && item.children.length > 0) {
                        var user = item.children.filter(function (data) {
                            return data.identityNumber == identityNumber;
                        });
                        if (person.length == 0) person = user;
                    }
                });
            }

            $('#modalTable').tableCreater({
                class: "table table-head-custom table-head-bg table-borderless table-vertical-center",
                columns: [
                    { title: 'Kişi', style: '', name: "fullname" },
                    { title: 'TC No', style: '', name: "identityNumber" },
                    { title: 'Sıra No', style: '', name: "order" },
                    { title: 'Doğum Yeri', style: '', name: "birthPlace" },
                ],
                data: person
            });
        }
    }

    function setHtml() {
        var html = ''; 
        html += '<div class="row">';
        html += '<div class="col-3">';
        html += '<p></p>';
        html += '<p class="text-center"><i class="fa fa-phone icon-2x"></i></p>';
        html += '</div>';
        html += '<div class="col-9" style="margin:auto 0px">';
        html += '<p>Arama Başlatılıyor... Lütfen bekleyiniz.</p>';
        html += '</div></div>';

        $('.modal-body').append(html)
    }
});