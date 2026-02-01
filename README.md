The class exposes five methods:
- UserDateToUTCISOString(DateString) returns string;
- UserDateToISO8601String(DateString) returns string;
- ServerDateToUserString(ISODateString, time = this.TimeFormat.none) returns string;
- UserStringToDecimal(NumberString) returns a number;
- ServerNumberToUserString(number, decimals = 0) returns string;

UserDateToUTCISOString returns the input string in UTC format. It is important to remember that in this case the time zone identification will come from querying the client's international settings.

UserDateToISO8601String returns the input string in ISO8601 format and is therefore certainly preferable.

ServerDateToUserString formats the date from the server in the date format specified when the class is being instantiated.

UserStringToDecimal receives an input string representing a numeric value, with the decimal separation character indicated at the instance stage of the class, returning a number.

ServerNumberToUserString receives a number as input and returns the corresponding string with the decimal separation character specified at class instance time and the number of decimals specified. By default the value will be converted directly to a string.


La classe espone cinque metodi:
- UserDateToUTCISOString(DateString) restituisce stringa;
- UserDateToISO8601String(DateString) restituisce stringa;
- ServerDateToUserString(ISODateString, time = this.TimeFormat.none) restituisce stringa;
- UserStringToDecimal(NumberString) restituisce un numero;
- ServerNumberToUserString(numero, decimali = 0) restituisce stringa;

UserDateToUTCISOString restituisce la stringa d'ingresso nel formato UTC. E' importante rammentare che in questo caso l'identificazione del fuso orario deriverà dall'interrogazione delle impostazioni internazionali del client.

UserDateToISO8601String restituisce la stringa d'ingresso nel formato ISO8601 e dunque è certamente da preferire.

ServerDateToUserString formatta la data proveniente dal server nel formato data ora indicato in fase di istanzazione della classe.

UserStringToDecimal riceve in ingresso una stringa rappresentante un valore numerico, con il carattere di separazione dei decimali indicato in fase di istanzazione della classe, restituendo un numero.

ServerNumberToUserString riceve in ingresso un numero e restituisce la stringa corrispondente con il carattere di separazione dei decimali indicato in fase di istanzazione della classe e il numero di decimali indicati. Di default il valore verrà convertito direttamente in una stringa.
