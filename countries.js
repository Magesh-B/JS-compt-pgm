function country_tags_for_item_js(item)
{
    for(field in item)
    {
        var countryTemporary = new Object();
        for( keyCountries in tags_db.tags.countries)
        {
            for(tags in tags_db.tags.countries[keyCountries])
            {        
                var checkString = item[field].toLowerCase();
                if (checkString.includes(tags_db.tags.countries[keyCountries][tags]))
                {
                    var keyMatched = tags_db.tags.countries[keyCountries][tags];
                    if(!Object.keys(countryTemporary).length)
                    {
                        countryTemporary[keyCountries] = keyMatched;    
                    }
                    else
                    {
                        for(available in countryTemporary)
                        {
                            if(available != keyCountries)
                            {
                            if(countryTemporary[available].length > keyMatched.length && !countryTemporary[available].includes(keyMatched))
                            {
                                countryTemporary[keyCountries] = keyMatched;
                            }
                            else if(countryTemporary[available].length < keyMatched.length && keyMatched.includes(countryTemporary[available]))
                            {
                                countryTemporary[keyCountries] = keyMatched;
                                delete countryTemporary[available];
                            }
                            }
                            else
                            {
                                if(countryTemporary[available].length < keyMatched.length)
                                {
                                    countryTemporary[available] = keyMatched;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(countryTemporary);
    }
}






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
  

var item_1 = {
    "title": "US's crimson flag",
    "description": "The United States is considering pulling out of the UK agreement ... The red, blue and white flag ..."
}

var item_2 = {
    "title": " States united arab emirates usa hdkjahd",
    "description": "United has made it to the finals on Sunday"
}

var item_3 = {
    "title": "crimson flag",
    "description": "The usa United states united arab emirates states"
}

let outputJSON = country_tags_for_item_js(item_2);
