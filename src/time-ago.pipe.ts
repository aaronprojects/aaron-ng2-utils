import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    'name': 'timeAgo',
    'pure': false
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: Date, []): string {
        if (value != null) {
            var result: string;
            // current time
            var now = new Date().getTime();
            // time in seconds
            var delta = (now - value.getTime()) / 1000;
            // format string
            if (delta < 60) {
                result = 'jetzt';
            } else if (delta < 3600) { // in last hour
                var minutes = Math.floor(delta / 60);
                result = 'vor ' + minutes + ' Minute';
                if (minutes > 1) result += 'n';
            } else if (delta < 86400) { // on last day
                var hours = Math.floor(delta / 3600);
                result = 'vor ' + hours + ' Stunde';
                if (hours > 1) result += 'n';
            } else { // more than one day ago
                var days = Math.floor(delta / 86400);
                result = 'vor ' + days + ' Tag';
                if (days > 1) result += 'en';
            }

            return result;
        }
    }
}