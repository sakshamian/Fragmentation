import React, { useState } from 'react'

const TransactionTable = ({ burnTransactions, coinData }) => {

    return (
        <TransactionTableStyled>
            <div className="header">
                <p className="header_label">Burn Transactions</p>
            </div>
            <BurnTxTable
                data={burnTransactions}
                priceUSD={coinData?.current_price?.usd}
            />
        </TransactionTableStyled>
    )
}

export default TransactionTable