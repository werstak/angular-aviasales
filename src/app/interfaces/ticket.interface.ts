import { TicketSegmentsInterface } from './ticket-segments.interface';

export interface TicketInterface {
  price: number;
  carrier: string;
  segments: TicketSegmentsInterface[];
}
