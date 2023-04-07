const inputValue = document.getElementById("inputValue");
const unitType = document.getElementById("unitType");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const unitConversionData = {
    length: {
        /*m: 1,
        km: 1000,
        ft: .30479999 */
		m: 1,
        cm: 100,
        mm: 1000,
        km: 0.001,
        ft: 1/ 3.28084,
        in: 1/ 39.3701,
        yd: 1/ 1.09361,
        mi: 1/ 0.000621371,
        nmi: 1/ 0.000539957,
    },
    temperature: {
        C: {
            F: (temp_value) => (temp_value * 9) / 5 + 32,
            K: (temp_value) => temp_value + 273.15,
        },
        F: {
            C: (temp_value) => ((temp_value - 32) * 5) / 9,
            K: (temp_value) => ((temp_value - 32) * 5) / 9 + 273.15,
        },
        K: {
            C: (temp_value) => temp_value - 273.15,
            F: (temp_value) => (temp_value - 273.15) * 9 / 5 + 32,
        },
    },
    weight: {
        kg: 1,
        g: 1000,
        mg: 1000000,
        lb: 0.453592,
        oz: 0.0283495,
        st: 0.157473,
        us_tn: 0.000907185,
        uk_tn: 0.000984207,
    }
};

const unitLabels = {
    length: {
        m: "Meters",
        cm: "Centimeters",
        mm: "Millimeters",
        km: "Kilometers",
        ft: "Feet",
        in: "Inches",
        yd: "Yards",
        mi: "Miles",
        nmi: "Nautical Miles",
    },
    weight: {
        kg: "Kilograms",
        g: "Grams",
        mg: "Milligrams",
        lb: "Pounds",
        oz: "Ounces",
        st: "Stones",
        us_tn: "Tons (U.S.)",
        uk_tn: "Tonnes (U.K.)",
    },
    temperature: {
        C: "Celsius",
        F: "Fahrenheit",
        K: "Kelvin",
    },
};

function updateUnitSelections() {
    const selectedUnitType = unitConversionData[unitType.value];
    const selectedUnitLabels = unitLabels[unitType.value];
    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";
	let index = 0;

    for (const unit in selectedUnitType) {
        const fromOption = document.createElement("option");
        fromOption.value = unit;
        fromOption.text = selectedUnitLabels[unit];
        fromUnit.add(fromOption);

        const toOption = document.createElement("option");
        toOption.value = unit;
        toOption.text = selectedUnitLabels[unit];
        toUnit.add(toOption);
		
		if (index === 1) {
            toUnit.selectedIndex = index;
        }
		
		index++
    }
}

/*
function convert() {
    const value = parseFloat(inputValue.value);
    const selectedUnitType = unitType.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    if (selectedUnitType === 'temperature') {
        const tempInCelsius = unitConversionData.temperature[from](value);
        const convertedValue = unitConversionData.temperature[to].inverse(tempInCelsius);
        result.textContent = `${value} ${from} = ${convertedValue.toFixed(2)} ${to}`;
    } else {
        const conversionFactor = unitConversionData[selectedUnitType][from] / unitConversionData[selectedUnitType][to];
        const convertedValue = value * conversionFactor;
        result.textContent = `${value} ${from} = ${convertedValue.toFixed(2)} ${to}`;
    }
} */
function convert() {
	const value = parseFloat(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    const unitTypeValue = unitType.value;

	 if (isNaN(value)) {
        result.textContent = "Error: Please enter a valid number first.";
        return;
    }

    let convertedValue;

    if (unitTypeValue === "temperature") {
        if (from !== to) {
            convertedValue = unitConversionData.temperature[from][to](value);
        } else {
            convertedValue = value;
        }
    } else {
        const selectedUnitType = unitConversionData[unitTypeValue];
        convertedValue = (value * selectedUnitType[from]) / selectedUnitType[to];
    }

    result.textContent = `${value} ${unitLabels[unitTypeValue][from]} = ${convertedValue.toFixed(2)} ${unitLabels[unitTypeValue][to]}`;
}


//unitType.addEventListener("change", updateUnitOptions);
unitType.addEventListener("change", updateUnitSelections);
updateUnitSelections();
convertBtn.addEventListener("click", convert);
