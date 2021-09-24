import axios from "axios";

let api = axios.create({
    headers: {
        'Client-ID' : '06o94ea913ce4tyw6yiwkfdm8y6qjb',
        'Authorization' : 'Bearer htabevr7daw45c1lor7shazrckdclh'
    }
})
/*
 Client_ID = '06o94ea913ce4tyw6yiwkfdm8y6qjb'
 Redirect = 'http://localhost/'
 LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token
LIEN Rempli = https://id.twitch.tv/oauth2/authorize?client_id=06o94ea913ce4tyw6yiwkfdm8y6qjb&redirect_uri=http://localhost/&response_type=token
*/
export default api;
