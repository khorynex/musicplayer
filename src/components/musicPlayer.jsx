import {useMusic} from "../context/MusicContext"
import {useRef, useEffect} from "react"

export const MusicPlayer = () => {
    const {
        currentTrack, 
        currentTime, 
        setCurrentTime, 
        duration, 
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
    } = useMusic()
    const audioRef = useRef( null )

    const handleTimeChange = (e) => {
        const audio = audioRef.current;
        if( !audio ) return;
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime( newTime );
    };

    const handleVolumeChange = (e) => {
        setVolume( parseFloat(e.target.value) );
    }

    useEffect( () => {
        const audio = audioRef.current;
        if( !audio ) return;
        if( isPlaying ){
            audio.play().catch( err => console.error( err ));
        } else {
            audio.pause()
        }
    }, [ isPlaying ]);

    useEffect( () => {
        const audio = audioRef.current;
        if( !audio ) return;
        audio.volume = volume;
    }, [ volume ]);

    useEffect( () => {
        const audio = audioRef.current;
        if( !audio ) return;

        const handleLoadedMetadata = () => {
            setDuration( audio.duration );
            // audio.play()
            // setIsPlaying( true )
        };

        const handleTimeUpdate = () => {
            setCurrentTime( audio.currentTime )
        };

        const handleEnded = () => {
            nextTrack();
        };

        audio.addEventListener( "loadedmetadata", handleLoadedMetadata );
        audio.addEventListener( "canplay", handleLoadedMetadata );
        audio.addEventListener( "timeupdate", handleTimeUpdate );
        audio.addEventListener( "ended", handleEnded );

        return () => {
            audio.removeEventListener( "loadedmetadata", handleLoadedMetadata );
            audio.removeEventListener( "canplay", handleLoadedMetadata );
            audio.removeEventListener( "timeupdate", handleTimeUpdate );
            audio.removeEventListener( "ended", handleEnded );
        };
    }, [ setDuration, setCurrentTime, currentTrack, nextTrack]);
    
    useEffect( () => {
        const audio = audioRef.current;
        if( !audio ) return;
        audio.load();
        setCurrentTime( 0 );
        setDuration( 0 );
    }, [ currentTrack, setCurrentTime, setDuration]);

    const progressPercentage = duration > 0 ? ( currentTime / duration ) * 100 : 0;

    return (
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous" />

            <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
            </div>

            <div className="progress-container">
                <span className="time">{Math.floor(currentTime/60)}:{(currentTime%60)<10 ? "0" : ""}{Math.floor(currentTime%60)}</span>
                <input type="range" min="0" max={duration||0} step="0.1" value={currentTime} className="progress-bar" onChange={handleTimeChange} style={{"--progress": `${progressPercentage}%`}} />
                <span className="time">{Math.floor(duration/60)}:{(duration%60)<10 ? "0" : ""}{Math.floor(duration%60)}</span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={prevTrack}>⏮</button>
                <button className="control-btn play-btn" onClick={isPlaying ? pause : play}>{isPlaying ? `⏸` :`▶`}</button>
                <button className="control-btn" onClick={nextTrack}>⏭</button>
            </div>

            <div className="volume-container">
                <span className="volume-icon">🔊</span>
                <input type="range" min="0" max="1" step="0.01" className="volume-bar" onChange={handleVolumeChange} value={volume} />

            </div>
        </div>
    );
}