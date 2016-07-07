/**
 * Controlador de llamadas AJAX.
 * Created by mor on 16/06/16.
 */

var ajax = {
    paths: {
        initChar: '/game/initChar'
    },
    ajaxCall: function (url, callback) {
        $.ajax({
            url: url,
            cache: false,
            success: function (data, textStatus, jqXHR) {
                console.log("[ajax] request sent to " + url + ", success");
                if (util.type(util.func, callback))
                    callback(data, textStatus, jqXHR);
            }
        });
    },
    charRequest: function (callback) {
        ajax.ajaxCall(ajax.paths.initChar,
            function (ch, textStatus, jqXHR) {
                if (util.type(util.func, callback))
                    callback(ch, textStatus, jqXHR);
            });
    }
};