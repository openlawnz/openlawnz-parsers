export default (caseText: string): string => {
    let filingNumber: string;

    const regs = [
        /((CIV|CHCH|CRI|CIR|WN|AK|CIVP|CA|SC)[\s|\-|.|:|CA|SC]\s?(\d{4})((-|\s?)\d*(-|\s)\d*))|(CIV|CHCH|CRI|CIR|WN|AK|CIVP|CA|SC)([\s|\-|.|:|CA|SC])?\s?(\d{1,3}\/\d{0,4})/i, // TODO: Fix typo in common
        /\(?(DCA|ACR)\s?\d*\s?\/\s?\d*\)?/i,
        /(Decision\s*No\.?\s*\d+\s*\d+\s*\/\s*)\d{0,4}|(DCA\s*No\.?\s*\d+(?:\/|\s*)\d{0,4})/im,
    ];

    for (let i = 0; i < regs.length; i++) {
        // do the initial regex match
        const matches = caseText.match(regs[i]);

        if (matches && matches[0]) {
            // trim whitespace

            filingNumber = matches[0];
            filingNumber = filingNumber.replace(/\n/gi, '').replace(/[a-z]|\.|\(|\)/gi, '');

            if (filingNumber && filingNumber.includes('/')) {
                // Remove all whitespace
                filingNumber = filingNumber.replace(/\s+/g, '');
                // Remove dash at start or end
                if (filingNumber[0] === '-') {
                    filingNumber = filingNumber.substr(1);
                }

                return filingNumber;
            } else {
                // If no slash then will be long format string - trim whitespace at end only (might have whitespace inside string)
                return filingNumber.trim();
            }
        }
    }
};
