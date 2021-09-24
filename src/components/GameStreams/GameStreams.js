import React, {useState, useEffect} from 'react'
import api from '../../api'
import {useLocation, useParams, Link} from 'react-router-dom'
function GameStreams() {
    let location = useLocation();
    console.log(location);
    let {slug} = useParams();
    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);

     useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
            let dataArray = result.data.data;
            //console.log(dataArray);
            let finalArray = dataArray.map(stream => {
                let newUrl = stream.thumbnail_url
                .replace("{width}", "320")
                .replace("{height}", "180");
                stream.thumbnail_url = newUrl;
                return stream;
            })
            // cacul des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0)
            let usersIDs = dataArray.map(stream => {
                return stream.user_id;
            })

            let baseUrlUsers = "https://api.twitch.tv/helix/users?";

            let queryParamsUsers = "";

            usersIDs.map(id => {
                return ( queryParamsUsers = queryParamsUsers + `id=${id}&` )
            })
            let finalUrl = baseUrlUsers +queryParamsUsers;
            let getUsersLogin = await api.get(finalUrl);
            let userLoginArray = getUsersLogin.data.data;

            finalArray = dataArray.map(stream => {
                stream.login = "";

                userLoginArray.forEach(login => {
                    if (stream.user_id === login.id) {
                        stream.login = login.login;

                    }

                })
                return stream;

            })

            setViewers(totalViewers)
            setStreamData(finalArray)
        }
        fetchData();
    }, [location.state.gameID])
    return (
        <div>
            <h1 className="titleGameStreams">{slug}</h1>
            <h3 className="subtitleGameStreams">
                <strong className="textColorRed">{viewers}</strong> personnes regardent {slug}
            </h3>
            <div className="flexHome">
                {streamData.map((stream,index) => (
                    <div key={index} className="cardGameStreams">
                        <img src={stream.thumbnail_url} alt="jeu" className="imgCard" />
                        <div className="bodyCardGameStreams">
                            <h5 className="titleCardStream">{stream.user_name}</h5>
                            <p className="textStream">Nombre de viewers {stream.viewer_count} </p>
                            <Link className="link" to={{ pathname: `/live/${stream.user_login}` }}>
                                <div className="btnCard">Regarder {stream.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameStreams;
