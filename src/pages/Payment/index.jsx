import {useState, useEffect} from 'react'
import getdate from '../../utils/getDate';
import "./payment.css"



const Payment = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
  }, []);

  const handleSelectMonth = (id) =>{
    setSelectedMonth(id)
  }

  return (
  <div className="payment-content">
      <div className="today">
            <p className="today-text">{today}</p>
          </div>
          <div className="payment-body">
            <div className="payment-left">
              <div className="payment">
                <p>Cotisations</p>
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
            <div className="payment-right">
            <div className="payment-infos">
              <div className="payment-info-title">
                <h2>Payment Informations</h2>
              </div>
              <div className="payment-info-container">
                <div className="info-container-left">
                  <div className="info-left-sup"> <p> Type of paiemnt : </p> </div>
                  <div className="info-left-inf"> <p> Paiement of service : </p> </div>
                </div>
                <div className="info-container-right">
                  <div className="info-right-sup"><p>0</p></div>
                  <div className="info-right-inf"> <p>€</p></div>
                </div>
              </div>
            </div>
            <div className="account-info">
              <div className="account-info-title">
                <h2>Account Informations</h2>
              </div>
                <div className="account-iban">
                  <div className="account-iban-sup">
                    <p>Your new IBAN : </p>
                  </div>
                  <div className="drop-file">
                    <button className ="drop-file-btn"> Drop it </button>
                  </div>
                  <div className="account-iban-inf">
                    <p> Actual IBAN : </p>
                  </div>
                </div>
              </div>
            </div>
      </div>
  </div>
        )
}

export default Payment
