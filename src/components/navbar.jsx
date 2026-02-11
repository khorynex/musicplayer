import {Link, useLocation} from "react-router"

export const Navbar = () => {
    const location = useLocation()
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link className="brand-link" to="/musicplayer">🎵 Music Player</Link>
            </div>

            <div className="navbar-links">
                <Link className={`nav-link ${location.pathname === '/musicplayer/' ? "active" : ""}`} to='/musicplayer/'>All Songs</Link>
                <Link className={`nav-link ${location.pathname === '/musicplayer/playlists/' ? "active" : ""}`} to='/musicplayer/playlists/'>Playlists</Link>
            </div>
        </nav>
    );
}