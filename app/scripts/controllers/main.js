'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('quiz.service', []);
angular.module('quiz.directive', []);
angular.module('quiz.filter', []);
angular.module('testApp')
  .controller('MainCtrl', function ($scope, $window) {
    $scope.name = "Aashish";
    $scope.look = false;

    $scope.questions = [{
        "questionText": "When was the last time india won the cricket world cup?*",
        "answers": [{
            "answerText": "2011",
            "correct": true
          },
          {
            "answerText": "2007",
            "correct": false
          },
          {
            "answerText": "1983",
            "correct": false
          }
        ]
      },
      {
        "questionText": "What is the higest individual score by a batsman in Test Cricket?*",
        "answers": [{
            "answerText": "400",
            "correct": true
          },
          {
            "answerText": "380",
            "correct": false
          },
          {
            "answerText": "375",
            "correct": false
          }
        ]
      },
      {
        "questionText": "Who has won the most number of cricket World cup ?*",
        "answers": [{
            "answerText": "Australia",
            "correct": true
          },
          {
            "answerText": "India",
            "correct": false
          },
          {
            "answerText": "Pakistan",
            "correct": false
          }
        ]
      },
      {
        "questionText": "How many international centuries does sachin Tendulkar has under his name?*",
        "answers": [{
            "answerText": "100",
            "correct": true
          },
          {
            "answerText": "101",
            "correct": false
          },
          {
            "answerText": "99",
            "correct": false
          }
        ]
      }
    ];
    $scope.answers = {};
    $scope.correctCount = 0;
    $scope.InCorrect = 0;


    //Show result function
    $scope.showResult = function () {
      $scope.correctCount = 0;
      $scope.InCorrect = 0;

      var qLength = $scope.questions.length;

      for (var i = 0; i < qLength; i++) {
        var answers = $scope.questions[i].answers;

        $scope.questions[i].userAnswerCorrect = false;
        $scope.questions[i].userAnswer = $scope.answers[i];
        if ($scope.questions[i].userAnswer == undefined) {
          $scope.msg = 'Please Answer for all question';
          $scope.look = true;
          return;
        } else {
          $scope.success = 'Congrats Now You can see your results';
         $scope.look = true;

          for (var j = 0; j < answers.length; j++) {
            answers[j].selected = "donno";
            if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct === true) {
              $scope.questions[i].userAnswerCorrect = true;
              answers[j].selected = "true";
              $scope.correctCount++;

            } else if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct === false) {
              answers[j].selected = "false";
              $scope.InCorrect++;

            }

          }
        }
      }
      $scope.load();

    };


    //Reset Function
    $scope.reset = function () {
      $scope.correctCount = 0;
      $scope.InCorrect = 0;
      $window.location.reload();
      $scope.load();
    }


    //chart render function 
    $scope.load = function () {

      //  alert("page load chart render....");
      $scope.chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "dark1", // "light1", "light2", "dark1", "dark2"
        title: {
          text: ""
        },
        axisY: {
          title: "Number",

          includeZero: true
        },
        axisX: {
          title: "Result"
        },
        data: [{
          type: "column",
          yValueFormatString: "#,##0.0#\"%\"",
          dataPoints: [{
              label: "Correct",
              y: $scope.correctCount
            },
            {
              label: "InCorrect",
              y: $scope.InCorrect
            },

          ]
        }]
      });

      $scope.chart.render();

    };

    $scope.load();
  });
