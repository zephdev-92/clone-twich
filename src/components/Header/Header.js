import React, {useState, useEffect} from 'react'
import Logo from './IconeTwitch.svg'
import Search from './Search.svg'
import MenuIco from './MenuIco.svg'
import Croix from './Croix.svg'
import {Link} from 'react-router-dom'
function Header() {
    const [menu, setMenu] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth);
    const [searchInput, setSearch] = useState('');
    const toggleNav = () => {
       setMenu(!menu)
      };
      const hideMenu = () => {
          if(menu === true){
              setMenu(!menu);
          }
      }
      useEffect(() => {
        const changeWidth = () => {
            setLargeur(window.innerWidth)
        }
        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
      }, [])

     const handleSubmit = (e) => {
         e.preventDefault()
     }
     const handleKeyPress = (e) => {
         setSearch(e.target.value);
     }
    return (
        <div>
            <nav className="headerTop">
            {(menu || largeur > 900) && (
                    <ul className="listMenu">
                        <li onClick={hideMenu} className="linkNav">
                            <Link className="link" to="/">
                                <img src={Logo} alt="logo twitch" className="logo" />
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="linkNav">
                            <Link className="link" to="/">
                                Top Games
                            </Link>
                            </li>
                        <li onClick={hideMenu} className="linkNav">
                            <Link className="link" to="/top-streams">
                                Top Streams
                            </Link>
                            </li>
                        <li className="linkNav">
                            <form className="formSubmit" onSubmit={handleSubmit}>
                                <input required value={searchInput} onChange={(e) => handleKeyPress(e)} type="text" className="inputRecherche" />
                                <Link
                                className="link"
                                to={{ pathname: `/resultas/${searchInput}` }}
                                >
                                    <button type="submit">
                                        <img src={Search} alt="icone loupe" className="logoLoupe" />
                                    </button>
                                </Link>
                            </form>
                        </li>
                    </ul>
                )}
            </nav>
            <div className="menuResBtn">

                <img onClick={toggleNav} src={!menu ? MenuIco : Croix } alt="icone menu resposive" className="menuIco" />
            </div>
        </div>
    )
}

export default Header

