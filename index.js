function calculate() {
    clearResult();

    var inputs = {
        sideA: parseFloat(document.getElementById('sideA').value),
        sideB: parseFloat(document.getElementById('sideB').value),
        sideC: parseFloat(document.getElementById('sideC').value),
        angleA: parseFloat(document.getElementById('angleA').value),
        angleB: parseFloat(document.getElementById('angleB').value),
        angleC: parseFloat(document.getElementById('angleC').value)
    };

    if (validateInput(inputs)) {
        var perimeter = inputs.sideA + inputs.sideB + inputs.sideC;
        var s = perimeter / 2;
        var area = Math.sqrt(s * (s - inputs.sideA) * (s - inputs.sideB) * (s - inputs.sideC));
        var angleAFromCosine = calculateAngleFromCosine(inputs.sideB, inputs.sideC, inputs.sideA);
        var angleBFromCosine = calculateAngleFromCosine(inputs.sideA, inputs.sideC, inputs.sideB);
        
        var angleC = 180 - angleAFromCosine - angleBFromCosine;

        displayResult(area, perimeter, angleAFromCosine, angleBFromCosine, angleC);
    } else {
        displayError(getErrorMessage(inputs));
    }
}

function calculateAngleFromCosine(side1, side2, oppositeSide) {
    return Math.acos((side1 ** 2 + side2 ** 2 - oppositeSide ** 2) / (2 * side1 * side2)) * (180 / Math.PI);
}

function displayResult(area, perimeter, angleA, angleB, angleC) {
    var resultBox = document.getElementById('resultBox');
    resultBox.innerHTML = `
        <h2>Hasil Perhitungan:</h2>
        <p>Luas Segitiga: ${area.toFixed(2)} cm²</p>
        <p>Keliling Segitiga: ${perimeter.toFixed(2)} cm</p>
        <p>Sudut A: ${angleA.toFixed(2)}°</p>
        <p>Sudut B: ${angleB.toFixed(2)}°</p>
        <p>Sudut C: ${angleC.toFixed(2)}°</p>
    `;
}

function validateInput(inputs) {
    return (
        inputs.sideA > 0 &&
        inputs.sideB > 0 &&
        inputs.sideC > 0 &&
        (inputs.sideA + inputs.sideB > inputs.sideC) &&
        (inputs.sideA + inputs.sideC > inputs.sideB) &&
        (inputs.sideB + inputs.sideC > inputs.sideA) &&
        (inputs.angleA >= 0 && inputs.angleA < 180) &&
        (inputs.angleB >= 0 && inputs.angleB < 180) &&
        (inputs.angleC >= 0 && inputs.angleC < 180)
    );
}

function updateInputs() {
    var triangleType = document.getElementById('triangleType').value;
    var angleALabel = document.querySelector('label[for="angleA"]');
    var angleBLabel = document.querySelector('label[for="angleB"]');
    var angleCLabel = document.querySelector('label[for="angleC"]');

    angleALabel.textContent = 'Sudut A (opsional):';
    angleBLabel.textContent = 'Sudut B (opsional):';
    angleCLabel.textContent = 'Sudut C (opsional):';

   
    switch (triangleType) {
        case 'equilateral':
            angleBLabel.textContent = '';
            angleCLabel.textContent = '';
            break;
        case 'isosceles':
            angleCLabel.textContent = '';
            break;
        case 'right-angled':
            angleBLabel.textContent = '';
            angleCLabel.textContent = '';
            break;
        case 'scalene':
            break;
        default:
            break;
    }
}

function getErrorMessage(inputs) {
    if (inputs.sideA <= 0 || inputs.sideB <= 0 || inputs.sideC <= 0) {
        return "Panjang sisi harus lebih dari 0.";
    } else if (inputs.angleA !== undefined && (inputs.angleA < 0 || inputs.angleA >= 180)) {
        return "Sudut A harus antara 0 dan 180 derajat.";
    } else if (inputs.angleB !== undefined && (inputs.angleB < 0 || inputs.angleB >= 180)) {
        return "Sudut B harus antara 0 dan 180 derajat.";
    } else if (inputs.angleC !== undefined && (inputs.angleC < 0 || inputs.angleC >= 180)) {
        return "Sudut C harus antara 0 dan 180 derajat.";
    } else if (inputs.sideA + inputs.sideB <= inputs.sideC || inputs.sideA + inputs.sideC <= inputs.sideB || inputs.sideB + inputs.sideC <= inputs.sideA) {
        return "Panjang sisi tidak memenuhi syarat membentuk segitiga.";
    } else {
        return "Terjadi kesalahan. Pastikan input valid.";
    }
}

function clearResult() {
    var resultBox = document.getElementById('resultBox');
    resultBox.innerHTML = "";
}
