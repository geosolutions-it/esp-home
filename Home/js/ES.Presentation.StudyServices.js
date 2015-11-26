/* FUNCTIONS
function loadStudyServices(id)
function loadStudyMetadata(data)
function addTableItemStudy(parent, dvtxt, css, text)
*/

/*
Name:       loadStudyServices
Goal:       open the modal object, with metadata of the clicked studyname
Input:      id of the study
Output:     
Caller:     selectstudy (data.js)
*/
function loadStudyServices(id) {
    $.ajax(ajaxUrls.getStudyById+"?id=" + id)
    .done(function (data) {
        try {
            loadStudyMetadata(myParseJSON(data));
            
        } catch (e) {
            var a = 0;
        }
    })
    .fail(function () {
        var a = 0;
    });

}

/*
Name:       loadStudyMetadata
Goal:       
Input:      json object (study)
Output:     
Caller:     loadStudyServices
*/
function loadStudyMetadata(data) {
    var modalwidth = divsConfig.window.minWidth / 10 * 9;
    var modalheight = (divsConfig.window.minHeight - $("#div_header").height() - $("#div_footer").height()) / 10 * 9;
    var modalcontent = $("#content").empty();
    modalcontent.css({ "width": modalwidth, "height": modalheight, "background": "#7ea2ce" });

    addTableItemStudy(modalcontent, "studyMetadata11", 'top:0%;left:0%;height:21%;width:22.50%;', '<b>Name of the mapping study:</b>');
    addTableItemStudy(modalcontent, "studyMetadata12", 'top:0%;left:25%;height:21%;width:22.50%;', '');
    addTableItemStudy(modalcontent, "studyMetadata13", 'top:0%;left:50%;height:21%;width:22.50%;', '<b>Purpose of the study:</b> (e.g. biodiversity conservation, awareness/ communication, scenatio/trend analysis, valuation, mapping, ex-ante decision support, regulating/ monitoring policy, methodology ');
    addTableItemStudy(modalcontent, "studyMetadata14", 'top:0%;left:75%;height:21%;width:22.50%;', '');

    addTableItemStudy(modalcontent, "studyMetadata21", 'top:25%;left:0%;height:26%;width:22.50%;', '<b>Location of the study site(s):</b>');
    addTableItemStudy(modalcontent, "studyMetadata22", 'top:25%;left:25%;height:26%;width:22.50%;', '');

    addTableItemStudy(modalcontent, "studyMetadata23a", 'top:25%;left:50%;height:11%;width:22.50%;', '<b>Study duration (e.g 2000-2005):</b>');
    addTableItemStudy(modalcontent, "studyMetadata24a", 'top:25%;left:75%;height:11%;width:22.50%;', '');
    addTableItemStudy(modalcontent, "studyMetadata23b", 'top:40%;left:50%;height:11%;width:22.50%;', '<b>Main investigators</b> (name and affiliation):');
    addTableItemStudy(modalcontent, "studyMetadata24b", 'top:40%;left:75%;height:11%;width:22.50%;', '');

    addTableItemStudy(modalcontent, "studyMetadata31", 'top:55%;left:0%;height:11%;width:22.50%;', '<b>References</b>  (publication, project www-link):');
    addTableItemStudy(modalcontent, "studyMetadata32", 'top:55%;left:25%;height:11%;width:22.50%;', '');
    addTableItemStudy(modalcontent, "studyMetadata33", 'top:55%;left:50%;height:11%;width:22.50%;', '<b>Type of project</b> (e.g Reseach, Outreach,Education [PhD,MSc]):');
    addTableItemStudy(modalcontent, "studyMetadata34", 'top:55%;left:75%;height:11%;width:22.50%;', '');

    addTableItemStudy(modalcontent, "studyMetadata41", 'top:70%;left:0%;height:11%;width:22.50%;', '<b>Funding source:</b>');
    addTableItemStudy(modalcontent, "studyMetadata42", 'top:70%;left:25%;height:11%;width:22.50%;', '');
    addTableItemStudy(modalcontent, "studyMetadata43", 'top:70%;left:50%;height:11%;width:22.50%;', '<b>Contact details: </b>');
    addTableItemStudy(modalcontent, "studyMetadata44", 'top:70%;left:75%;height:11%;width:22.50%;', '');

    addTableItemStudy(modalcontent, "studyMetadata51", 'top:85%;left:0%;height:11%;width:22.50%;', '<b>Keywords:</b>');
    addTableItemStudy(modalcontent, "studyMetadata52", 'top:85%;left:25%;height:11%;width:72.50%;', '');

    if (data) {
        data = data.records[0];
        if (data.study_name) $("#studyMetadata12").html(data.study_name);
        if (data.study_purpose) $("#studyMetadata14").html(data.study_purpose);
        if (data.study_location) $("#studyMetadata22").html(data.study_location);
        if (data.study_duration) $("#studyMetadata24a").html(data.study_duration);
        if (data.main_investigators) $("#studyMetadata24b").html(data.main_investigators);
        if (data.project_references) $("#studyMetadata32").html(data.project_references);
        if (data.project_type) $("#studyMetadata34").html(data.project_type);
        if (data.funding_source) $("#studyMetadata42").html(data.funding_source);
        if (data.contact_details) $("#studyMetadata44").html(data.contact_details);
        if (data.keywords) $("#studyMetadata52").html(data.keywords);
    }

    modal.open({ content: $(modalcontent.html()), width: modalwidth, height: modalheight });

}



/*
Name:       addTableItemStudy
Goal:       help function
Input:      
Output:     
Caller:     loadStudyMetadata
*/
function addTableItemStudy(parent, dvtxt, css, text) {
    var str = '<div id="' + dvtxt + '" style="' + css + '" class="studyMetadataClass">' + text + '</div>';
    parent.append(str);

}

