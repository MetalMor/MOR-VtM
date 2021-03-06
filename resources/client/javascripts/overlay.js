/**
 * Objeto para controlar los overlays
 * Created by mor on 11/05/2016.
 */
var overlay = {
    /**
     * Cierra una ventana desplegable
     * @param id ID del elemento (string)
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    close: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeOut(speed, function() {
            element.css('width', '0%');
            if (callback) callback(element);
        });
    },
    /**
     * Abre una ventana desplegable
     * @param id ID del elemento (string)
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    open: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeIn(speed, function() {
            element.css('width', '100%');
            if (callback) callback(element);
        });
    },
    /**
     * Cierra un panel desplegable
     * @param element Elemento a cerrar
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    hide: function(element, sp, callback) {
        var speed = sp ? sp : 'fast';
        element.fadeOut(speed, function() {
            element.attr('hidden', 'true');
            if(callback) callback(element);
        });
    },
    /**
     * Abre un panel desplegable
     * @param element Elemento a abrir
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    show: function(element, sp, callback) {
        var speed = sp ? sp : 'fast';
        element.fadeIn(speed, function() {
            element.attr('hidden', 'false');
            if(callback) callback(element);
        });
    },
    /**
     * Muestra un panel de alerta.
     * @param id Id del panel.
     */
    showAlert: function(id) {
        overlay.open(id, '100', function() {
            setTimeout(function() {
                overlay.close(id, '100', function() {
                    $('#emptyFields').css('width', '100%')
                });
            }, 2000);
        });
    },
    /**
     * Muestra la ventana de creación del personaje
     */
    initCharPanel: function (doFirst) {
        if (doFirst) doFirst();
        overlay.showAlert('advice');
        overlay.open('data');
        overlay.setPrefsButtons();
        util.disable('#generation');
        $("input#next").click(button.submitCharData);
        $("button#submit").click(function () {
            button.submitSheet(char, user, game)
        });
    },
    /**
     * Llama a las funciones que definen los botones del panel de creación del personaje
     */
    setPanelButtons: function () {
        button.setPanelButton($('div#char-data'));
        button.setPanelButton($('div#char-stats'));
    },
    /**
     * Llama a las funciones que definen los botones de preferencias de estadísticas.
     */
    setPrefsButtons: function () {
        button.setPrefsButtons('attr');
        button.setPrefsButtons('skills');
    },
    /**
     * Muestra un personaje especificado en la interfaz.
     * @param char Objeto personaje a mostrar.
     */
    gameWindow: function (char) {
        table.showData(char, 'show-data');
        table.showStats(char, 'show-stats');
        if (util.isMaster(user, game)) button.setTableButtons('show-stats', 'table');
        list.loadStatSelection();
    },
    /**
     * Muestra la ventana de información del personaje
     */
    playerPanel: function() {
        var sheet = {user: user, game: game, char: char};
        overlay.open('panel');
        overlay.setPanelButtons();
        overlay.gameWindow(char);
        sockets.player();
        sockets.server('login', sheet);
        button.setDownloader();
    },
    /**
     * Muestra la ventana de información del máster.
     */
    masterPanel: function () {
        overlay.open('panel');
        overlay.setPanelButtons();
        char = game.charList[0];
        list.loadCharSelection();
        if (!util.isUndefined(char))
            overlay.gameWindow(char);
        button.setDownloader($('table#show-stats')[0]);
        button.setXpGiver();
        button.setCharCreationButton();
        button.setRollPanelButton();
        sockets.player();
    }
};