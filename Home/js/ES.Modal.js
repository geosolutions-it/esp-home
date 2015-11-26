/* FUNCTIONS
function prepareModal()
*/

/*
Name:       prepareModal
Goal:       creation of a "modal div", used for study object, maybe it should be used for the filter as well
Input:      for the creation nothing, for use "settings (width, height and content)"
Output:     a modal div object
Caller:     document ready
*/

function prepareModal() {
    $("#overlay").hide();
    $("#modal").hide(); doresize();
    modal = (function () {
        var method = {};


        // Center the modal in the viewport
        method.center = function () {
            var top, left;

            top = Math.max($("#div_content").height() - $("#modal").outerHeight(), 0) / 2;
            left = Math.max($("#div_content").width() - $("#modal").outerWidth(), 0) / 2;

            $("#modal").css({
                top: top + $("#div_content").scrollTop(),
                left: left + $("#div_content").scrollLeft()
            });
        };

        // Open the modal
        method.open = function (settings) {
            $("#content").empty().append(settings.content);

            $("#modal").css({
                width: settings.width || 'auto',
                height: settings.height || 'auto'
            })

            method.center();

            $("#div_content").bind('resize.modal', method.center);

            $("#modal").fadeIn(divsConfig.fadeSpeed);
            $("#overlay").show();
        };

        // Close the modal
        method.close = function () {
            $("#modal").fadeOut(divsConfig.fadeSpeed);
            $("#overlay").hide();
            $("#content").empty();
            $("#div_content").unbind('resize.modal');
        };
        $("#close").click(function (e) {
            e.preventDefault();
            method.close();
        });
        return method;
    } ());

}

