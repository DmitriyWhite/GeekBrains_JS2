$(document).ready(function () {
    $("#birth").datepicker({
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        firstDay: 1,
        dateFormat: "yy-mm-dd"
    });
    //проверка заполнения формы
    $("#progressbar").progressbar({
        value: 0
    });
    //функция проверки формы
    function checkFields() {
        var count = 0;
        $("form :text, :password").each(function () {
            if ($(this).val() != "") count++;
        });
        $("#progressbar").progressbar("value", 100 * count / $("form :text, :password").length);
    }

    $("form :text").change(function () {
        checkFields();
    });
    //Отправка AJAX запросов
    $("#send").click(function () {
        $.ajax({
            url: 'http://localhost/validator.php',
            data: $("form :text, :password").serialize(),
            dataType: 'json',
            type: 'POST',
            success: function (serverAns) {
                if (serverAns.result) {
                    //если все поля правильные подсвечиваем зеленым
                    $("form :text, :password").animate({backgroundColor: '#00ff00'}, 1000);
                }
                else {
                    //массив имен полей заполненных правильно
                    var trueFields = $("form :text, :password").serializeArray().map(function (obj) {
                        return obj.name;
                    });

                    //подсвечиваем неправильные поля и применяем эффект bounce
                    for (var key in serverAns.error) {
                        $("input[name='" + key.toLowerCase() + "']").animate({backgroundColor: '#ff0000'}, 1000);
                        $("input[name='" + key.toLowerCase() + "']").effect('bounce', 1000);
                        var dialog = document.createElement('div');
                        $(dialog).html('<p>' + serverAns.error[key] + '</p>');
                        $(dialog).attr('title', 'Внимание ошибка ' + key + '!');
                        $(dialog).dialog();
                        //Поля заполненные правильно
                        trueFields.splice(trueFields.indexOf(key.toLowerCase()), 1);
                    }
                    //подсвечиваем правильные поля
                    trueFields.forEach(function (name) {
                        $("input[name='" + name + "']").animate({backgroundColor: '#00ff00'}, 1000);
                    });

                }
            }
        });
    });
    //Чтобы много раз не заполнять поля. Созданим кнопку заполнения правильными данными
    var test = document.getElementById('test'); // кнопка "Заполнить тестовыми данными"
    var form = document.getElementById('form'); // Форма
    //Обработчик нажатия кнопки "Заполнить тестовыми данными"
    test.onclick = function () {
        form.elements[0].value = 'Vasiliy';
        form.elements[1].value = '12345678';
        form.elements[2].value = 'my@mail.ru';
        form.elements[3].value = 'm';
        form.elements[4].value = '4556639300009235';
        form.elements[5].value = 'blabla';
        form.elements[6].value = '2017-04-12';
        checkFields();
    };
});
