var express = require('express');
var router = express.Router();
const dailyData=require('../dataWorker')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dailyData',(req,res)=>{
res.send(dailyData)
})

module.exports = router;
