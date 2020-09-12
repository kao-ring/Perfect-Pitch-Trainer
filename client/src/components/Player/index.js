import React from "react";
import API from "../../utils/API";

import "./style.css";

import _ from "lodash";
import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";

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
    correctAnswer: [],
    inputAnswer: [],
  };

  constructor(props) {
    super(props);
    this.scheduledEvents = [];
  }

  componentDidMount() {
    this.loadSongs();
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
      correctAnswer: [],
      inputAnswer: [],
    });

    this.state.currentSong.map((note) => {
      this.state.correctAnswer.push(note.midiNumber);
    });

    this.state.recording.events.map((note) => {
      this.state.inputAnswer.push(note.midiNumber);
    });
    let count = 0;
    for (let i = 0; i < this.state.correctAnswer.length; i++) {
      if (this.state.correctAnswer[i] === this.state.inputAnswer[i]) {
        count++;
      }
    }
    console.log("⭕️" + this.state.correctAnswer);
    console.log("❌" + this.state.inputAnswer);
    console.log(
      Math.floor((count / this.state.correctAnswer.length) * 100) + "% Correct"
    );
    let score =
      Math.floor((count / this.state.correctAnswer.length) * 100) + "% Correct";

    API.addScore({ title: this.state.currentSong.title, score: score });
  };

  render() {
    return (
      <div className="container">
        <div>
          <select
            onChange={(event) => {
              this.setState({
                currentSong: this.state.songEvents[event.target.value].notes,
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
          <button onClick={this.onClickPlay}>Play</button>
        </div>

        <br />
        <div className="piano">
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
          <button onClick={this.checkAnswer}>Check your answer</button>{" "}
        </div>
      </div>
    );
  }
}

export default Player;
