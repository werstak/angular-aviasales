import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converterTimeArrival'
})
export class ConverterTimeArrivalPipe implements PipeTransform {
  transform(value: any): any {
    const timeDispatch = value.date;
    const duration = value.duration;

    /** Arrival time calculation */
    const CurrentTime = new Date(timeDispatch);
    CurrentTime.setMinutes(CurrentTime.getMinutes() + duration);
    const minutes = CurrentTime.getMinutes();
    const minutesString = String(minutes);
    return (CurrentTime.getHours() + ':' + (minutesString.length > 1 ? CurrentTime.getMinutes() : '0' + CurrentTime.getMinutes()));
  }
}
