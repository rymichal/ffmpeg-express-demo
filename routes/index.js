var express = require('express');
const ffmpeg = require('fluent-ffmpeg');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/process-video', (req, res) => {
  const { text, startTime, end, x, y } = req.body;

  const currentDate = new Date();

  const videoTitle = `output_${currentDate.getTime()}.mp4`

  const drawtextFilter = `
    drawtext=text='${text}':
    fontsize=124:
    fontcolor=black:
    x=${x}:
    y=(h-text_h-${y}):
    enable='between(t, ${startTime}, ${end})'
  `;

  ffmpeg('./templates/bank.mp4')
    .videoFilter(drawtextFilter)
    .on('end', () => {
      console.log('Processing finished');
      res.json({ success: true, message: `Video processed successfully: ${videoTitle}`});
    })
    .on('error', (err) => {
      console.error('Error:', err);
      res.status(500).json({ success: false, message: 'Error processing video' });
    })
    .save(`./video/${videoTitle}`);
});

module.exports = router;
