import React, { useEffect, useState } from "react";
import { MyTable } from "@/components/MyTable";
import './styles/formContainer.css'
import { BaseLink } from "../components/base/BaseLink";
export type ApeRockProps = React.ComponentPropsWithoutRef<"div">;

export function ApeRock({ ...props }: ApeRockProps) {
  const participantData = [
    { id: 1, Name: 'Zinzu Chan Lee', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '27', Odds: '18/4', OddsVal: '10' },
    { id: 2, Name: 'Jeet Saru', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '32', Odds: '10/2', OddsVal: '5' },
    { id: 3, Name: 'Sonal Gharti', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '24', Odds: '10/5', OddsVal: '2' },
  ];

 
  const [participant, setParticipant] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [payout, setPayout] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
  };
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div {...props}>
        <div className="flex size-full flex-col">
          <BaseLink className="-mb-40 mr-auto" arrow="left" id="hide-on-animate" to="/">
            Back
          </BaseLink>
          <div>
            <MyTable />
          </div>
        </div>
        <div className="formContainer">
          <h1>Place your bet</h1>
          <form>
              <div>
                <label htmlFor="">Select Participant</label>
                <select id="dropdown" value={selectedOption} onChange={handleChange}>
                  <option value="">Choose an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
               </select>
              </div>
              <div>
                <label htmlFor="">Enter your Crypto Payment</label>
                <select id="dropdown" value={selectedOption} onChange={handleChange}>
                  <option value="">Choose an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
               </select>
              </div>
              <div>
              <label htmlFor="">Enter Amount</label>
                <select id="dropdown" value={selectedOption} onChange={handleChange}>
                  <option value="">Choose an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
               </select>
              </div>
              <div>
                <label htmlFor="">Payout :</label>
                <input type="text" name="" id="" disabled={true}/>
              </div>
          </form>
        </div>
    </div>
  );
}
