
import './styles/MyTable.css'


 export function MyTable(){

  const participantData = [
    { id: 1, Name: 'Zinzu Chan Lee', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '27', Odds: '18/4',OddsVal:'10'},
    { id: 2, Name: 'Jeet Saru', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '32', Odds: '10/2',OddsVal:'5'},
    { id: 3, Name: 'Sonal Gharti', Country: 'https://hatscripts.github.io/circle-flags/flags/in.svg', Age: '24', Odds: '10/5',OddsVal:'2'},
  ];

  return (
    <main className="table" id="customers_table">
      <section className="table__header">
        <h1>Participants List</h1>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Age</th>
              <th>Odds</th>
            </tr>
          </thead>
          <tbody>
            {participantData.map((item) => (
            <tr key={item.id}>
                <td>{item.Name}</td>
                <td className='playerFlag'><img src={item.Country} alt="" /></td>
                <td>{item.Age}</td>
                <td className='OddsVal' >
                  <div className='OddsPadding' style={{ backgroundColor: parseInt(item.OddsVal) > 7 ? 'green' : parseInt(item.OddsVal) >= 5 ? 'rgba(255, 140, 0, 0.9)': 'red' }}>
                  {item.Odds}
                  </div></td>
            </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
