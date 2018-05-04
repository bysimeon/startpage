# startpage [[demo]](https://www.bysimeon.com/start.html)

/r/startpage or **new tab page**

firstly, shout out to [JaredK3nt](https://github.com/Jaredk3nt/homepage) and [maxbeier](https://github.com/maxbeier/text-spinners) for the resources and inspiration.

## config

### lastfm

  to show your current scrobble from last.fm (or libre.fm), update the apikey and username.

  ```javascript
  apikey = ""; // FILL IN
  apibase = "https://ws.audioscrobbler.com/2.0/";
  user = ""; // FILL IN
  ```

### weather

  open weather map is being used. to set to your location. change the zip code in the api call.

  ```javascript
  xhr.open('GET',
    'http://api.openweathermap.org/data/2.5/weather?zip=ZIPCODE,us&units=Imperial&appid=APIKEY'
  );
  ```

### links

  just copy the filler links in the bookmark container and add your own!

  adding sites to search
  add a definition to the searchmod dictionary with the following infortmation (example below)

  ```javascript
  "e:": ["example", "https://example.com/search?q=", "(to right, #fe8c00, #f83600)", "#fe8c00"]
  ```

- the key is the what you type before your querty to search that site
- the first element is the name displayed above the searchbar
- the second element is the site's base search url
- the third element is the background for the searchbox (i recommend gradients)
- the fourth element is the color of the name displated above the searchbox

### background switcher

you can toggle through background from by adding to the backgrounds array. (example below)

  ```javascript
  ['#08AEEA', 'linear-gradient(to left, #e2e2e2 0%, #2AF598 100%)']
  ```

  background is set to both values, so you can use it fallback or to makesure -webkit is covered
