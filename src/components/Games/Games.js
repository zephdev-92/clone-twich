import React, {useState, useEffect} from 'react'
import api from '../../api'
import {Link} from 'react-router-dom'

function Games() {

    const [games, setGames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            console.log(result);
            let dataArray = result.data.data;
            let finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url
                .replace("{width}", "250")
                .replace("{height}", "300");
                game.box_art_url = newUrl;
                return game;
            });

            setGames(finalArray)
        }
        fetchData();
    }, [])
//console.log(games);
    return (
        <div>
            <h1 className="titleGames">Jeux les plus populaires</h1>
            <div className="flexHome">
                {games.map((game, index) => (
                    <div key={index} className="cardGame">
                        <img src={game.box_art_url} alt={game.name} className="imgCard" />
                        <div className="bodyCardGame">
                            <h5 className="titleCardGame">{game.name}</h5>
                            <Link className="link"
                            to={{ pathname: "game/" + game.name,
                            state: {gameID: game.id} }} >
                                <div className="btnCard">Regarder {game.name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Games

