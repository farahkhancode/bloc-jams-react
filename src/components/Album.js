import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';



class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
  return album.slug === this.props.match.params.slug
});


this.state = {
  album: album,
  currentSong: album.songs[0],
  currentTime: 0,
  duration: album.songs[0].duration,
  currentVolume: 0.5,
  isPlaying: false,
  isHovered:false
};

this.audioElement = document.createElement('audio');
this.audioElement.src = album.songs[0].audioSrc;
this.audioElement.volume = 0.5;
  }

componentDidMount() {
    this.eventListeners =
    {timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
    durationchange: e => {this.setState({ duration: this.audioElement.duration });
      },
    volumechange: e => {
                  this.setState({ volume: this.audioElement.volume });
              }

  };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
     }

componentWillUnmount() {
       this.audioElement.src = null;
       this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
       this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
       this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
     }

setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
         }

play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

pause() {
       this.audioElement.pause();
       this.setState({ isPlaying: false });
     }


handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
         if (!isSameSong) { this.setSong(song); }
        this.play();
         }
          }

handlePrevClick(){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play(newSong);
}

handleNextClick(){
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play(newSong);
}

handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

handleVolumeChange(e) {
      const newVolume =  e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume });
    }


formatTime(t){
       const minutes = Math.floor(t / 60);
       const seconds = Math.floor(t % 60);
       const time = (minutes + ":" + (seconds>=10 ? seconds : "0" + seconds));
       if (typeof t === "number" && t >=0){
         return time
       }
       else {
         return "-:--"
       }
   }



  render() {

    return (

      <section className="album">
      <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="coverimage" />
         <div className="album-details">
         <h1 id="album-title">{this.state.album.title}</h1>
         <h2 className="artist">{this.state.album.artist}</h2>
         <div id="release-info" >{this.state.album.releaseInfo}</div>
         </div>
       </section>

       <PlayerBar id="player-bar"
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.audioElement.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(t) => this.formatTime(t)}
        />
       <table id="song-list" align="center" className="table">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody className ="list-group">
          { this.state.album.songs.map(( song, index ) =>
          <tr className="song"  key={index}
          onClick={() => this.handleSongClick(song)}
          onMouseEnter={() => this.setState({isHovered: index+1})}
          onMouseLeave={() => this.setState({isHovered: false})}>
          <td className="song-actions" scope="row">
          <button id="song-action-buttons" className="btn btn-light">
          {(this.state.currentSong.title === song.title) ?
             <span className={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
          :  (this.state.isHovered === index+1) ?    <span className="ion-play"></span>  :  <span className="song-number">{index + 1}</span>  }
          </button>
          </td>
          <td className="song-title">{song.title}</td>
          <td className="song-duration">{this.formatTime(song.duration)}</td>
          </tr>
        )
       }
        </tbody>
        </table>

        <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           currentVolume={this.audioElement.currentVolume}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(t) => this.formatTime(t)}
         />

      </section>
    );
  }
}

export default Album;
