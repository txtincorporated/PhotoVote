//IMG ASSETS
var divImgs = ['8.560.jpg',
'8xyK_lCSWpE.jpg',
'17s4k1mttx0yvjpg.jpg',
'45.jpg',
'159sdsd579732.jpg',
'29713ABD00000578-0-image-a-35_1433784542952.jpg',
'256301bbc32e36e302204d159610a9f5.jpg',
'1482942_pic_970x641.jpg',
'beard.-reason-razor-sales-are-down-449x600.jpg',
'beardyguy1.jpeg',
'crayon-hipster.jpeg',
'flower-beards-trend-18.jpg',
'free-your-skin-schick-09.jpg',
'Fudgy-the-BeardMan.jpg',
'hipster-beards.jpg',
'lbq_CLM201512200003_05_l.jpg',
'men-looks-beards-flannels-lumbersexuals.jpg',
'merman-trend-colored-hair-beards-0.jpg',
'merman-trend-colored-hair-beards-18.jpg',
'tumblr_nl2xsiq9AI1upbk6jo1_500.jpg',
'world-beard-moustache-championship-photography-austria-fb1.jpg',
'knit-beard-hat2-e1344992057708.jpg'];//images to populate imgDivs

//SESSION TESTER
var firstRun = true;

//IMG DEFAULTS
var thisDiv = document.getElementsByClassName('imgDiv');
var picDivIds = ['pc1', 'pc2', 'pc3'];
var imgCaptIds = ['cpn1','cpn2','cpn3'];
var picDivs = [];
var captDivs = [];
var thisImg;
var idx;

var picDivver = function () {
  for (var i = 0; i < picDivIds.length; i++) {
    var divObj = document.getElementById(picDivIds[i]);
    picDivs.push(divObj);
  }
};
picDivver();

var captDivver = function () {
  for (var i = 0; i < imgCaptIds.length; i++) {
    var captObj = document.getElementById(imgCaptIds[i]);
    captDivs.push(captObj);
  }
};
captDivver();

var imageObjs = [];

var userClicks = 0;
var restoreState = function () {
  if (localStorage.userClicks) {
    var prevClicks = JSON.parse(localStorage.userClicks);
    if (prevClicks > 0) {
      userClicks = prevClicks;
    }
  }
};
restoreState();

console.log('userClicks = ' + userClicks);

var imgScores = [];
var setupScores = function () {
  if (localStorage.imgScores) {
    var prevScores = localStorage.imgScores;
    for (var iii = 0; iii < prevScores.length; iii++) {
      push.imgScores(prevScores[iii]);
    }
  }
};


//IMG OBJ CONSTRUCTOR
var Image = function (name) {
  this.name = name;
  this.src = 'assets/' + name;
  this.votes = 0;
  this.views = 0;
  this.score = 0;

  //set this.votes
  this.tallyvote = function () {
    this.votes++;
  };

  //set this.views
  this.tallyview = function () {
    this.views++;
  };

  //set this.score
  this.scoring = function () {
    var pctVotes = ((this.votes/this.views) * 100);
    if (pctVotes) {
      this.score = pctVotes;
    }
  };
};

//GENERATE IMG OBJS.
function makeImgs () {
  if (! localStorage.imageObjs) {
    var imagator = function () {
      for (var i = 0; i<divImgs.length; i++) {
        imgObj = new Image (divImgs[i]);
        imageObjs.push(imgObj);
      };
    };
    imagator ();} else {

    var reImage = JSON.parse(localStorage.imageObjs);
    for (var ii = 0; ii < divImgs.length; ii++) {
      imgObj = new Image (divImgs[ii]);
      imgObj.votes = reImage[ii].votes;
      imgObj.views = reImage[ii].views;
      imageObjs.push(imgObj);
    }
  }
};
makeImgs();

var imgCaptions = [];

var captionator = function () {
  for (var i = 0; i < divImgs.length; i++) {
    var caption = 'Picture ' + [i+1];
    imgCaptions.push(caption);
  }
};
captionator ();

// var cptnThumbs = [];
//
// var thumbalizer = function () {
//   for (var i = 0; i < divImgs.length; i++) {
//     var thumbDiv = document.createElement('div');
//     thumbDiv.style.height = '20px';
//     thumbDiv.style.width = '20px';
//     thumDiv.style['background-size'] = 'cover';
//     var thumbnail = imageObjs[i].src;
//     thumbDiv.style['background-image'] = thumbnail;
//     cptnThumbs.push(thumbDiv);
//   }
// };
// thumbalizer ();

// for (var i = 0; i < imageObjs.length; i++) {
//   imageObjs[i].scoring();
//   imgScores.push(Math.round(imageObjs[i].score));
// };

