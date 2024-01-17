//to convert the currency to rupee

const FormatPrice = ({price}) => {
    //format to convert paise to rupee=> devided by 100
  return (
    Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:"INR",
        //0.00
        maximumFractionDigits:2,
    }).format(price/100)
  )
}

export default FormatPrice;
