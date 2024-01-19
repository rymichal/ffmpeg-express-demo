var express = require('express');
const ffmpeg = require('fluent-ffmpeg');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/process-video', (req, res) => {
  const { text } = req.body;

  const currentDate = new Date();

  const videoTitle = `output_${currentDate.getTime()}.mp4`

  const drawtextFilter = `
    drawtext=text='${text}':
    fontsize=124:
    fontcolor=black:
    x=50:
    y=(h-text_h-200):
    enable='between(t, 2, 6)'
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