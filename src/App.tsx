import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

const App: React.FC = () => {

  const [songName, setSongName] = useState<string>('');
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string>('');

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
        const response = await axios.get('http://localhost:8080/current-song', {
            params: { access_token: accessToken },
          });
        const { currentSong, albumCoverUrl } = response.data;
        
        setSongName(currentSong);
        setAlbumCoverUrl(albumCoverUrl);
      } catch (error) {
        console.error(error)
      }
    };

    fetchCurrentSong();
  }, [])

  return(
    <div>
      <h1>Spotify App</h1>
      <div>
        <button onClick={handleLogin}>Login with Spotify</button>
      </div>
      <div>
        <h2>Currently Playing:</h2>
        <p>Song: {songName}</p>
        <img src={albumCoverUrl} alt="Album Cover" style={{ width: '200px', height: '200px' }} />
      </div>
    </div>
  )

}

export default App;
