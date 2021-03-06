/**
 * Objeto para controlar la lista de jugadores
 * Created by mor on 24/05/16.
 */

var list = {
    /*loadVirtueSelection: function () {
     var element = $()
     list.appendList(element, statsList, function(child) {
     return "<option id='"+child.name+"'>" + util.fancy(child.name) + " - " + child.level + "</option>"
     });
     },*/
    /**
     * Carga la lista de personajes de la partida en un elemento select.
     */
    loadCharSelection: function () {
        var element = $('select#char-list'), event = 'change', childrenSelector = ':selected',
            separatorElement = '<option>--------------------</option>', lists = [game.charList, game.npcList];
        element.empty();
        lists.forEach(function(l) {
            list.appendList(element, l, function(child) {
                var currentCharName = charFunctions.findData(char, 'nombre').value,
                    otherCharName = charFunctions.findData(child, 'nombre').value,
                    htmlClass = ((util.isUndefined(child.npc) || !child.npc) ? 'char' : 'npc'),
                    htmlSelected = (currentCharName === otherCharName ? " selected" : "");
                return "<option" + htmlSelected + " class='"+htmlClass+"'>" + otherCharName + "</option>"
            });
            element.append(separatorElement);
        });
        element.off(event);
        element.on(event, function () {
            button.charSelectOptionClick(element.children(childrenSelector));
        });
    },
    /**
     * Carga la lista de estadísticas de un personaje en un elemento select.
     */
    loadStatSelection: function() {
        var statsList = charFunctions.statsToArray(char), element = $('tr.stat-select select'), cur;
        element.each(function() {
            cur = $(this).empty();
            list.appendList(cur, statsList, function(child) {
                return "<option id='"+child.name+"'>" + util.fancy(child.name) + " - " + child.level + "</option>"
            });
        });
    },
    /**
     * Rellena un elemento con una lista de elementos.
     * @param element Elemento a rellenar.
     * @param list Lista de elementos.
     * @param newChild Callback que define cómo se agrega cada elemento hijo.
     */
    appendList: function(element, list, newChild) {
        var childs = "", addChild = function(ch) {
            childs += ch
        };
        list.forEach(function(obj) {
            addChild(newChild(obj))
        });
        element.append(childs);
    },
    /**
     * Comprueba si el elemento lista de personajes existe.
     * @returns {boolean}
     */
    exists: function() {
        return $('select#char-list').length > 0;
    }
};