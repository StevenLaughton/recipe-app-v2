import {Ingredient} from '../models/ingredient';

enum VulgarFraction {
    '¼' = '1/4',
    '½' = '1/2',
    '¾' = '3/4',
    '⅐' = '1/7',
    '⅑' = '1/9',
    '⅒' = '1/10',
    '⅓' = '1/3',
    '⅔' = '2/3',
    '⅕' = '1/5',
    '⅖' = '2/5',
    '⅗' = '3/5',
    '⅘' = '4/5',
    '⅙' = '1/6',
    '⅚' = '5/6',
    '⅛' = '1/8',
    '⅜' = '3/8',
    '⅝' = '5/8',
    '⅞' = '7/8',
}

/**
 * Converts a string to a number.  The string can include mixed numbers
 * or vulgar fractions.
 */
function numericQuantity(qty: string) {
    const badResult = NaN;
    let finalResult = badResult;

    // Resolve any unicode vulgar fractions
    const vulgarFractionsRegex = /(¼|½|¾|⅐|⅑|⅒|⅓|⅔|⅕|⅖|⅗|⅘|⅙|⅚|⅛|⅜|⅝|⅞)/;

    const sQty = `${qty}`
        .replace(
            vulgarFractionsRegex,
            (_m, vf: keyof typeof VulgarFraction) => ` ${VulgarFraction[vf]}`,
        )
        .replace(/⁄/g, '/')
        .trim();

    /**
     *                    Regex captures
     *
     *  +=====+====================+========================+
     *  |  #  |    Description     |        Example         |
     *  +=====+====================+========================+
     *  |  0  |  entire string     |  "2 2/3" from "2 2/3"  |
     *  +-----+--------------------+------------------------+
     *  |  1  |  the dash          |  "-" from "-2 2/3"     |
     *  +-----+--------------------+------------------------+
     *  |  2  |  the whole number  |  "2" from "2 2/3"      |
     *  |     |  - OR -            |                        |
     *  |     |  the numerator     |  "2" from "2/3"        |
     *  +-----+--------------------+------------------------+
     *  |  3  |  entire fraction   |  "2/3" from "2 2/3"    |
     *  |     |  - OR -            |                        |
     *  |     |  decimal portion   |  ".66" from "2.66"     |
     *  |     |  - OR -            |                        |
     *  |     |  denominator       |  "/3" from "2/3"       |
     *  +=====+====================+========================+
     *
     *  re.exec("1")       // [ "1",     "1", null,   null ]
     *  re.exec("1.23")    // [ "1.23",  "1", ".23",  null ]
     *  re.exec("1 2/3")   // [ "1 2/3", "1", " 2/3", " 2" ]
     *  re.exec("2/3")     // [ "2/3",   "2", "/3",   null ]
     *  re.exec("2 / 3")   // [ "2 / 3", "2", "/ 3",  null ]
     */
    const re = /^(-)?\s*(\d*)(\.\d+|(\s+\d*\s*)?\s*\/\s*\d+)?$/;

    const ar = re.exec(sQty);

    // If the regex fails, give up
    if (!ar) {
        return badResult;
    }

    // Store the capture groups so we don't have to access the array
    // elements over and over
    const [, dash, numberGroup1, numberGroup2] = ar;

    // The regex can pass and still capture nothing in the relevant groups,
    // which means it failed for our purposes
    if (!numberGroup1 && !numberGroup2) {
        return badResult;
    }

    // Numerify capture group 1
    if (!numberGroup1 && numberGroup2 && numberGroup2.search(/^\./) !== -1) {
        finalResult = 0;
    } else {
        finalResult = parseInt(numberGroup1, 10);
    }

    if (Number.isNaN(finalResult)) {
        return badResult;
    }

    // If capture group 2 is null, then we're dealing with an integer
    // and there is nothing left to process
    if (!numberGroup2) {
        return finalResult * (dash === '-' ? -1 : 1);
    }

    if (numberGroup2.search(/^\./) !== -1) {
        // If first char is "." it's a decimal so just trim to 3 decimal places
        const numerator = parseFloat(numberGroup2);
        finalResult += Math.round(numerator * 1000) / 1000;
    } else if (numberGroup2.search(/^\s*\//) !== -1) {
        // If the first non-space char is "/" it's a pure fraction (e.g. "1/2")
        const numerator = parseInt(numberGroup1, 10);
        const denominator = parseInt(numberGroup2.replace('/', ''), 10);
        finalResult = Math.round((numerator * 1000) / denominator) / 1000;
    } else {
        // Otherwise it's a mixed fraction (e.g. "1 2/3")
        const fractionArray = numberGroup2.split('/');
        const [numerator, denominator] = fractionArray.map((v) => parseInt(v, 10));
        finalResult += Math.round((numerator * 1000) / denominator) / 1000;
    }

    return finalResult * (dash === '-' ? -1 : 1);
}

function parseIngredients(ingText: string): Ingredient[] {
    const arrRaw = ingText
        .replace(/\n{2,}/g, '\n')
        .split('\n')
        .map((ing) => ing.trim());

    return arrRaw.map((line) => {
        const oIng: Ingredient = {
            id: 0,
            quantity: undefined,
            text: '',
            isGroupHeader: false,
        };

        // Check if the first character is numeric.
        const nqResultFirstChar = numericQuantity(line.substring(0, 1));

        // If the first character is not numeric, the entire line is the description.
        if (Number.isNaN(nqResultFirstChar)) {
            oIng.text = line;

            // If the line ends with ":" or starts with "For ", then it is assumed to be a group header.
            if (/:$/.test(oIng.text) || /^For /i.test(oIng.text)) {
                oIng.isGroupHeader = true;
            }

            // If the first character is numeric, then see how many of the first seven
            // constitute a single value.  This will be `quantity`.
        } else {
            let lenNum = 6;
            let nqResult = NaN;

            while (lenNum > 0 && Number.isNaN(nqResult)) {
                nqResult = numericQuantity(line.substring(0, lenNum).trim());

                if (nqResult > -1) {
                    oIng.quantity = nqResult;
                    oIng.text = line.substring(lenNum).trim();
                }

                lenNum -= 1;
            }
        }

        // Now check the description for a `quantity2` at the beginning.
        // First we look for a dash, emdash, endash, or the word "to" to indicate
        // a range, then process the next seven characters just like we did for
        // `quantity`.
        const q2re = /^(-|–|—|to )/i;
        const q2reMatch = q2re.exec(oIng.text);
        if (q2reMatch) {
            const q2reMatchLen = q2reMatch[1].length;
            const nqResultFirstChar2 = numericQuantity(
                oIng.text.substring(q2reMatchLen).trim().substring(0, 1),
            );

            if (!Number.isNaN(nqResultFirstChar2)) {
                let lenNum = 6;
                let nqResult = NaN;

                while (lenNum > 0 && Number.isNaN(nqResult)) {
                    nqResult = numericQuantity(
                        oIng.text.substring(q2reMatchLen, lenNum),
                    );

                    if (!Number.isNaN(nqResult)) {
                        // oIng.quantity2 = nqResult;
                        oIng.text = oIng.text.substring(lenNum).trim();
                    }

                    lenNum -= 1;
                }
            }
        }

        return oIng;
    });
}

export default parseIngredients;
