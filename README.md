# startpage [[demo]](https://www.bysimeon.com/start/)

a [/r/startpage](https://www.reddit.com/r/startpages/) and [**new tab page**](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna?hl=en)

## config

### lastfm

  to show your current scrobble from last.fm (or libre.fm), update the apikey and username.

  ```javascript
  apikey = ""; // FILL IN
  apibase = "https://ws.audioscrobbler.com/2.0/";
  user = ""; // FILL IN
  ```

### weather

  open weather map is being used, location is grabbed with navigator.geolocation, add your own api key in the api url.

  ```javascript
  xhr.open('GET',
    'http://api.openweathermap.org/data/2.5/weather?zip=ZIPCODE,us&units=Imperial&appid=APIKEY'
  );
  ```

### links

  just copy the filler links in the bookmark container and add your own!

### search

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

you can add background to toggle throughy by adding images, colors, or gradients to the background array (example below)

  ```javascript
  ['#08AEEA', 'linear-gradient(to left, #e2e2e2 0%, #2AF598 100%)']
  ```

  the background will be set to both values, so you can add a fallback.
  
---

thanks to [jaredk3nt](https://github.com/Jaredk3nt/homepage) and [maxbeier](https://github.com/maxbeier/text-spinners) for the resources and inspiration.

