import {useState, createContext, useContext, useEffect} from "react"

const songs = [
    {
        id: 1,
        title: "Aidu",
        artist: "khorynex",
        url: "/songs/aidu.mp3",
        duration: "2:33",
    },
    {
        id: 2,
        title: "Ala Ruban",
        artist: "khorynex",
        url: "/songs/ala ruban.mp3",
        duration: "3:53",
    },
    {
        id: 3,
        title: "Al-Qaza",
        artist: "khorynex",
        url: "/songs/alqaza.mp3",
        duration: "4:02",
    },
    {
        id: 4,
        title: "Ana Muslimun",
        artist: "khorynex",
        url: "/songs/anaMuslimun.mp3",
        duration: "3:58",
    },
    {
        id: 5,
        title: "Al-Nasr",
        artist: "khorynex",
        url: "/songs/anNasr.mp3",
        duration: "4:53",
    },
    {
        id: 6,
        title: "Al-Sarkh",
        artist: "khorynex",
        url: "/songs/assarkh.mp3",
        duration: "4:30",
    },
    {
        id: 7,
        title: "Darbuna",
        artist: "khorynex",
        url: "/songs/darbuna.mp3",
        duration: "3:02",
    },
    {
        id: 8,
        title: "Davlati Baqiya",
        artist: "khorynex",
        url: "/songs/davlati baqiya.mp3",
        duration: "2:46",
    },
    {
        id: 9,
        title: "Davlatil Baqiya",
        artist: "khorynex",
        url: "/songs/davlatilbaqiya.mp3",
        duration: "2:52",
    },
    {
        id: 10,
        title: "Fa Aynal Ubatu",
        artist: "khorynex",
        url: "/songs/faaynalUbatu.mp3",
        duration: "0:52",
    },
    {
        id: 11,
        title: "Hiya Bina",
        artist: "khorynex",
        url: "/songs/hiya bina.mp3",
        duration: "1:30",
    },
    {
        id: 12,
        title: "Jannah",
        artist: "khorynex",
        url: "/songs/jannah.mp3",
        duration: "1:15",
    },
    {
        id: 13,
        title: "Jannatun Fiyha Na`imun",
        artist: "khorynex",
        url: "/songs/jannatunFiyhaNaimun.mp3",
        duration: "1:51",
    },
    {
        id: 14,
        title: "Kullibagh",
        artist: "khorynex",
        url: "/songs/kulibagh.mp3",
        duration: "3:01",
    },
    {
        id: 15,
        title: "Kullu Man",
        artist: "khorynex",
        url: "/songs/kullu man.mp3",
        duration: "1:30",
    },
    {
        id: 16,
        title: "Lidiynil Huda",
        artist: "khorynex",
        url: "/songs/lidinilhuda.mp3",
        duration: "2:18",
    },
    {
        id: 17,
        title: "Mansaki",
        artist: "khorynex",
        url: "/songs/mansaki.mp3",
        duration: "2:51",
    },
    {
        id: 18,
        title: "Martyrs",
        artist: "khorynex",
        url: "/songs/martyrs.mp3",
        duration: "2:20",
    },
    {
        id: 19,
        title: "Mudajjajan",
        artist: "khorynex",
        url: "/songs/mudajjajan.mp3",
        duration: "2:22",
    },
    {
        id: 20,
        title: "Qattasava",
        artist: "khorynex",
        url: "/songs/qattasava.mp3",
        duration: "3:05",
    },
    {
        id: 21,
        title: "Salul",
        artist: "khorynex",
        url: "/songs/salul.mp3",
        duration: "1:06",
    },
    {
        id: 22,
        title: "Sara Bil Layli",
        artist: "khorynex",
        url: "/songs/sara bil layli.mp3",
        duration: "3:46",
    },
    {
        id: 23,
        title: "Shariha",
        artist: "khorynex",
        url: "/songs/shariha.mp3",
        duration: "4:15",
    },
    {
        id: 24,
        title: "Tabsirah",
        artist: "khorynex",
        url: "/songs/tabsirah.mp3",
        duration: "3:10",
    },
    {
        id: 25,
        title: "Tawratun",
        artist: "khorynex",
        url: "/songs/tawratun.mp3",
        duration: "2:37",
    },
    {
        id: 26,
        title: "Tura Buro",
        artist: "khorynex",
        url: "/songs/tura buro.mp3",
        duration: "3:04",
    },
    {
        id: 27,
        title: "Ya Rabbina",
        artist: "khorynex",
        url: "/songs/ya rabina.mp3",
        duration: "3:16",
    },
    {
        id: 28,
        title: "Ya Sahatal",
        artist: "khorynex",
        url: "/songs/ya sahatal.mp3",
        duration: "2:12",
    },
    {
        id: 29,
        title: "Ya Zakiran",
        artist: "khorynex",
        url: "/songs/ya zakiran.mp3",
        duration: "3:26",
    },
    {
        id: 30,
        title: "Ya Ramzal",
        artist: "khorynex",
        url: "/songs/yaRamzal.mp3",
        duration: "3:06",
    },
]

