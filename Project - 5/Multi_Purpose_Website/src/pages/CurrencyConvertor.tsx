import React, { useState } from "react";
import { ArrowLeftRight, TrendingUp } from "lucide-react";
import Navbar from "../components/Individual_Components/Navbar";
import Footer from "../components/Individual_Components/Footer";
import CurrencyInput from "../components/Individual_Components/CurrencyInput";
import Select from "../components/UI/Select";

const CurrencyConverter: React.FC = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState("");

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="Currency Converter" />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Currency Converter
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Converter Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-6">
                Convert Currency
              </h3>

              <div className="space-y-6">
                {/* From Currency */}
                <div className="space-y-4">
                  <Select
                    value={fromCurrency}
                    onChange={setFromCurrency}
                    label="From"
                    currencies={[
                      { code: "USD", name: "US Dollar", symbol: "$" },
                      { code: "EUR", name: "Euro", symbol: "€" },
                      { code: "GBP", name: "British Pound", symbol: "£" },
                      { code: "JPY", name: "Japanese Yen", symbol: "¥" },
                      { code: "AUD", name: "Australian Dollar", symbol: "A$" },
                      { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
                      { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
                      { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
                      { code: "INR", name: "Indian Rupee", symbol: "₹" },
                      { code: "KRW", name: "South Korean Won", symbol: "₩" },
                    ]}
                  />
                  <CurrencyInput
                    value={fromAmount}
                    onChange={setFromAmount}
                    label="Amount"
                  />
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSwapCurrencies}
                    className="p-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
                    aria-label="Swap currencies"
                  >
                    <ArrowLeftRight size={24} />
                  </button>
                </div>

                {/* To Currency */}
                <div className="space-y-4">
                  <Select
                    value={toCurrency}
                    onChange={setToCurrency}
                    label="To"
                    currencies={[
                      { code: "USD", name: "US Dollar", symbol: "$" },
                      { code: "EUR", name: "Euro", symbol: "€" },
                      { code: "GBP", name: "British Pound", symbol: "£" },
                      { code: "JPY", name: "Japanese Yen", symbol: "¥" },
                      { code: "AUD", name: "Australian Dollar", symbol: "A$" },
                      { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
                      { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
                      { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
                      { code: "INR", name: "Indian Rupee", symbol: "₹" },
                      { code: "KRW", name: "South Korean Won", symbol: "₩" },
                    ]}
                  />
                  <CurrencyInput
                    value={toAmount}
                    onChange={setToAmount}
                    label="Converted Amount"
                    readOnly
                  />
                </div>

                <button className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md hover:bg-primary/90 transition-colors">
                  Convert
                </button>
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp
                    size={20}
                    className="mr-2 text-muted-foreground"
                  />
                  <h3 className="text-lg font-semibold text-card-foreground">
                    Exchange Rate
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Current Rate
                    </p>
                    <p className="text-2xl font-bold text-accent-foreground">
                      1 {fromCurrency} = {exchangeRate || "0.00"} {toCurrency}
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>• Exchange rates are updated in real-time</p>
                    <p>• Rates may vary between different providers</p>
                    <p>• Use for reference purposes only</p>
                  </div>
                </div>
              </div>

              {/* Historical Data Placeholder */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Rate History
                </h3>
                <div className="h-32 bg-accent rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Historical chart will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrencyConverter;
