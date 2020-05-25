function rainbow(canvas, context) {
    var individualAnimation;
    var color = generateColor();
    fillShape(hexToDecArray(color));

    const intervalID = setInterval(() => {
        colorTransition()
    }, 1000)

    function colorTransition() {
        clearInterval(individualAnimation);

        var nextColor = generateColor();

        individualAnimation = setInterval(colorShiftStep.bind(null, hexToDecArray(color), hexToDecArray(nextColor)), 10);

        function colorShiftStep(colorArray, nextColorArray) {

            for (var i = 0; i < colorArray.length; i++) {
                if (colorArray[i] < nextColorArray[i]) {
                    ++colorArray[i];
                } else if (colorArray[i] > nextColorArray[i]) {
                    --colorArray[i];
                }
            }
            fillShape(colorArray);
            color = decArrayToHex(colorArray);

            if (colorArray.toString() === nextColorArray.toString()) {
                clearInterval(individualAnimation);
            }
        }
    }

    function generateColor() {
        return '#' + Math.random().toString(16).slice(2, 8);
    }

    function hexToDecArray(input) {
        input = input.replace('#', '');
        var array = input.match(/.{1,2}/g);
        for (var i = 0; i < array.length; i++) {
            array[i] = parseInt(array[i], 16);
        }
        return array;
    }

    function decArrayToHex(input) {
        var hexoutput = '';
        for (var i = 0; i < input.length; i++) {
            var stringInput = input[i].toString(16);
            if (stringInput.length == 1) {
                stringInput = '0' + stringInput;
            }
            hexoutput = hexoutput + stringInput;
        }
        return '#' + hexoutput;
    }

    function fillShape(colorDecArray) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = (decArrayToHex(colorDecArray));
        context.fill();
    }
}
