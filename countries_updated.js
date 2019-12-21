function get_tags_for_item_js(item) 
{
    var outputObject = new Object();
    for (rule in tags_db.rules) {
        let field = tags_db.rules[rule].field;
        let tag_set = tags_db.rules[rule].tag_set;
        if (!outputObject[field]) {
            outputObject[field] = new Object();
        }
        outputObject[field][tag_set] = new Array();
        toExtractTags(field, tag_set);
    }
    return JSON.stringify(outputObject);

    function toExtractTags(fieldname, tag_set) {
        /*
        for (key in tags_db.tags[tag_set]) {
            var tagAttribute = tags_db.tags[tag_set][key];
            for (tags in tagAttribute) {
                var checkString = item[fieldname].toLowerCase();
                if (checkString.includes(tagAttribute[tags]) && outputObject[fieldname][tag_set].length == 0) {
                    outputObject[fieldname][tag_set].push(key);
                    break;
                }
            }
        }*/
        
        var orginalString = item[fieldname].split('.').join('') + ' ';
        var copyString = orginalString;
        console.log(copyString);
        while (orginalString.length != 0) {
            for (key in tags_db.tags[tag_set]) {
                var tagAttribute = tags_db.tags[tag_set][key];
                for (alis in tagAttribute) {
                    if (copyString === tagAttribute[alis]) {
                        let copyStringLen = copyString.length;
                        //console.log(copyString);
                        outputObject[fieldname][tag_set].push(key);
                        orginalString = orginalString.substring(copyStringLen + 1, orginalString.length);
                        copyString = orginalString;
                    }
                }
            }
            let lastIndex = copyString.lastIndexOf(" ");
            if (lastIndex != -1) {
                copyString = copyString.substring(0, lastIndex)
            }
        }

    }
}

//DATABASE
var tags_db = {
    "tags": {
        "countries": {
            "usa": ["united states of america", "united states", "usa"],
            "uk": ["uk", "united kingdom"],
            "uae": ["uae", "united arab emirates"],
            "yemen": ["yemen"],
            "utd": ["united", "utd"],
            "states": ["states"]
        },
        "colours": {
            "blue": ["blue", "turquoise"],
            "red": ["red", "crimson", "blood"]
        }
    },
    "rules": [
        { "field": "title", "tag_set": "countries" },
        { "field": "description", "tag_set": "countries" },
        { "field": "description", "tag_set": "colours" }
    ]
}

// example input 1:
var item_1 = {
    "title": "US's crimson flag.",
    "description": "The United States is considering pulling out of ... The red, blue and white flag ..."
}
var item_2 = {
    "title": "UTD is in the finals",
    "description": "United has made it to the finals on Sunday"
}
let outputJSON = get_tags_for_item_js(item_1);

console.log(outputJSON); 