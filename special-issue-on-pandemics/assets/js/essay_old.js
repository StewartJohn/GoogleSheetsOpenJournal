//This is an older version of the essay.js file. We've preserved it to document the dev process, but it's not used in the site.

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

        for(entry of entries){
            switch(entry.gsx$typecode.$t){
                case "":
                    data.author = entry.gsx$printname.$t;
                    data.location = entry.gsx$location.$t;
                    data.author_url = entry.gsx$personurl.$t;
                    data.title = entry.gsx$title.$t;
                    data.status = entry.gsx$evaluation.$t;
                    data.featured_image = entry.gsx$featuredimageidentifier.$t;
                    break;
                case "a":
                    data.essay_version = entry.gsx$version.$t;
                    data.essay_submission = entry.gsx$submissiondate.$t;
                    data.essay_url = entry.gsx$fileurl.$t;
                    break;
                case "b":
                    data.bibliography_version = entry.gsx$version.$t;
                    data.bibliography_submission = entry.gsx$submissiondate.$t;
                    data.bibliography_url = entry.gsx$fileurl.$t;
                    break;
                case "r1":
                    data.r1_author = entry.gsx$printname.$t;
                    data.r1_author_url = entry.gsx$personurl.$t;
                    data.r1_location = entry.gsx$location.$t;
                    data.r1_version = entry.gsx$version.$t;
                    data.r1_submission = entry.gsx$submissiondate.$t;
                    data.r1_status = entry.gsx$evaluation.$t;
                    data.r1_url = entry.gsx$fileurl.$t;
                    break;
                case "r2":
                    data.r2_author = entry.gsx$printname.$t;
                    data.r2_author_url = entry.gsx$personurl.$t;
                    data.r2_location = entry.gsx$location.$t;
                    data.r2_version = entry.gsx$version.$t;
                    data.r2_submission = entry.gsx$submissiondate.$t;
                    data.r2_status = entry.gsx$evaluation.$t;
                    data.r2_url = entry.gsx$fileurl.$t;
                    break;
                case "r3":
                    data.r3_author = entry.gsx$printname.$t;
                    data.r3_author_url = entry.gsx$personurl.$t;
                    data.r3_location = entry.gsx$location.$t;
                    data.r3_version = entry.gsx$version.$t;
                    data.r3_submission = entry.gsx$submissiondate.$t;
                    data.r3_status = entry.gsx$evaluation.$t;
                    data.r3_url = entry.gsx$fileurl.$t;
                    break;
                case "eds":
                    data.eds_version = entry.gsx$version.$t;
                    data.eds_submission = entry.gsx$submissiondate.$t;
                    data.eds_status = entry.gsx$evaluation.$t;
                    data.eds_url = entry.gsx$fileurl.$t;
                    
                default:
                    console.log("default entry");
                    break;
            }
        }; 

        var rendered = Mustache.render(template, data);
        document.getElementById('target').innerHTML = rendered;

        }
        xhr.send();         
    });
}