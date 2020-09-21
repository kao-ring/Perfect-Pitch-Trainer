import React from "react";
import API from "../../utils/API";

import _ from "lodash";
import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";

import Results from "../../components/Results";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c4"),
  last: MidiNumbers.fromNote("f5"),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

class Player extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: [],
      currentTime: 0,
      currentEvents: [],
    },
    songEvents: [],
    currentSong: [],
    currentSongTitle: "",
    correctAnswer: [],
    inputAnswer: [],
    score: "",
    user: {},
  };

  constructor(props) {
    super(props);
    this.scheduledEvents = [];
  }

  componentDidMount() {
    this.loadSongs();
    this.userInfo();
  }

  loadSongs() {
    API.getSongs()
      .then((res) => {
        this.setState({
          songEvents: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  userInfo() {
    let user = JSON.parse(localStorage.getItem("authUser")).user_name;
    API.getUserInfo(user)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          user: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  getLastScore(title) {
    let currentTest = this.state.user.tests
      .reverse()
      .find((test) => test.title === title);
    return currentTest?.score;
  }

  getRecordingEndTime = () => {
    if (this.state.currentSong.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.currentSong.map((event) => event.time + event.duration)
    );
  };

  setRecording = (value) => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value),
    });
  };

  onClickPlay = () => {
    this.setRecording({
      mode: "PLAYING",
    });
    console.log(this.state.currentSong);
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.currentSong, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );

    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.currentSong.filter((event) => {
            return event.time <= time && event.time + event.duration > time;
          });

          this.setRecording({
            currentEvents,
          });
        }, time * 1000)
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: [],
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0,
    });
  };

  onClickOk = () => {
    this.onClickClear();
    this.setState({
      score: "",
    });
  };

  midiToNote = (num) => {
    switch (num) {
      case 60:
        return "C";
      case 61:
        return "C#/Db";
      case 62:
        return "D";
      case 63:
        return "D#/Eb";
      case 64:
        return "E";
      case 65:
        return "F";
      case 66:
        return "F#/Gb";
      case 67:
        return "G";
      case 68:
        return "G#/Ab";
      case 69:
        return "A";
      case 70:
        return "A#/Bb";
      case 71:
        return "B";
      case 72:
        return "C";
      case 73:
        return "C#/Db";
      case 74:
        return "D";
      case 75:
        return "D#/Eb";
      case 76:
        return "E";
      case 77:
        return "F";

      default:
        return "-";
    }
  };

  checkAnswer = async () => {
    this.setState({
      recording: { events: [] },
      correctAnswer: [],
      inputAnswer: [],
    });

    this.state.currentSong.map((note) => {
      return this.state.correctAnswer.push(note.midiNumber);
    });

    this.state.recording.events.map((note) => {
      return this.state.inputAnswer.push(note.midiNumber);
    });
    let count = 0;
    for (let i = 0; i < this.state.correctAnswer.length; i++) {
      if (this.state.correctAnswer[i] === this.state.inputAnswer[i]) {
        count++;
      }
    }

    let score = Math.floor((count / this.state.correctAnswer.length) * 100);
    this.setState({ score: score });

    API.addScore({
      _id: this.state.user._id,
      title: this.state.currentSongTitle,
      score: score,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h3>Listen to a song and play on piano what you hear.</h3>
        <div>
          <select
            onChange={(event) => {
              this.setState({
                currentSong: this.state.songEvents[event.target.value]?.notes,
                currentSongTitle: this.state.songEvents[event.target.value]
                  ?.title,
              });
            }}
          >
            <option>Choose a song</option>
            {this.state.songEvents.map((song, i) => {
              return (
                <option value={i} key={song.title}>
                  {song.title}
                </option>
              );
            })}
          </select>
          <button disabled={!this.state.currentSong} onClick={this.onClickPlay}>
            Play
          </button>
        </div>
        {this.state.currentSongTitle && (
          <strong>
            Your last score was:{" "}
            {this.getLastScore(this.state.currentSongTitle)}
          </strong>
        )}
        <br />
        <div className="piano">
          <button className="pianoBtn">
            <div>
              <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                  <PianoWithRecording
                    recording={this.state.recording}
                    setRecording={this.setRecording}
                    noteRange={noteRange}
                    width={300}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading}
                    keyboardShortcuts={keyboardShortcuts}
                  />
                )}
              />
            </div>
          </button>
        </div>
        <br />
        <div>
          <strong>Your answer is...</strong>
          <div>
            {" "}
            {this.state.recording.events.map((event) => {
              return this.midiToNote(event.midiNumber) + ", ";
            })}
          </div>
          <button onClick={this.onClickClear}>Clear</button>
          <button disabled={!this.state.inputAnswer} onClick={this.checkAnswer}>
            Check your answer
          </button>
        </div>
        {this.state.score ? (
          <Results score={this.state.score} onClickOk={this.onClickOk} />
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default Player;
