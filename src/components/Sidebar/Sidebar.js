import React, {useState, useEffect} from 'react'
import api from '../../api';
import { Link } from 'react-router-dom';
function Sidebar() {

    const [topStreams, setTopStreams ] = useState([])

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
                stream.truePic = ""
                stream.login = ""

                gamesNamesArray.forEach(name => {
                   usersArray.forEach(user => {
                    if (stream.user_id === user.id && stream.game_id === name.id ) {

                        stream.truePic = user.profile_image_url
                        stream.gameName = name.name
                        stream.login = user.login

                    }
                    })
                })

                return stream;

            })

            setTopStreams(finalArray.slice(0,6))

        }
        fetchData();
    }, [])
    //console.log(topStreams);
    return (
        <div className="sidebar">
            <h2 className="titlesidebar">
                Chaine recommandées
            </h2>
            <ul className="listStreams">
                {topStreams.map((stream, index) => (
                   <Link key={index} className="link" to={{ pathname: `/live/${stream.login}` }}>
                        <li key={index} className="containerFlexItem">
                            <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
                            <div className="streamUser">{stream.user_name} </div>
                            <div className="viewerRight">
                                <div className="pointRouge"></div>
                                <div>{stream.viewer_count}</div>
                            </div>
                            <div className="gameNameSidebar">{stream.gameName}</div>
                        </li>
                   </Link>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;
