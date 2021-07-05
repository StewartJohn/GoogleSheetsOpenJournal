function fetchEssay(){
    fetch('template.mustache')
    .then((response) => response.text())
    .then((template) => {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var postID = url.searchParams.get("essayID");
        console.log(postID);

        var template = document.getElementById('template').innerHTML;

        var sheetUrl = 'https://spreadsheets.google.com/feeds/list/1sSDTd148aQcaHDmPUKSKQpNuilUMScA_b78BU-3mwI0/1/public/values?alt=json';

        // Invoke the ajax request first
        var xhr = new XMLHttpRequest();
        xhr.open('GET', sheetUrl);
        xhr.onload = function () {       

        //filter the incoming json for the rows relevant to the article
        var entries = JSON.parse(xhr.responseText);
        entries = entries.feed.entry;
        console.log(entries);

        entries = entries.filter(function (entry) {
        return entry.gsx$article.$t == postID;
        });

        console.log(entries);

        var data = {};

        for(var entry of entries){
            switch(entry.gsx$version.$t){
                case "":
                    data.author = entry.gsx$printname.$t;
                    data.location = entry.gsx$location.$t;
                    data.author_url = entry.gsx$personurl.$t;
                    data.author2 = entry.gsx$printname2.$t;
                    data.location2 = entry.gsx$location2.$t;
                    data.author_url2 = entry.gsx$personurl2.$t;                    
                    data.author3 = entry.gsx$printname3.$t;
                    data.location3 = entry.gsx$location3.$t;
                    data.author_url3 = entry.gsx$personurl3.$t;                    
                    data.title = entry.gsx$title.$t;
                    data.status = entry.gsx$evaluation.$t;
                    data.featured_image = entry.gsx$featuredimageidentifier.$t;
                    data.image_attribution = entry.gsx$imagecredit.$t;
                    break;
                case "1":
                    switch(entry.gsx$typecode.$t){
                        case "a":
                            data.essay_submission_v1 = entry.gsx$submissiondate.$t;
                            data.essay_url_v1 = entry.gsx$fileurl.$t;
                            break;
                        case "b":
                            data.bibliography_submission_v1 = entry.gsx$submissiondate.$t;
                            data.bibliography_url_v1 = entry.gsx$fileurl.$t;
                            break;
                        case "r1":
                            data.r1_author_v1 = entry.gsx$printname.$t;
                            data.r1_author_url_v1 = entry.gsx$personurl.$t;
                            data.r1_location_v1 = entry.gsx$location.$t;
                            data.r1_submission_v1 = entry.gsx$submissiondate.$t;
                            data.r1_status_v1 = entry.gsx$evaluation.$t;
                            data.r1_url_v1 = entry.gsx$fileurl.$t;
                            break;
                        case "r2":
                            data.r2_author_v1 = entry.gsx$printname.$t;
                            data.r2_author_url_v1 = entry.gsx$personurl.$t;
                            data.r2_location_v1 = entry.gsx$location.$t;
                            data.r2_submission_v1 = entry.gsx$submissiondate.$t;
                            data.r2_status_v1 = entry.gsx$evaluation.$t;
                            data.r2_url_v1 = entry.gsx$fileurl.$t;
                            break;
                        case "r3":
                            data.r3_author_v1 = entry.gsx$printname.$t;
                            data.r3_author_url_v1 = entry.gsx$personurl.$t;
                            data.r3_location_v1 = entry.gsx$location.$t;
                            data.r3_submission_v1 = entry.gsx$submissiondate.$t;
                            data.r3_status_v1 = entry.gsx$evaluation.$t;
                            data.r3_url_v1 = entry.gsx$fileurl.$t;
                            break;
                        case "eds":
                            data.eds_submission_v1 = entry.gsx$submissiondate.$t;
                            data.eds_status_v1 = entry.gsx$evaluation.$t;
                            data.eds_url_v1 = entry.gsx$fileurl.$t;
                            break;
                        default:
                            console.log("default entry");
                            break;
                    }
                    break;
                case "2":
                    switch(entry.gsx$typecode.$t){
                        case "a":
                            data.essay_submission_v2 = entry.gsx$submissiondate.$t;
                            data.essay_url_v2 = entry.gsx$fileurl.$t;
                            break;
                        case "b":
                            data.bibliography_submission_v2 = entry.gsx$submissiondate.$t;
                            data.bibliography_url_v2 = entry.gsx$fileurl.$t;
                            break;
                        case "r1":
                            data.r1_author_v2 = entry.gsx$printname.$t;
                            data.r1_author_url_v2 = entry.gsx$personurl.$t;
                            data.r1_location_v2 = entry.gsx$location.$t;
                            data.r1_submission_v2 = entry.gsx$submissiondate.$t;
                            data.r1_status_v2 = entry.gsx$evaluation.$t;
                            data.r1_url_v2 = entry.gsx$fileurl.$t;
                            break;
                        case "r2":
                            data.r2_author_v2 = entry.gsx$printname.$t;
                            data.r2_author_url_v2 = entry.gsx$personurl.$t;
                            data.r2_location_v2 = entry.gsx$location.$t;
                            data.r2_submission_v2 = entry.gsx$submissiondate.$t;
                            data.r2_status_v2 = entry.gsx$evaluation.$t;
                            data.r2_url_v2 = entry.gsx$fileurl.$t;
                            break;
                        case "r3":
                            data.r3_author_v2 = entry.gsx$printname.$t;
                            data.r3_author_url_v2 = entry.gsx$personurl.$t;
                            data.r3_location_v2 = entry.gsx$location.$t;
                            data.r3_submission_v2 = entry.gsx$submissiondate.$t;
                            data.r3_status_v2 = entry.gsx$evaluation.$t;
                            data.r3_url_v2 = entry.gsx$fileurl.$t;
                            break;
                        case "eds":
                            data.eds_submission_v2 = entry.gsx$submissiondate.$t;
                            data.eds_status_v2 = entry.gsx$evaluation.$t;
                            data.eds_url_v2 = entry.gsx$fileurl.$t;
                            break;
                        case "rsp":
                            data.rsp_url_v2 = entry.gsx$fileurl.$t;
                            data.rsp_submission_v2 = entry.gsx$submissiondate.$t;
                        default:
                            console.log("default entry");
                            break;
                    }
                    break;
                case "3":
                    switch(entry.gsx$typecode.$t){
                        case "a":
                            data.essay_submission_v3 = entry.gsx$submissiondate.$t;
                            data.essay_url_v3 = entry.gsx$fileurl.$t;
                            break;
                        case "b":
                            data.bibliography_submission_v3 = entry.gsx$submissiondate.$t;
                            data.bibliography_url_v3 = entry.gsx$fileurl.$t;
                            break;
                        case "r1":
                            data.r1_author_v3 = entry.gsx$printname.$t;
                            data.r1_author_url_v3 = entry.gsx$personurl.$t;
                            data.r1_location_v3 = entry.gsx$location.$t;
                            data.r1_submission_v3 = entry.gsx$submissiondate.$t;
                            data.r1_status_v3 = entry.gsx$evaluation.$t;
                            data.r1_url_v3 = entry.gsx$fileurl.$t;
                            break;
                        case "r2":
                            data.r2_author_v3 = entry.gsx$printname.$t;
                            data.r2_author_url_v3 = entry.gsx$personurl.$t;
                            data.r2_location_v3 = entry.gsx$location.$t;
                            data.r2_submission_v3 = entry.gsx$submissiondate.$t;
                            data.r2_status_v3 = entry.gsx$evaluation.$t;
                            data.r2_url_v3 = entry.gsx$fileurl.$t;
                            break;
                        case "r3":
                            data.r3_author_v3 = entry.gsx$printname.$t;
                            data.r3_author_url_v3 = entry.gsx$personurl.$t;
                            data.r3_location_v3 = entry.gsx$location.$t;
                            data.r3_submission_v3 = entry.gsx$submissiondate.$t;
                            data.r3_status_v3 = entry.gsx$evaluation.$t;
                            data.r3_url_v3 = entry.gsx$fileurl.$t;
                            break;
                        case "eds":
                            data.eds_submission_v3 = entry.gsx$submissiondate.$t;
                            data.eds_status_v3 = entry.gsx$evaluation.$t;
                            data.eds_url_v3 = entry.gsx$fileurl.$t;
                            break;
                        case "rsp":
                            data.rsp_url_v3 = entry.gsx$fileurl.$t;
                            data.rsp_submission_v3 = entry.gsx$submissiondate.$t;                        
                        default:
                            console.log("default entry");
                            break;
                    };
                    break;            
            };
        };

        var rendered = Mustache.render(template, data);
        document.getElementById('target').innerHTML = rendered;

        }
        xhr.send();         
    });
}