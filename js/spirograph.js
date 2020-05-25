// demo is equal to -1 when demo is off
// otherwise value represents the index of preset
var demo = -1;
var demoTransition;
var circleColor = true;
var direction = 0
var timing = 0;
const directionArray = ["normal", "reverse", "alternate", "alternate-reverse"]
const timingArray = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];

function loadCircles(isPreset) {
    clearTimeout(demoTransition);
    if (!isPreset) {
        document.getElementById("presetDropdown").value = 'Custom';
        if (demo != -1) {
            toggleDemo();
        }
    }

    solarsystem = document.getElementById("solarsystem");
    while (solarsystem.firstChild) {
        solarsystem.removeChild(solarsystem.firstChild);
    }



    const numberOfCircles = document.getElementById(sliders[0].name + "ID").value;
    const circleSize = document.getElementById(sliders[1].name + "ID").value;
    const orbitTime = document.getElementById(sliders[2].name + "ID").value;
    const aMod = document.getElementById(sliders[3].name + "ID").value;
    const bMod = document.getElementById(sliders[4].name + "ID").value;
    const cMod = document.getElementById(sliders[5].name + "ID").value;
    const dMod = document.getElementById(sliders[6].name + "ID").value;
    const translateA = document.getElementById(sliders[7].name + "ID").value;
    const translateB = document.getElementById(sliders[8].name + "ID").value;

    var container = {};
    var canvasArray = [];
    var circleStyling = '';
    for (i = 0; i < numberOfCircles; i++) {
        canvasArray[i] = document.createElement('canvas');
        canvasArray[i].id = ('circle' + i);
        canvasArray[i].width = 200;
        canvasArray[i].height = 200;
        document.getElementById("solarsystem").appendChild(canvasArray[i]);
        circleStyling = circleStyling + `#${canvasArray[i].id} {
            opacity: 0;
            width: ${circleSize}px;
            height: ${circleSize}px;
            left: 50%;
            top: 50%;
            position: absolute;
            animation: rotate${i} ${orbitTime}s infinite ${directionArray[direction]} ${timingArray[timing]};
            }

            @keyframes rotate${i} {
            from {
                opacity: 1;
                transform: rotate(${180+360*(aMod+1)*i/numberOfCircles}deg) translate(${translateA}px) rotate(${-180-360*(bMod+1)*i/numberOfCircles}deg) translate(calc(-50% - ${0}px), calc(-50% - ${0}px));
            }

            to {
                opacity: 1;
                transform: rotate(${540+360*(cMod+1)*i/numberOfCircles}deg) translate(${translateB}px) rotate(${-540-360*(dMod+1)*i/numberOfCircles}deg) translate(calc(-50% - ${0}px), calc(-50% - ${0}px));
                }
            }`;
        container['circle' + i] = {
            'canvas': document.getElementById("circle" + i),
            'context': document.getElementById("circle" + i).getContext("2d")
        };

    }
    if (aMod != bMod || cMod != dMod) {
        var translate = `-${1*circleSize/2}px`;
    } else {
        var translate = `-${0*circleSize/2}px`;
    }
    document.getElementById("solarsystem").style.top = translate;
    document.getElementById("solarsystem").style.left = translate;


    //Circle Styling
    if (document.getElementById("circleStyle")) {
        document.body.removeChild(document.getElementById("circleStyle"));
    }
    var circleStyleNode = document.createElement('style');
    circleStyleNode.setAttribute('id', "circleStyle");
    circleStyleNode.innerHTML = circleStyling;
    document.body.appendChild(circleStyleNode);

    for (i = 0; i < numberOfCircles; i++) {
        container['circle' + i].context.arc(100, 100, 50, 0, 2 * Math.PI);
        container['circle' + i].context.stroke();
        if (circleColor) {
            rainbow(container['circle' + i].canvas, container['circle' + i].context);
        }
    }

    if (demo != -1) {
        demoTransition = setTimeout(function () {
            demo++;
            if (demo == presets.length) {
                demo = 0;
            }
            document.getElementById('presetDropdown').value = presets[demo].name;
            updateDemoText();
            presetSelect(true);

        }, orbitTime * 1000);
    }
}

function toggleDemo() {
    if (demo >= 0) {
        demo = -1
        clearTimeout(demoTransition);
    } else {
        demo = 0
        document.getElementById('presetDropdown').value = presets[demo].name;
        presetSelect(true);
    };
    updateButtons();
    updateDemoText();
}

function toggleColour() {
    circleColor = !circleColor;
    updateButtons();
    loadCircles(false);
}

function toggleCentre() {}

function changeDirection() {
    direction = (direction + 1) % directionArray.length;
    updateButtons();
    loadCircles(false);
}

