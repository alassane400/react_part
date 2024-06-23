import React from 'react'
import getdate from '../../utils/getDate';

const Payment = () => {

  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
  }, []);

  return (
  <div className="vote-content">
      <div className="today">
            <p className="today-text">{today}</p>
          </div>
          <div className="vote-body">
            <div className="vote-left">
              <div className="vote">
                <p>Vote</p>
              </div>
              <div className="month" onClick={() => handleSelectMonth(1)}>
                <p>Month 1</p>
              </div>
              <div className="month" onClick={() => handleSelectMonth(2)}>
                <p>Month 2</p>
              </div>
              <div className="month" onClick={() => handleSelectMonth(3)}>
                <p>Month 3</p>
              </div>
            </div>
            <div className="vote-right"> </div>
      </div>
  </div>
        )
}

export default Payment
