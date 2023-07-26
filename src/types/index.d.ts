export interface Cabin {
  readonly id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export interface InputsCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
}

export interface Settings {
  readonly id?: number;
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestPerBooking?: number;
  breakfastPrice?: number;
}
