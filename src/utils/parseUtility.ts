export const parse = (data, pattern) => {
    for (const key in pattern) {
        for (const value in pattern[key]) {
            const temp = data.match(pattern[key][value]);
            if (temp) {
                return { value: [temp[1].trim()], valueIndex: temp.index };
            }
        }
    }

    return null;
};

export function parse2(data, pattern, patternResultIndex) {
    const output = data.match(pattern);
    if (output != undefined && output != null && output.length > 0 && output[patternResultIndex] != undefined) {
        return output[patternResultIndex].trim();
    }

    return '';
}

export const parse3 = (data, pattern, patternResultIndex) => {
    const result = [];
    for (let i = 0; i < pattern.length; i++) {
        let output;
        while ((output = pattern[i].exec(data)) !== null) {
            if (output != undefined && output.length > 0 && output[patternResultIndex] != undefined) {
                const outputValue = output[patternResultIndex].trim();
                if (outputValue != '' && !result.includes(outputValue)) {
                    result.push(outputValue);
                }
            }
        }
    }

    return result;
};

export const parse4 = (data, pattern, patternResultIndex) => {
    const result = [];
    for (let i = 0; i < pattern.length; i++) {
        const output = data.match(pattern[i]);
        if (output != undefined && output != null && output.length > 0 && output[patternResultIndex] != undefined) {
            const outputValue = output[patternResultIndex].trim();
            if (outputValue != '' && !result.includes(outputValue)) {
                result.push(outputValue);
            }
        }
    }

    return result;
};

export const parse5 = (data, patterns) => {
    const result = [];
    for (let i = 0; i < patterns.length; i++) {
        const patternObject = patterns[i].item;
        for (let j = 0; j < patternObject.length; j++) {
            const output = data.match(patternObject[j].pattern);
            if (
                output != undefined &&
                output != null &&
                output.length > 0 &&
                output[patternObject[j].patternResultIndex] != undefined
            ) {
                const outputValue = output[patternObject[j].patternResultIndex].trim();
                if (outputValue != '' && !result.includes(outputValue)) {
                    result.push(outputValue);
                    j = patternObject.length + 1;
                }
            }
        }
    }

    return result;
};

export const parse6 = (data, patterns) => {
    let result = '';
    for (let i = 0; i < patterns.length; i++) {
        const output = data.match(patterns[i].pattern);
        if (
            output != undefined &&
            output != null &&
            output.length > 0 &&
            output[patterns[i].patternResultIndex] != undefined
        ) {
            result = output[patterns[i].patternResultIndex].trim();
            i = patterns.length + 1;
        }
    }

    return result;
};

function parseNewLine(data) {
    const result = [];
    for (let dataCounter = 0; dataCounter < data.length; dataCounter++) {
        let dataTemp = data[dataCounter];
        if (dataTemp.includes('\n')) {
            dataTemp = parse2(
                dataTemp,
                /([a-zA-Z0-9\u00C0-\u02AB\s'\(\),.-]*)[\n]([a-zA-Z0-9\u00C0-\u02AB\s'\(\),.-]*)/im,
                2,
            );
            result.push(dataTemp);
        } else {
            result.push(dataTemp);
        }
    }

    return result;
}

