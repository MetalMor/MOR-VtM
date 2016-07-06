/**
 * Objeto convertidor de HTML en PDF.
 * Created by mor on 5/07/16.
 */

var pdf = {
    convert: function (source) {
        /*var doc = new jsPDF('p', 'mm');
         doc.addImage(source, 'PNG');
         doc.save(Date.now()+'.pdf');*/
        var pdf = new jsPDF('p', 'pt', 'letter'),
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            },
            options = {
                width: margins.width
            }

        pdf.fromHTML(source, margins.left, margins.top, options,
            function (dispose) {
                pdf.save(Date.now() + '.pdf');
            }, margins);
    }
};