for (var i = 0; i < thisDiv.length; i++) {
  picDivs[i].addEventListener('click',function (e) {
    scoreKeeper(e);
  }, false);
};

//initialize page content, then on call, for each picDiv in the array, reset to next pic
function goPics () {
  countClicks();
  var next;
  for (var i = 0; i < picDivs.length; i++){
    if (firstRun = true && userClicks > 0) {
    //restore previous imgs to picDivs and increment views
      var result = JSON.parse(localStorage.picDivs);
      next = result[i].idx;
    } else {
      //run default code block below
      next = Math.floor(divImgs.length * Math.random());//generate random
    }
    thisImg = imageObjs[next].src;//set image; if restoring, thisImg = localStorage.picDivs[i].idx
    picDivs[i].style['background-image'] = 'url' + '("' + thisImg + '")';
    picDivs[i].idx = next;

    localStorage.inProg = true;
    console.log('inProg = ' + localStorage.inProg);
    localStorage.picDivs = JSON.stringify(picDivs);

    thisCapt = imgCaptions[next];//set caption
    captDivs[i].textContent = thisCapt;
    captDivs[i].idx = next;

    thisImg = imageObjs[next];
    thisImg.tallyview();
  }
  firstRun = false;
  console.log('firstRun: ' + firstRun);
};
goPics();

//log image ids in pc1-pc3
function scoreKeeper(e) {
  targetDiv = e.target;
  imageObjs[targetDiv.idx].tallyvote();
  imageObjs[targetDiv.idx].scoring();
  imgScores[targetDiv.idx]=Math.round(imageObjs[targetDiv.idx].score);
  userClicks += 1;
  console.log(imgScores);
  console.log('userClicks = ' + userClicks);
  countClicks();
  localStorage.imageObjs = JSON.stringify(imageObjs);
  localStorage.userClicks = userClicks;
  localStorage.imgScores = JSON.stringify(imgScores);

  function checkButtons () {
    if (buttons.style.display = 'block') {
      return;
    }
  }
  goPics();
};

function countClicks () {
  var resultsBttn = document.getElementById('littleMask');
  var showResults = document.getElementById('button1');
  // var eightsEnuff = document.getElementById('button2');
  if (userClicks == 16 || userClicks == 24) {
    resultsBttn.style.display = 'block';
    showResults.style.display = 'block';
    showResults.addEventListener('click', showChart);
  }
};

function keepGoing () {
  var noButton1 = document.getElementById('button1');
  var noButton2 = document.getElementById('button2');
  var noLittleMask = document.getElementById('littleMask');
  var noBigMask = document.getElementById('chartDiv');
  noButton1.style.display = 'none';
  noButton2.style.display = 'none';
  noLittleMask.style.display = 'none';
  noBigMask.style.display = 'none';
};

function reLoad () {
  localStorage.clear();
  var newGrowth = document.location.reload(true); //on click event to #button3
}

function showChart () {
  var chartView = document.getElementById('chartDiv');
  chartView.style.display = 'block';
  if (userClicks == 16) {
    var noButton1 = document.getElementById('button1');
    var noLittleMask = document.getElementById('littleMask');
    noButton1.style.display = 'none';
    noLittleMask.style.display = 'none';

    var eightMore = document.getElementById('button2');
    eightMore.style.display = 'block';
    eightMore.addEventListener('click', keepGoing);

  } else if (userClicks == 24) {
    var noButton1 = document.getElementById('button1');
    var noLittleMask = document.getElementById('littleMask');
    noButton1.style.display = 'none';
    noLittleMask.style.display = 'none';

    var unShave = document.getElementById('button3');
    unShave.style.display = 'block';
    unShave.addEventListener('click', reLoad);
  }
};

//Add animation

addEventListener('load', drawRandomData);

function draw(numArray, pcntArray, labelArray) {
  var canvas = document.getElementsByTagName('canvas');

// thanks to Chart.js
  var statsView = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [{
        label: 'Score',
        data: pcntArray
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: { beginAtZero:true }
        }]
      }
    }
  });
}

//draw(getRandomData());
function drawRandomData() {
  var data = [];
  var percents = imgScores;
  var labels = imgCaptions;

  draw(data, percents, labels);
}

//GENERATE TABLE FOR THUMBS AND RESULTS
// function tableMaker () {
//   var statsTable = document.getElementById('tbl');
//   var newTable = document.createElement('table');
//   var newTr = document.createElement('tr');
//   var newTd1 = document.createElement('td');
//   var newTd2 = document.createElement('td');
//   newTr.appendChild(newTd1);
//   newTr.appendChild(newTd2);
//   newTable.appendChild(newTr);
//   statsTable.appendChild(newTable);
// };
// tableMaker();