export const parseSeparator = (data, separators) => {
    const result = [];
    let hasSeparator = false;
    const data1 = parseNewLine(data);
    for (let i = 0; i < separators.length; i++) {
        for (var dataCounter = 0; dataCounter < data1.length; dataCounter++) {
            if (hasSeparator) {
                break;
            }
            const dataTemp = data1[dataCounter];
            const separatorObject = separators[i];
            for (
                let separator1Counter = 0;
                separator1Counter < separatorObject.firstSeparator.length;
                separator1Counter++
            ) {
                switch (separatorObject.firstSeparatorType) {
                    case 1:
                        {
                            if (dataTemp.includes(separatorObject.firstSeparator[separator1Counter])) {
                                const firstData = dataTemp.split(separatorObject.firstSeparator[separator1Counter]);
                                for (let j = 0; j < firstData.length; j++) {
                                    if (separatorObject.secondSeparator != undefined) {
                                        let hasSecondSeparator = false;
                                        for (let k = 0; k < separatorObject.secondSeparator.length; k++) {
                                            switch (separatorObject.secondSeparatorType) {
                                                case 1:
                                                    {
                                                        if (firstData[j].includes(separatorObject.secondSeparator[k])) {
                                                            const secondData = firstData[j].split(
                                                                separatorObject.secondSeparator[k],
                                                            );
                                                            for (let l = 0; l < secondData.length; l++) {
                                                                var value = secondData[l].trim();
                                                                if (!result.includes(value)) {
                                                                    result.push(value);
                                                                }
                                                            }
                                                            hasSecondSeparator = true;
                                                            k = separatorObject.secondSeparator.length + 1;
                                                        }
                                                    }
                                                    break;
                                                case 3:
                                                    {
                                                        if (firstData[j].endsWith(separatorObject.secondSeparator[k])) {
                                                            if (
                                                                !result.includes(
                                                                    firstData[j].substring(
                                                                        0,
                                                                        firstData[j].length -
                                                                            separatorObject.secondSeparator[k].length,
                                                                    ),
                                                                )
                                                            ) {
                                                                result.push(
                                                                    firstData[j].substring(
                                                                        0,
                                                                        firstData[j].length -
                                                                            separatorObject.secondSeparator[k].length,
                                                                    ),
                                                                );
                                                            }
                                                            hasSecondSeparator = true;
                                                            k = separatorObject.secondSeparator.length + 1;
                                                        }
                                                    }
                                                    break;
                                            }
                                        }

                                        if (!hasSecondSeparator) {
                                            var value = firstData[j].trim();
                                            if (!result.includes(value)) {
                                                result.push(value);
                                            }
                                        }
                                    } else {
                                        var value = firstData[j].trim();
                                        if (!result.includes(value)) {
                                            result.push(value);
                                        }
                                    }
                                }

                                hasSeparator = true;
                                i = separators.length + 1;
                            }
                        }
                        break;
                    case 3:
                        {
                            var value = dataTemp.trim();
                            if (value.endsWith(separatorObject.firstSeparator[separator1Counter])) {
                                if (
                                    !result.includes(
                                        value.substring(
                                            0,
                                            value.length - separatorObject.firstSeparator[separator1Counter].length,
                                        ),
                                    )
                                ) {
                                    result.push(
                                        value.substring(
                                            0,
                                            value.length - separatorObject.firstSeparator[separator1Counter].length,
                                        ),
                                    );
                                }
                                hasSeparator = true;
                                i = separators.length + 1;
                            }
                        }
                        break;
                }
            }
        }
    }

    if (!hasSeparator) {
        for (var dataCounter = 0; dataCounter < data1.length; dataCounter++) {
            var value = data1[dataCounter].trim();
            if (value != '' && !result.includes(value)) {
                result.push(value);
            }
        }
    }

    return result;
};

export const parseAppearance1 = (data, pattern, patternIndex, reservedDescription) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        let outputValue = parse2(data[i], pattern, patternIndex);
        if (outputValue === '') {
            for (var j = 0; j < reservedDescription.length; j++) {
                if (data[i].endsWith(reservedDescription[j])) {
                    data[i] = data[i].replace(reservedDescription[j], '');
                }
            }
            if (data[i] != '' && !result.includes(data[i])) result.push(data[i]);
        } else {
            for (var j = 0; j < reservedDescription.length; j++) {
                if (outputValue.endsWith(reservedDescription[j])) {
                    outputValue = outputValue.replace(reservedDescription[j], '');
                }
            }
            if (data[i] != '' && !result.includes(outputValue)) result.push(outputValue);
        }
    }
    return result;
};

export const mergeData = (data1, data2) => {
    const data2Length = data2.length;
    for (let i = 0; i < data2Length; i++) {
        if (!data1.includes(data2[i])) {
            data1.push(data2[i]);
        }
    }
};

export const truncateLongData = (data, maxLength) => {
    let i = data.length;
    while (i--) {
        if (data[i].length > maxLength) {
            data.splice(i, 1);
        }
    }
};
