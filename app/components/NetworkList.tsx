"use client";

import { useState } from "react";

interface NetworkData {
  Network: string;
  Prefix: string[];
  Length: string[];
}

const rangeNumDiscover: string[] = [];
for (let i = 622126; i <= 622925; i++) {
    rangeNumDiscover.push(i.toString(), "6011", "65");

}
for (let i = 644; i <= 649; i++) {
  rangeNumDiscover.push(i.toString());

}

const rangeNumMaestro: string[] = [];
for (let i = 56; i <= 59; i++) {
    rangeNumMaestro.push(i.toString(), "50");

}

const lengthMaestro: string[] = [];
for (let i = 12; i <= 19; i++) {
    lengthMaestro.push(i.toString());

}

const cardNetworks: NetworkData[] = [
  { Network: "American Express", Prefix: ["34", "37"], Length: ["15"] },
  { Network: "Diners Club", Prefix: ["38", "39"], Length: ["14"] },
  { Network: "Visa", Prefix: ["4"], Length: ["13", "16", "19"] },
  { Network: "MasterCard", Prefix: ["51", "52", "53", "54", "55"], Length: ["16"] },
  { Network: "Discover", Prefix: rangeNumDiscover , Length: ["16", "19"] },
  { Network: "Maestro", Prefix: rangeNumMaestro, Length: lengthMaestro },
];

const getCardNetwork = (cardNumber: string): string | null => {
    let hasil: string = "Tipe Network Tidak Ada"
    let prefixInp: string[] = []
    const numInpDiscover6 = cardNumber.slice(0, 6);
    const numInpDiscover4 = cardNumber.slice(0, 4);
    const numInp3 = cardNumber.slice(0, 3);
    const numInp2 = cardNumber.slice(0, 2);
    const numInp1 = cardNumber.slice(0, 1);

    prefixInp.push(numInp1, numInp2, numInp3, numInpDiscover4, numInpDiscover6)

    const lengInputNum = cardNumber.length.toString()
    cardNetworks.map((netdata) => {
    const mapInput = prefixInp.map(inpNum => inpNum)
    const hasCommonValue = netdata.Prefix.some(value => mapInput.includes(value));

    if (netdata.Length.includes(lengInputNum) && hasCommonValue){
        hasil = netdata.Network
    }
  })

  return hasil
};

const NetworkList = () => {
  const [number, setNumber] = useState<string>("");
  const [cardType, setCardType] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
    setShowResult(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCardType(getCardNetwork(number));
    setShowResult(true);
  };

  return (
    <>
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex items-center shrink-0 w-full mx-auto sm:w-auto">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center w-full md:flex-row">
          <label className="shrink-0 mb-2 me-auto text-sm font-medium text-gray-500 md:mb-0 md:me-4 dark:text-gray-400">
            Masukkan Nomor
          </label>
          <input
            type="number"
            id="number"
            placeholder="Nomor Network"
            value={number}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:me-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cek Network
          </button>
        </form>
      </div>
    </div>
    <div>
            
          <div className="m-4 p-6 bg-gray-200 dark:bg-gray-700 rounded-lg text-center">
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              Tipe Network: {cardType}
            </span>
          </div>

    </div>
    </>
  );
};

export default NetworkList;
