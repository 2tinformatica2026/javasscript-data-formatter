class Formatter {
    #DateFormat = ["", "", ""];
    #CurrencyDecimalSeparator;
    constructor(ShortDatePattern, CurrencyDecimalSeparator) {
        if (ShortDatePattern == null) ShortDatePattern = 'mm/dd/yyyy';
        if (CurrencyDecimalSeparator == null) CurrencyDecimalSeparator = '.';
        this.#CurrencyDecimalSeparator = CurrencyDecimalSeparator.trim();
        ShortDatePattern = ShortDatePattern.toLowerCase().split("/");
        this.#DateFormat[0] = ShortDatePattern[0][0];
        this.#DateFormat[1] = ShortDatePattern[1][0];
        this.#DateFormat[2] = ShortDatePattern[2][0];
    }
    #SplittedDateString(DateString) {
        var day;
        var month;
        var year;
        var hour = 0;
        var minute = 0;
        var DateTime = DateString.trim().split(' ');
        var SplittedDate = DateTime[0].split("/");
        for (var i = 0; i < this.#DateFormat.length; i++) {
            switch (this.#DateFormat[i]) {
                case 'd':
                    day = parseInt(SplittedDate[i]);
                    break;
                case 'm':
                    month = parseInt(SplittedDate[i]);
                    break;
                case 'y':
                    year = parseInt(SplittedDate[i]);
                    break;
            }
        }
        if (DateTime.length > 1) {
            var SplittedTime = DateTime[DateTime.length - 1].split(":");
            hour = parseInt(SplittedTime[0]);
            minute = parseInt(SplittedTime[1]);
        }
        return { day: day, month: month, year: year, hour: hour, minute: minute }
    }
    //from user page to server
    UserDateToISOString(DateString) {
        var dte = this.#SplittedDateString(DateString);
        var result = new Date(dte.year, dte.month-1, dte.day, dte.hour, dte.minute).toISOString();
        return result;
    }
    //from server to user page
    ServerDateToUserString(ISODateString, TimeIncluded = false) {
        var data = new Date(ISODateString);
        var result = '';
        for (var i = 0; i < this.#DateFormat.length; i++) {
            switch (this.#DateFormat[i]) {
                case 'd':
                    if (result != '') result = result + '/';
                    result = result + String(data.getDate()).padStart(2, '0');
                    break;
                case 'm':
                    if (result != '') result = result + '/';
                    result = result + String(data.getMonth() + 1).padStart(2, '0');
                    break;
                case 'y':
                    if (result != '') result = result + '/';
                    result = result + String(data.getFullYear());
                    break;
            }
        }
        if (TimeIncluded) result = result + ' ' + String(data.getHours()).padStart(2, '0') + ':' + String(data.getMinutes()).padStart(2, '0');
        return result;
    }
    //from user page to server
    UserStringToDecimal(NumberString) {
        var temp = '';
        for (var i = 0; i < NumberString.length; i++) {
            if (!((NumberString[i] != this.#CurrencyDecimalSeparator) && (isNaN(parseFloat(NumberString[i]))))) {
                temp = temp + NumberString[i];
            }
        }
        if (temp == '') return null;
        return parseFloat(temp.replace(this.#CurrencyDecimalSeparator, '.'));
    }
    //from server to user page
    ServerNumberToUserString(number, decimals = 0) {
        if (number != null) {
            if (decimals > 0) number = number.toFixed(decimals);
            number = String(number);
            number = number.replace('.', this.#CurrencyDecimalSeparator);
        }
        return number;
    }
}