
import './App.css';
import Dashboard from './pages/dashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import OwnerDashboard from './pages/ownerdashboard';
import AccounterDashboard from './pages/accounterdashboard';
import SellerDetails from './pages/sellerDetails';
import FarmerDetails from './pages/farmerDetails';
import FarmerBillDetails from './pages/farmerBillDetails';
import SellerPaymentDetails from './pages/sellerPaymetDetail';
import ShopDetails from './pages/shopDetails';
import SellerCreditDetails from './pages/sellerCreditDetails';
import FarmerBillPendingDetails from './pages/farmerBillPendingDetails';
import FarmerBilling from './pages/farmerBilling';
import SellerBilling from './pages/sellerBilling';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<Dashboard />} />
          <Route path = '/ownerdashboard' element ={<OwnerDashboard/>}/>
          <Route path = '/shopDetails' element ={<ShopDetails />}/>
          <Route path = '/sellerDetails' element ={<SellerCreditDetails />}/>
          <Route path = '/farmerBillPayement' element ={<FarmerBillPendingDetails />}/>
          <Route path = '/accounterdashboard' element ={<AccounterDashboard />}/>
          <Route path = '/farmerbilling' element ={<FarmerBilling />}/>
          <Route path = '/sellerbilling' element ={<SellerBilling />}/>
          <Route path = '/sellers' element ={<SellerDetails />}/>
          <Route path = '/sellerPaymentDetail/:id' element ={<SellerPaymentDetails />}/>
          <Route path = '/farmers' element ={<FarmerDetails />}/>
          <Route path = '/billdetails/:id' element ={<FarmerBillDetails />}/>
        </Routes>
      </Router>
    </div> 
  );
}

export default App;