function changeTiming() {
    timing = (timing + 1) % timingArray.length;
    updateButtons();
    loadCircles(false);
}

function updateButtons() {
    if (demo >= 0) {
        document.getElementById("demoToggle").innerHTML = "Demo: On";
    } else {
        document.getElementById("demoToggle").innerHTML = "Demo: Off";
    }
    if (circleColor) {
        document.getElementById("colorToggle").innerHTML = "Color: On";
    } else {
        document.getElementById("colorToggle").innerHTML = "Color: Off";
    }
    var currentDirection = directionArray[direction].charAt(0).toUpperCase() + directionArray[direction].substring(1);
    document.getElementById("directionButton").innerHTML = "Direction:<br>" + currentDirection;
    var currentTiming = timingArray[timing].charAt(0).toUpperCase() + timingArray[timing].substring(1);
    document.getElementById("timingButton").innerHTML = "Timing:<br>" + currentTiming;
}

let sliders = [{
        name: "circleNumberSlider",
        label: "# Of Circles: ",
        minValue: 1,
        maxValue: 200,
        defaultValue: 100,
        step: "1"
        },
    {
        name: "circleSizeSlider",
        label: "Size Of Circles: ",
        minValue: 1,
        maxValue: 400,
        defaultValue: 200,
        step: "10"
        },
    {
        name: "orbitTimeSlider",
        label: "Orbit Time: ",
        minValue: 1,
        maxValue: 100,
        defaultValue: 30,
        step: "1"
        },
    {
        name: "rotationModASlider",
        label: "Rotation Mod A: ",
        minValue: -5,
        maxValue: 5,
        defaultValue: 0,
        step: "0.1"
        },
    {
        name: "rotationModBSlider",
        label: "Rotation Mod B: ",
        minValue: -5,
        maxValue: 5,
        defaultValue: 0,
        step: "0.1"
        },
    {
        name: "rotationModCSlider",
        label: "Rotation Mod C: ",
        minValue: -5,
        maxValue: 5,
        defaultValue: 0,
        step: "0.1"
        },
    {
        name: "rotationModDSlider",
        label: "Rotation Mod D: ",
        minValue: -5,
        maxValue: 5,
        defaultValue: 0,
        step: "0.1"
        },
    {
        name: "translateASlider",
        label: "Start Radius: ",
        minValue: -500,
        maxValue: 500,
        defaultValue: 400,
        step: "50"
        },
    {
        name: "translateBSlider",
        label: "End Radius: ",
        minValue: -500,
        maxValue: 500,
        defaultValue: 400,
        step: "50"
        }
    ];

function resetValues(isDefault) {
    if (isDefault) {
        for (var i = 0; i < sliders.length; i++) {
            newValue = sliders[i].defaultValue;
            document.getElementById(sliders[i].name + "ID").value = newValue;
            document.getElementById(sliders[i].name + "ValueID").innerHTML = newValue;
        }
        circleColor = true;
        direction = 0
        timing = 0;
    } else {
        for (var i = 0; i < sliders.length; i++) {
            var newValue = sliders[i].minValue + Math.round(Math.random() * (sliders[i].maxValue - sliders[i].minValue));
            document.getElementById(sliders[i].name + "ID").value = newValue;
            document.getElementById(sliders[i].name + "ValueID").innerHTML = newValue;
        }
        direction = Math.round(Math.random() * directionArray.length);
        timing = Math.round(Math.random() * timingArray.length);
    }
    updateButtons();
    loadCircles(false);
}

//initialize sliders
for (var i = 0; i < sliders.length; i++) {
    createSliderHTML(sliders[i]);
    var Slider = document.getElementById(sliders[i].name + "ID");
    var SliderOutput = document.getElementById(sliders[i].name + "ValueID");
    sliderInit(Slider, SliderOutput);
}

function sliderInit(Slider, SliderOutput) {
    return Slider.oninput = function () {
        SliderOutput.innerHTML = Slider.value;
        loadCircles();
    }
}

function createSliderHTML(slider) {
    var labelNode = document.createElement("label");
    labelNode.setAttribute('for', slider.name + "ID");
    document.querySelector('.options').appendChild(labelNode);
    labelNode.innerHTML = slider.label + '<span id="' + slider.name + 'ValueID">' + slider.defaultValue + '</span>';
    var sliderNode = document.createElement("input");
    sliderNode.setAttribute('type', "range");
    sliderNode.setAttribute('min', slider.minValue);
    sliderNode.setAttribute('max', slider.maxValue);
    sliderNode.setAttribute('value', slider.defaultValue);
    sliderNode.setAttribute('step', slider.step);
    sliderNode.setAttribute('id', slider.name + "ID");
    document.querySelector('.options').appendChild(sliderNode);
}

////////////////////

