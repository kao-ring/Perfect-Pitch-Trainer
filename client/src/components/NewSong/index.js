import React from "react";
import API from "../../utils/API";
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

class NewSong extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: [],
      currentTime: 0,
      currentEvents: [],
    },
    title: "",
    songEvents: [],
    saveSwitch: true,
    _id: "",
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
          title: "",
          saveSwitch: true,
          songEvents: res.data,
          recording: { ...this.state.recording, events: [] },
        });
      })
      .catch((err) => console.log(err));
  }

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map((event) => event.time + event.duration)
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
      _.flatMap(this.state.recording.events, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );
    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter((event) => {
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

  handleInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      title: event.target.value,
    });
  };

  onClickSave = (event) => {
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.recording.events);

    if (
      this.state.saveSwitch &&
      this.state.title &&
      this.state.recording.events
    ) {
      API.saveSong({
        title: this.state.title,
        notes: this.state.recording.events,
      })
        .then((res) => {
          console.log(res);

          this.loadSongs();
        })
        .catch((err) => console.log(err));
    } else if (this.state.title && this.state.recording.events) {
      API.updateSong(this.state._id, {
        title: this.state.title,
        notes: this.state.recording.events,
      })
        .then((res) => {
          console.log(res);
          this.loadSongs();
        })
        .catch((err) => console.log(err));
    }
  };

  onClickEdit = (event) => {
    console.log("エディット");
    let selectedSong = this.state.songEvents[+event.target.id];
    this.setState({
      saveSwitch: false,
      title: selectedSong.title,
      _id: selectedSong._id,
      recording: { ...this.state.recording, events: selectedSong.notes },
    });
  };

  onClickDelete = (event) => {
    console.log(event.target.id);
    API.deleteSong(event.target.id)
      .then((res) => {
        console.log(res);
        this.loadSongs();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3 className="h3">Add songs</h3>
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

        <div>
          <strong>Saving Data</strong>
          <form>
            <input
              type="text"
              placeholder="song title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </form>

          <div>{JSON.stringify(this.state.recording.events)}</div>
          <button onClick={this.onClickClear}>Clear</button>
          <button onClick={this.onClickSave}>Save</button>
        </div>
        <hr />
        <div>
          <strong>Edit Songs</strong>
          <div className="editlist">
            <ul>
              {this.state.songEvents.map((song, i) => {
                return (
                  <li>
                    {song.title}
                    <i
                      className="far fa-trash-alt navBtn"
                      id={song._id}
                      key={song._id}
                      onClick={this.onClickDelete}
                    ></i>
                    <i
                      className="fas fa-edit navBtn"
                      id={i}
                      key={song.title}
                      onClick={this.onClickEdit}
                    ></i>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NewSong;
