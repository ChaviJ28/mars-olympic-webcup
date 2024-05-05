import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Flex } from 'antd';
import { MyTable } from "@/components/MyTable";
import { BaseLink } from "../components/base/BaseLink";
import { FormInstance } from 'antd/lib/form';
import StarsCanvas from '@/canvas/mars_cover';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export interface FormValues {
  participant: string;
  paymentType: string;
  amount: string;
}


export interface Participant {
  id: number;
  name: string;
  country: string;
  odds: number;
}

export interface MyTableProps {
  participants: Participant[];
}


export const ApeRock: React.FC<{id: number}> = ({id} : {id: number}) => {
  console.log(id)
  const participantData = [
    { id: 1, Name: 'Zinzu Chan Lee', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '27', Odds: '18/4', OddsVal: '10' },
    { id: 2, Name: 'Jeet Saru', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '32', Odds: '10/2', OddsVal: '5' },
    { id: 3, Name: 'Sonal Gharti', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '24', Odds: '10/5', OddsVal: '2' },
  ];

  const form = Form.useForm<FormInstance<FormValues>>();
  const [participant, setParticipant] = useState<string>();
  const [paymentType, setPaymentType] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [payOut, setPayOut] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleSubmit = async (values: FormValues) => {
    console.log('Received values:', values);
    setLoading(true);
    setLoading(true);

    const data = {
      email: localStorage.getItem('email'),
      participant: values.participant,
      paymentType: values.paymentType,
      amount: values.amount,
      payOut: payOut
    }

    try {
      const response = await fetch('https://debugthugs20.maurice.webcup.hodi.host/api/participant/bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const navigate = useNavigate();

      const dataRec = await response.json();

      setLoading(false);
      navigate('/bettingticket');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('https://debugthugs20.maurice.webcup.hodi.host/api/participant');
        const jsonData = await response.json();
        const filteredParticipants = jsonData.data.filter((participant:any) => participant.competition === id);
        console.log(filteredParticipants)
        setParticipants(filteredParticipants);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    if (amount > 0 && !!participant) {
      const partipantOdd = participants.find(item => item.name === participant)?.odds; 
      setPayOut(amount * (Number(partipantOdd) + 1));
    }
  }, [amount, participant])

  return (
    <div className='w-full h-screen absolute inset-0 z-[-1]  mx-0 overflow-y-auto'>
      <div className="w-full h-full fixed inset-0 z-[-1]">
        <StarsCanvas />
      </div>
      <div className='p-32'>
        <BaseLink className="mb-10" to="/">Back</BaseLink>
        <Flex justify="space-between" className='mt-[5%]'>
          <div className="w-full md:w-1/2 p-2 flex justify-center">
            <div>
              {id == 0  &&  <img className="w-600" src="/images/arch.png" /> }
              {id == 1  &&  <img className="w-600" src="/images/football.png" /> }
              {id == 2  &&  <img className="w-600" src="/images/shooter.png" /> }
             
            </div>
          </div>


          <div className="w-full md:w-1/2 p-2">
            <div className=" bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 p-12 rounded-lg shadow-xxl" style={{ maxWidth: '500px' }}>
              <h2 className="text-8xl text-center  mb-8 text-white" style={{ fontSize: '1.5rem', fontWeight: '500' }}>Place Your Bet</h2>
              <Form className="form-white-labels"
                form={form as any}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{
                  participant: participant,
                  paymentType: paymentType,
                  amount: amount
                }}
              >
                <Form.Item
                  name="participant"
                  label="Select Participant"
                  style={{ color: 'white' }}
                  className="text-white"
                  rules={[{ required: true, message: 'Please select a participant!' }]}
                >
                  <Select
                    placeholder="Select a participant"
                    onChange={value => setParticipant(value)}
                    className="bg-white/10 text-white  rounded-md border-none"
                  >
                    {participants.map((item, i) => (
                      <Option key={i + item.odds} value={item.name}>
                        {item.name}
                      </Option>
                    )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="paymentType"
                  label="Crypto Payment"
                  className="text-white"
                  rules={[{ required: true, message: 'Please select a payment type!' }]}
                >
                  <Select
                    placeholder="Select payment type"
                    onChange={value => setPaymentType(value)}
                    className="bg-white/10 text-white rounded-md border-none"
                  >
                    <Option value="bitcoin">Bitcoin</Option>
                    <Option value="ethereum">Ethereum</Option>
                    <Option value="litecoin">Litecoin</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="Enter Amount"
                  className="text-white "
                  rules={[{ required: true, message: 'Please enter an amount!', pattern: /^\d+(\.\d{1,2})?$/ }]}
                >
                  <Input
                    type="text"
                    placeholder="Amount in USD"
                    onChange={e => setAmount(e.target.value as unknown as number)}
                    className="bg-white text-black rounded-md"
                  />
                </Form.Item>

                {payOut > 0 && (<p className=" bg-gray-800 p-2 rounded-md text-white  mb-[2rem]">
                  Expected Pay Out: <span className="font-bold text-green-400">${payOut.toFixed(2)}</span>
                </p>)}

                <Form.Item>
                  <Button  loading={loading} htmlType="submit" className="w-full text-white bg-purple-600 hover:border-transparent hover:text-white hover:bg-purple-800 transition-colors duration-300 rounded-md">
                    Place Bet
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Flex>

        <div className='mt-[2rem] container'>
          <MyTable participants={participants} />
        </div>
      </div>

    </div>
  );
}

// TailwindCSS classes for button gradient (add in your global CSS file)
// .gradient-bg {
//   background: linear-gradient(to right, #6ee7b7, #3b82f6);
//   border: none;
//   color: white;
//   transition: background 0.3s ease;
// }

// .gradient-bg:hover {
//   background: linear-gradient(to right, #3b82f6, #9333ea);
// }
