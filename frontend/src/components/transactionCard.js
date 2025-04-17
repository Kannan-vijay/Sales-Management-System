export default function transactionCard({transaction}){
    
    return <>
                {console.log(transaction)}
                <div class={transaction.detail === "Bill - Amount" ?"transaction bill":"transaction payment"}>
                        <h4>{transaction.detail}</h4>
                        <p>Date: {transaction.date}</p>
                        <p>Amount: ₹{transaction.amount}</p>
                </div>
            </>
}