import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        this.setState({
          lyrics: res.data.message.body.lyrics
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({
          track: res.data.message.body.track
        });
      })
      .catch(err => console.log(err));
  }

  renderGender = track => {
    if (track.primary_genres.music_genre_list[0] === undefined) {
      return <div>Genre not found</div>;
    } else {
      return track.primary_genres.music_genre_list[0].music_genre
        .music_genre_name;
    }
  };

  render() {
    const { track, lyrics } = this.state;
    console.log(track, lyrics);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="my-btn-lyrics btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="my-lyrics-card card">
            <h5 className="card-header">
              {track.track_name} by{' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="my-group list-group mt-3">
            <li className="my-list list-group-item">
              <strong className="my-sub-title">Song Genre: </strong>
              {this.renderGender(track)}
            </li>
            <li className="my-list list-group-item">
              <strong className="my-sub-title">Explicit Words: </strong>
              {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className="my-list list-group-item">
              <strong className="my-sub-title">Release Date: </strong>
              <Moment format="MMM DD YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
