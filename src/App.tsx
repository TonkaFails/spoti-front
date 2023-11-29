import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App: React.FC = () => {

  const [songName, setSongName] = useState<string>('');
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string>('');
  const [albumName, setAlbumName] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      window.location.href = 'http://localhost:8080/login';
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {

    const fetchCurrentSong = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
          const response = await axios.get('http://localhost:8080/current-song', {
            params: { access_token: accessToken },
          });
          const { currentSong, albumCoverUrl, albumName } = response.data
          setSongName(currentSong)
          setAlbumCoverUrl(albumCoverUrl)
          setAlbumName(albumName)
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      } catch (error) {
        console.error(error)
      }
    };

    fetchCurrentSong();
  }, [])

  return (
    <div>
      <div>
        { !loggedIn ?
        <button onClick={handleLogin}>Login with Spotify</button>
        :
        <></>
        }
      </div>
      <div>
        <h1>{songName}</h1>
        <h2>{albumName}</h2>
        <img src={albumCoverUrl} alt="Album Cover" style={{ width: '800px', height: '800px' }} />
      </div>
    </div>
  )

}

export default App;
