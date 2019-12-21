
<script>

function get_tags_for_item_js(item)
{
    var x=0,y=0;
    var output = {
        "title" : {
            "countries" : []
        },
        "description" : {
            "countries" : [],
            "colours" : []
        }
    };
//-------From expected output, it's obtained that a single country tag is allowed for each ------//
    var titleCountryTagCount = 0, descCountryTagCount = 0;
    var matchedTCF, matchedDCF; 

//for country tags obtaining
    for(x in tags_db.tags.countries)
    {   

        var currTitle = 0, currDesc = 0;
        //console.log(tags_db.tags.countries[x]);
        var temp = tags_db.tags.countries[x];
        for(y=0; y<temp.length;y++)
        {
            //console.log(temp[y]);
            var string_1 = item.title.toLowerCase();

            //Country tags from TITLE field

            if(string_1.includes(temp[y]))
            {
            //    console.log(temp[y]);
                
            //    output.title.countries.push(x);
                currTitle += 1;

                if(titleCountryTagCount < currTitle)
                {
                matchedTCF = x;
                titleCountryTagCount = currTitle;
                }
            }

            //Country tags from DESCRIPTION field

            var string_2 = item.description.toLowerCase();
            if(string_2.includes(temp[y]))
            {
            //    console.log(temp[y]);
            //    output.description.countries.push(x);
                currDesc += 1;

                if(descCountryTagCount < currDesc)
                {
                matchedDCF = x;
                descCountryTagCount = currDesc;
                
                //console.log(descCountryTagCount,currDesc, matchedDCF);
                }
            }

        }


    }
    if(matchedTCF != undefined)
    {
        output.title.countries.push(matchedTCF);
    }
    if(matchedDCF != undefined)
    {
        output.description.countries.push(matchedDCF);
    }

//for colour tags obtaining
for(x in tags_db.tags.colours)
    {   
        //console.log(tags_db.tags.countries[x]);
        var temp = tags_db.tags.colours[x];
        for(y=0; y<temp.length;y++)
        {
            //console.log(temp[y]);
            /*-------------No colour tags from title-----------------
            var string_1 = item.title.toLowerCase();
            if(string_1.includes(temp[y]))
            {
                console.log(temp[y]);
            }
            */

            // Colour tags from DESCRIPTION field


            var string_2 = item.description.toLowerCase();
            if(string_2.includes(temp[y]))
            {
            //    console.log(temp[y]);
                
                output.description.colours.push(x);
            }
        }
    }

   // console.log(tags_db["tags"].countries);
   // console.log(tags_db["tags"].colours);

   //console.log(output);

   return output;
    
}

//DATEBASE
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


//EXAMPLE SET

var item_1 = {
  "title": "US's crimson flag",
  "description": "The United States is considering pulling out of ... The red, blue and white flag ..."
}

var item_2 = {
  "title": "UTD is in the finals",
  "description": "United has made it to the finals on Sunday"
}

var item_3 = {
  "title": "US's crimson flag",
  "description": "The United States uae united arab emirates is considering pulling out of ... The red, blue and white flag ..."
}


var obtainedJSON = get_tags_for_item_js(item_3);



</script>
