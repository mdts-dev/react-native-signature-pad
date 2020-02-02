var content = (minWidth, penColor, backgroundColor, dataURL) => `
  var showSignaturePad = function (signaturePadCanvas, bodyWidth, bodyHeight) {
    /*We're rotating by 90% -> Flip X and Y*/
    /*var width = bodyHeight;
    var height = bodyWidth;*/

    var width = bodyWidth;
    var height = bodyHeight;

    var sizeSignaturePad = function () {
      var devicePixelRatio = 1; /*window.devicePixelRatio || 1;*/
      var canvasWidth = width * devicePixelRatio;
      var canvasHeight = height * devicePixelRatio;
      signaturePadCanvas.width = canvasWidth;
      signaturePadCanvas.height = canvasHeight;
      signaturePadCanvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
    };

    var finishedStroke = function(base64DataUrl) {
       executeNativeFunction('finishedStroke', {base64DataUrl: base64DataUrl});
    };

    var enableSignaturePadFunctionality = function () {
      var signaturePad = new SignaturePad(signaturePadCanvas, {
        minWidth: ${minWidth} || 4.5,
        penColor: '${penColor || 'black'}',
        backgroundColor: '${backgroundColor || 'white'}',
        onEnd: function() { finishedStroke(signaturePad.toDataURL()); }
      });
      /* signaturePad.translateMouseCoordinates = function (point) {
        var translatedY = point.x;
        var translatedX = width - point.y;
        point.x = translatedX;
        point.y = translatedY;
      }; */
      signaturePad.minWidth = ${minWidth} || 4.5;
      signaturePad.maxWidth = 15.5;
      if ('${dataURL}') {
        signaturePad.fromDataURL('${dataURL}');
      }
    };

    sizeSignaturePad();
    enableSignaturePadFunctionality();
  };


  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight;
  if(!bodyWidth) {
    bodyWidth = window.innerWidth;
  }
  if(!bodyHeight) {
    bodyHeight = window.innerHeight;
  }

  var canvasElement = document.querySelector('canvas');
  showSignaturePad(canvasElement, bodyWidth, bodyHeight);
`;

export default content;
