class Formatter {
    TimeFormat = { none: 0, hm: 1, hms: 2 };
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
        var seconds = 0;
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
            for (var i = 0; i < SplittedTime.length; i++) {
                switch (i) {
                    case 0:
                        hour = parseInt(SplittedTime[0]);
                        break;
                    case 1:
                        minute = parseInt(SplittedTime[1]);
                        break;
                    case 2:
                        seconds = parseInt(SplittedTime[2]);
                        break;
                }
            }
        }
        return { day: day, month: month, year: year, hour: hour, minute: minute, seconds: seconds }
    }
    //from user page to server
    UserDateToUTCISOString(DateString) {
        var result = '';
        if (DateString.trim() != '') {
            var dte = this.#SplittedDateString(DateString);
            result = new Date(dte.year, dte.month - 1, dte.day, dte.hour, dte.minute, dte.seconds).toISOString();
        }
        return result;
    }
    UserDateToISO8601String(DateString) {
        var result = '';
        if (DateString.trim() != '') {
            var dte = this.#SplittedDateString(DateString);
            var day = String(dte.day).padStart(2, '0');
            var month = String(dte.month).padStart(2, '0');
            var year = String(dte.year).padStart(4, '19');
            var hour = String(dte.hour).padStart(2, '00');
            var minute = String(dte.minute).padStart(2, '00');
            var seconds = String(dte.seconds).padStart(2, '00');
            var result = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + seconds + 'Z';
        }
        return result;
    }
    //from server to user page
    ServerDateToUserString(ISODateString, time = this.TimeFormat.none) {
        var result = '';
        if (ISODateString.trim() != '') {
            var data = new Date(ISODateString);
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
            if (time == this.TimeFormat.hm || time == this.TimeFormat.hms) {
                result = result + ' ' + String(data.getHours()).padStart(2, '0') + ':' + String(data.getMinutes()).padStart(2, '0');
                if (time == this.TimeFormat.hms) result = result + ':' + String(data.getSeconds()).padStart(2, '0');
            }
        }
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
        if (number != null & number !='') {
            if (decimals > 0) number = number.toFixed(decimals);
            number = String(number);
            number = number.replace('.', this.#CurrencyDecimalSeparator);
        }
        return number;
    }
}