const MusicContext = createContext()

export const MusicProvider = ({children}) => {
    const [allSongs, setAllSongs] = useState( songs );
    const [currentTrack, setCurrentTrack] = useState( songs[0] );
    const [currentTrackIndex, setCurrentTrackIndex] = useState( 0 );
    const [currentTime, setCurrentTime] = useState( 0 );
    const [duration, setDuration] = useState( 0 );
    const [isPlaying, setIsPlaying] = useState( false );
    const [volume, setVolume] = useState( 0.5 );
    const [playlists, setPlaylists] = useState( [] );


    useEffect( () => {
        const savedPlaylists = JSON.parse(localStorage.getItem( "musicPlayerPlaylists" ));
        if( savedPlaylists )
            setPlaylists( savedPlaylists );
    }, []);

    useEffect( () => {
        if( playlists.length > 0 )
            localStorage.setItem( "musicPlayerPlaylists", JSON.stringify(playlists));
        else
            localStorage.removeItem( "musicPlayerPlaylists" );
    }, [playlists]);


    const handlePlaySong = ( song, index ) => {
        setCurrentTrack( song );
        setCurrentTrackIndex( index );
        setIsPlaying( false );
    };

    const nextTrack = () => {
        setCurrentTrackIndex( prev => {
            const nextIndex = ( prev + 1 ) % allSongs.length;
            setCurrentTrack( allSongs[(nextIndex)] );
            return nextIndex;
        });
        setIsPlaying( false );
    };

    const prevTrack = () => {
        setCurrentTrackIndex( prev => {
            const prevIndex = ( prev - 1 + allSongs.length ) % allSongs.length;
            setCurrentTrack( allSongs[(prevIndex)] );
            return prevIndex;
        });
        setIsPlaying( false );
    };

    const createPlaylist = ( name ) => {
        const newPlaylist = {
            id: Date.now(),
            name,
            songs: [],
        }
        setPlaylists( prev => [...prev, newPlaylist] );
    };

    const addSongToPlaylist = ( playlistId, song ) => {
        setPlaylists( prev => prev.map( playlist => {
            if( playlist.id === playlistId )
                return {...playlist, songs: [...playlist.songs, song]};
            else
                return playlist;
        }));
    };

    const deletePlaylist = ( id ) => {
        setPlaylists( prev => prev.filter( playlist => playlist.id !== id ));
    };

    const play = () => setIsPlaying( true );
    const pause = () => setIsPlaying( false );

    return <MusicContext.Provider value={{
        allSongs, 
        handlePlaySong, 
        currentTrack, 
        currentTrackIndex, 
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
        createPlaylist,
        playlists,
        addSongToPlaylist,
        setCurrentTrack,
        handlePlaySong,
        deletePlaylist,
    }}>{children}</MusicContext.Provider>
}

export const useMusic = () => {
    if( !useContext( MusicContext ) )
        throw new Error( "useMusic must be used inside of MusicProvirder" );
    return useContext( MusicContext );
}