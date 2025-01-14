import React, { useEffect, useState } from "react";
import { CurrencyData } from "../types";
import Select from "./Select/Select";
import Button from "./button/Button";

const CurrencySwapForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("BUSD");
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [amountError, setAmountError] = useState<string>("");

  const fetchCurrencies = async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data: CurrencyData[] = await response.json();
    setCurrencies(data);
  };

  const swapCurrency = async () => {
    setAmountError("");
    if (amount <= 0) {
      setAmountError("Amount must be greater than 0");
      return;
    }
    setLoading(true);

    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data: CurrencyData[] = await response.json();
    const fromPrice = data.find(
      (item: { currency: string }) => item.currency === fromCurrency
    )?.price;
    const toPrice = data.find(
      (item: { currency: string }) => item.currency === toCurrency
    )?.price;

    if (fromPrice && toPrice) {
      const exchangedAmount = (amount * fromPrice) / toPrice;
      setResult(parseFloat(exchangedAmount.toFixed(2)));
    } else {
      setResult(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (amount > 0) setAmountError("");
  }, [amount]);

  return (
    <div className="mx-auto p-5 border border-gray-300 rounded-lg bg-white shadow-lg md:w-1/3 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-center">Currency Swap</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          swapCurrency();
        }}
      >
        <Select
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          label={"From:"}
        />
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="amount" className="block mb-1 text-left w-1/4">
            Amount:
          </label>
          <div className="w-3/4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              id="amount"
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
            {amountError && <span className="text-red-500">{amountError}</span>}
          </div>
        </div>
        <Select
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          label={"To:"}
        />
        <Button loading={loading} title={'Swap'} />
        {result !== null && (
          <div className="mt-2 font-bold">
            Result: {result} {toCurrency}
          </div>
        )}
      </form>
    </div>
  );
};

export default CurrencySwapForm;