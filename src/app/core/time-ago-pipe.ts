import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  
  transform(value: string | Date | number | undefined | null): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // If the date is invalid or in the future
    if (isNaN(seconds) || seconds < 10) {
      return 'now';
    }

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const counter = Math.floor(seconds / secondsInUnit);
      if (counter > 0) {
        return counter === 1 ? `1 ${unit} ago` : `${counter} ${unit}s ago`;
      }
    }

    return 'now';
  }
}
