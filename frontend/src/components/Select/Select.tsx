import { FC, useEffect, useState } from "react";
import { CurrencyData } from "../../types";

interface Props {
  currencies: CurrencyData[];
  currency: string;
  setCurrency: (value: string) => void;
  label: string;
}
const Select: FC<Props> = ({ currencies, currency, setCurrency, label }) => {
  const [currencyIcon, setCurrencyIcon] = useState<string>(currency);

  useEffect(() => {
    setCurrencyIcon(currency);
  }, [currency]);
  return (
    <div className="mb-4 flex justify-between gap-2 ">
      <label className="block mb-1 w-1/4 text-left">{label}</label>
      <div className="flex items-center gap-2 w-3/4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          {currencies.map((currency) => (
            <option key={currency.currency} value={currency.currency}>
              {currency.currency}
            </option>
          ))}
        </select>
        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currencyIcon}.svg`}
        />
      </div>
    </div>
  );
};

export default Select;
