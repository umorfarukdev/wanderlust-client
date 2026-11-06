export default interface IDestination  {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
};

export interface IBooking {
  _id: string;
  userName: string;
  email: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  bookingDate: string;
}