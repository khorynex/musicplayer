import {MusicPlayer} from "./components/musicPlayer"
import {AllSongs} from "./components/allSongs"
import {Playlists} from "./components/playlists"
import {BrowserRouter, Routes, Route} from "react-router"
import {MusicProvider} from "./context/MusicContext"
import {Navbar} from "./components/navbar"

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className="app">
          <Navbar />
          <main className="app-main">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App