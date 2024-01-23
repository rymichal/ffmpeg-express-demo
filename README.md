SETUP

Install ffmpeg to your local device.

  brew update
  brew upgrade
  brew install ffmpeg

Verify installation, run in command line
  ffmpeg

RUN
  npm install

START THE PROJECT WITH
  ./startup


CREATE NEW VIDEO WITH
  POST localhost:3000/process-video

  with Json body
  ex:

  {
    "text": "More Money Back\n Than Other Leading Cards",
    "startTime": 0,
    "endTime": 10,
    "x": 50,
    "y": 200
  }

