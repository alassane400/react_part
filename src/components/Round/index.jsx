import "./round.css";

const Round = ({ round }) => {
  return (
    <>
      <div className="round-title">
        <p>{round.title}</p>
      </div>
      <div className="question">
        <p> question: {round.question}</p>
      </div>

      <div className="choice-list">
        <ul>
          {round.choice.map((item, index) => (
            <li key={index} className="choice-item">
              <label className="label" htmlFor={item.id}>
                {item.title}
              </label>
              <input
                type="radio"
                name="choice"
                id={item.id}
                className="radio-input"
              />
              <label htmlFor={item.id} class="radio-label"></label>
            </li>
          ))}
        </ul>
      </div>
      <div className="drop">
        <button className="drop-btn">Drop it</button>
      </div>
    </>
  );
};

export default Round;
