function rentalCarCost(days) {
  var discount = (days <= 2) ? 0 : ((days >= 7 ) ? 50 : 20 );
  return (days * 40) - discount;
}