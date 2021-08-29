import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { readFileSync, writeFile as _writeFile } from "fs";
import { promisify } from "util";
// var player = require('play-sound')(opts = {});

var playInRealTime = true;
function App() {
  // Creates a client
  const client = new TextToSpeechClient();

  async function quickstart() {
    // The text to synthesize
    var text = "Hi this is rachit gupta";

    // Construct the request
    const request = {
      input: {
        text: text
      },
      // Select the language and SSML voice gender (optional)
      voice: {
        languageCode: "en-US",
        ssmlGender: "FEMALE",
        name: "en-US-Wavenet-B"
      },
      // select the type of audio encoding
      audioConfig: {
        effectsProfileId: ["headphone-class-device"],
        pitch: -2,
        speakingRate: 1.1,
        audioEncoding: "MP3"
      },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    console.log(response);

    // Write the binary audio content to a local file
    const writeFile = promisify(_writeFile);
    await writeFile("output.mp3", response.audioContent, "binary");
    console.log("Audio content written to file: output.mp3");
    
  }
  quickstart();
  return <div>HI</div>;
}

export default App;

