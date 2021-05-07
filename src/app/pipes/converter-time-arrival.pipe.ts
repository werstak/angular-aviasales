import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converterTimeArrival'
})
export class ConverterTimeArrivalPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const [timeDispatch, duration] = args[0];
    console.log('value', value);
    console.log('timeDispatch', timeDispatch);

    // console.log('duration', duration);
    // const hours = Math.floor(duration / 60);
    // const minutes = Math.floor(duration % 60);
    // console.log(hours + ':' + minutes);

    const CurrentTime = new Date(value);
    CurrentTime.setMinutes(CurrentTime.getMinutes() + duration);
    return(CurrentTime.getHours() + ':' + CurrentTime.getMinutes());



    // console.log('args', args[0]);
    // console.log('value', value);
    // const [date1, duration] = args;
    // const [date] = args;

    // console.log( 'date', date[0]);
    // console.log( 'date', date[1]);
    // return date[1];
  }

}
