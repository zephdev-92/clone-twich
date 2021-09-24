import React, {useState, useEffect} from 'react';
import api from '../../api';
import {Link} from 'react-router-dom'
function TopStreams() {
    const [topChannels, setTopChannels] = useState([])


    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/streams')
            let dataArray = result.data.data;
            //console.log( dataArray );
            let gamesIDs = dataArray.map(stream => {
                return stream.game_id;
            })
            let usersIDs = dataArray.map(stream => {
                return stream.user_id;
            })
            //console.log(gamesIDs, usersIDs);

            // URLS personnalisés

            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let queryParamsGames = "";
            let queryParamsUsers = "";

            gamesIDs.map(id => {
                return ( queryParamsGames = queryParamsGames + `id=${id}&` )
            })
            usersIDs.map(id => {
                return ( queryParamsUsers = queryParamsUsers + `id=${id}&` )
            })

            // URL final

            let urlFinalGames = baseUrlGames + queryParamsGames;
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;

            //console.log(urlFinalGames, urlFinalUsers );

            // Appel

            let gamesNames = await api.get(urlFinalGames)
            let getUsers = await api.get(urlFinalUsers)

            let gamesNamesArray = gamesNames.data.data
            let usersArray = getUsers.data.data

            //console.log(gamesNamesArray, usersArray);

            // Tableau final
            let finalArray = dataArray.map(stream => {

                stream.gameName = ""
                stream.login = ""

                gamesNamesArray.forEach(name => {
                   usersArray.forEach(user => {
                    if (stream.user_id === user.id && stream.game_id === name.id ) {

                        stream.gameName = name.name
                        stream.login = user.login

                    }
                    })
                })
                let newUrl = stream.thumbnail_url
                .replace("{width}", "320")
                .replace("{height}", "180");
                stream.thumbnail_url = newUrl;
                return stream;

            })

            setTopChannels(finalArray)

        }
        fetchData();
    }, [])
    return (
        <div>
             <h1 className="titleGames">Stream les plus populaires</h1>
             <div className="flexHome">
                 {topChannels.map((channel, index) => (
                     <div key={index} className="cardStream">
                      <img src={channel.thumbnail_url} alt="jeu" className="imgCard" />
                      <div className="bodyCardStream">
                            <h5 className="titleCardStream">{channel.user_name}</h5>
                            <p className="textStream">Jeu {channel.gameName} </p>
                            <p className="textStream viewers">Viewers : {channel.viewer_count} </p>
                            <Link className="link" to={{ pathname: `live/${channel.login}` }}>
                                <div className="btnCard">Regarder {channel.user_name}</div>
                            </Link>
                        </div>
                     </div>
                 ))}
             </div>
        </div>
    )
}

export default TopStreams;

