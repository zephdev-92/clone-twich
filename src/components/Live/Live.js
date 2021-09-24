import React, {useState, useEffect} from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import api from '../../api';
import {useParams} from 'react-router-dom'
function Live() {

    let {slug} = useParams();

    const [infoStream, setSInfoStream] = useState([]);
    //const [infoGame, setSInfoGame] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)
            if(result.data.data === 0) {
                setSInfoStream(false)
            } else {


        //console.log(result.data.data[0]);
        //    let gameID = result.data.data.map(gameid => {
        //        return gameid.game_id;
        //    })
        //    const resultNomGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`)
        //    // console.log(resultNomGame);
        //    let nomJeu = resultNomGame.data.data.map(gameName => {
        //        return gameName.name;
        //    })
        //    setSInfoGame(nomJeu)
           setSInfoStream(result.data.data[0])
           }
        }
        fetchData();
    }, [slug])
    return (
        infoStream ?
  <div className="containerDecale">
        <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
        <div className="contInfo">
            <div className="titleStream">{infoStream.title}</div>
            <div className="viewer">Viewers : {infoStream.viewer_count}</div>
            <div className="infoGame">Streamer : {infoStream.user_name} &nbsp; Langue : {infoStream.language}</div>
            <div className="nameGame"> Jeu : {infoStream.game_name} </div>
        </div>
    </div>
        :

    <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
            <div className="contInfo">
                <div className="titleStream">Le streamer est offline !</div>

            </div>
        </div>
    )
}

export default Live

