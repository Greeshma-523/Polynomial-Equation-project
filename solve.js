const fs = require("fs");

// Function to process one JSON file
function processTestcase(fileName) {
    // console.log(`\nProcessing: ${fileName}`);

    // Step 1: Load JSON file
    const data = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const n = data.keys.n;
    const k = data.keys.k;

    // Step 2: Decode all Y values based on "base" and "value"
    let Y_values = [];

    for (let key in data) {
        if (key !== "keys") {
            let base = parseInt(data[key].base);
            let valueStr = data[key].value;

            // Convert "value" from given base → decimal integer
            let decoded = parseInt(valueStr, base);

            Y_values.push(decoded);
        }
    }

    // Step 3: Compute constant C using polynomial interpolation

    // Formula: C = f(0)
    // Lagrange interpolation (only constant term needed)

    let C = 0;

    // X values are 1,2,3...n
    let X = [];
    for (let i = 1; i <= n; i++) X.push(i);

    for (let i = 0; i < n; i++) {
        let xi = X[i];
        let yi = Y_values[i];

        let Li = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = X[j];
                Li *= (0 - xj) / (xi - xj);
            }
        }

        C += yi * Li;
    }

    console.log("Constant C =", Math.round(C));
}

// Run both testcases
processTestcase("testcase1.json");
processTestcase("testcase2.json");