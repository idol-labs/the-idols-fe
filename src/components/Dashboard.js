import React, { useContext } from 'react';

import { WalletContext } from '../contexts/WalletContext';

import AccountDashboard from './AccountDashboard';

import DashboardStyles from '../styles/DashboardStyles';

const Dashboard = () => {
    const { account } = useContext(WalletContext);

    return (
        <DashboardStyles>
            {
                account === null ?
                <p className='please-connect'>Please Connect Your Wallet to Access the Dashboard</p>:
                <AccountDashboard /> 
            }
        </DashboardStyles>
    )
}

export default Dashboard;