import type {PipeTransform} from '@angular/core';
import {Pipe} from '@angular/core';
import {utc} from 'moment';

@Pipe({
  name: 'formatDuration',
  standalone: true,
})
export class FormatDurationPipe implements PipeTransform {
  /**
   * Transforms milliseconds into 'mm:ss' format using moment.js
   * @param {number} ms - Duration in milliseconds
   * @returns {string} - Formatted duration as 'mm:ss'
   */
  public transform(ms: number): string {
    return utc(ms).format('mm:ss');
  }
}
