export const AppPresentation = ({ addNumber, counter }) => (
  <div>
    <h2>Please click a button to bump a counter</h2>
    <p>counter: {counter}</p>
    <button onClick={addNumber}>+1</button>
  </div>
)
