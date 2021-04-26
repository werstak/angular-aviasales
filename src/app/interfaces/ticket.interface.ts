import { TicketSegmentsInterface } from './ticket-segments.interface';

export interface TicketInterface {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: TicketSegmentsInterface[];
}


/*одинаково*/
// Array<string> - применяется чаще для сложных интерфейсов
// string[] - для простых интерфейсов