var defaultPresets = [{
        name: "Whirlpool",
        color: true,
        direction: 3,
        timing: 4,
        values: [200, 80, 15, 2, 2, 1, 0.5, -200, 100]
        },
    {
        name: "Starfield",
        color: true,
        direction: 2,
        timing: 4,
        values: [150, 30, 30, 4, 5, 1, 1, -350, 350]
        },
    {
        name: "Warp Gate",
        color: false,
        direction: 0,
        timing: 4,
        values: [200, 150, 15, -2.9, 2, -2, -3.6, -100, -50]
        },
    {
        name: "Slinky",
        color: false,
        direction: 3,
        timing: 0,
        values: [200, 300, 8, -2.5, -0.5, 1.8, -0.5, -150, -100]
        },
    {
        name: "Beanstalk",
        color: true,
        direction: 3,
        timing: 0,
        values: [80, 200, 20, 0, 0, 2, 0, 50, 0]
        },
    {
        name: "Yarn",
        color: true,
        direction: 3,
        timing: 0,
        values: [200, 80, 20, 2, -1, 1.2, 0.5, 0, 100]
        }
    ];

var presets = defaultPresets;

function initPresetDropdown() {
    presetDropdown = document.getElementById("presetDropdown");
    while (presetDropdown.firstChild) {
        presetDropdown.removeChild(presetDropdown.firstChild);
    }
    var presetNode = document.createElement("option");
    presetNode.setAttribute('value', 'Custom');
    document.getElementById('presetDropdown').appendChild(presetNode);
    presetNode.innerHTML = 'Custom';
    for (var i = 0; i < presets.length; i++) {
        var presetNode = document.createElement("option");
        presetNode.setAttribute('value', presets[i].name);
        document.getElementById('presetDropdown').appendChild(presetNode);
        presetNode.innerHTML = presets[i].name;
    }
}


function presetSelect(isDemo) {
    if (!isDemo) {
        demo = -1;
    }
    const selectedPreset = document.getElementById("presetDropdown").value;
    if (selectedPreset != 'Custom') {
        var presetIndex = presets.findIndex(x => x.name === selectedPreset);
        circleColor = presets[presetIndex].color;
        direction = presets[presetIndex].direction;
        timing = presets[presetIndex].timing;
        updateButtons();
        for (var i = 0; i < presets[presetIndex].values.length; i++) {
            document.getElementById(sliders[i].name + "ID").value = presets[presetIndex].values[i];
            document.getElementById(sliders[i].name + "ValueID").innerHTML = presets[presetIndex].values[i];
        }
        loadCircles(true);
    }
}

function savePreset() {
    var saveName = prompt("Please enter a savename:");
    if (!(saveName == null || saveName == "")) {
        const values = [];
        for (var i = 0; i < sliders.length; i++) {
            values[i] = document.getElementById(sliders[i].name + "ID").value;
        }
        save = {
            name: saveName,
            color: circleColor,
            direction: direction,
            timing: timing,
            values: values
        }
        presets.push(save);
        window.localStorage.setItem('presetSaves', JSON.stringify(presets));
        initPresetDropdown();
    }
}

function deletePreset() {
    const selectedPreset = document.getElementById("presetDropdown").value;
    if (selectedPreset != 'Custom') {
        var presetIndex = presets.findIndex(x => x.name === selectedPreset);
        presets.splice(presetIndex, 1);
        window.localStorage.setItem('presetSaves', JSON.stringify(presets));
        initPresetDropdown();
    }
}

function deleteAllPresets() {
    if (window.confirm("Are you sure you want to delete all saved presets?")) {
        window.localStorage.clear();
        presets = defaultPresets;
        initPresetDropdown();
        location.reload();
    }
}


function init() {
    if (window.localStorage.getItem('presetSaves')) {
        presets = JSON.parse(window.localStorage.getItem('presetSaves'));
    };
    initPresetDropdown();
    if (demo >= 0) {
        document.getElementById('presetDropdown').value = presets[demo].name;
        setTimeout(function () {
            updateDemoText();
        }, 500);
    }
    updateButtons();
    demo == -1 ? presetSelect(false) : presetSelect(true);
}

function updateDemoText() {
    console.log("updated")
    if (demo >= 0) {
        document.getElementById("demotext").style.transition = 'opacity 1s ease-out';
        document.getElementById("demotext").style.opacity = 1;
        document.getElementById("demotext").innerHTML = '"' + presets[demo].name + '"';
        setTimeout(function () {
            document.getElementById("demotext").style.opacity = 0;
        }, 2000);
    } else {
        document.getElementById("demotext").style.transition = 'none';
        document.getElementById("demotext").style.opacity = 0;
    }
}

function demoStart(input) {
    if (input) {
        demo = 0;
        init();
    }
}

init();
