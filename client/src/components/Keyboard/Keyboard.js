import "./style.css";

function Keyboard() {
  return (
    <div className="wrapper">
      <div className="piano">
        <div id="piano1stOctave">
          <div className="black-keys">
            <div className="group-2">
              <div data-note="C#4" className="black-key"></div>
              <div data-note="D#4" className="black-key"></div>
            </div>
            <div className="group-3">
              <div data-note="F#4" className="black-key"></div>
              <div data-note="G#4" className="black-key"></div>
              <div data-note="A#4" className="black-key"></div>
            </div>
          </div>
          <div className="white-keys">
            <div data-note="C4" className="key"></div>
            <div data-note="D4" className="key"></div>
            <div data-note="E4" className="key"></div>
            <div data-note="F4" className="key"></div>
            <div data-note="G4" className="key"></div>
            <div data-note="A4" className="key"></div>
            <div data-note="B4" className="key"></div>
          </div>
        </div>
        <div id="piano2ndOctave">
          <div className="black-keys">
            <div className="group-2">
              <div data-note="C#5" className="black-key"></div>
              <div data-note="D#5" className="black-key"></div>
            </div>
            <div className="group-3">
              <div data-note="F#5" className="black-key"></div>
              <div data-note="G#5" className="black-key"></div>
              <div data-note="A#5" className="black-key"></div>
            </div>
          </div>
          <div className="white-keys">
            <div data-note="C5" className="key"></div>
            <div data-note="D5" className="key"></div>
            <div data-note="E5" className="key"></div>
            <div data-note="F5" className="key"></div>
            <div data-note="G5" className="key"></div>
            <div data-note="A5" className="key"></div>
            <div data-note="B5" className="key"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
