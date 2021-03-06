

const tHistory=require('./transaction_history.json');
const rates=require('./rates.json');

let dailyData=[]
let dailySum=0;

const getDay=(date)=>{
    let arr1=date.split('T');
    let arr2=arr1[0].split('-');
    let day=arr2[2];
    return day;
}

for (let i = tHistory.length -1; i >= 0; i--) {
    
    const transaction = tHistory[i];
    let date=transaction.createdAt;
    let day=getDay(date);
    let duplicate=false;
    if(i-1>=0)
    {
    let j=i-1;
    let elementj=tHistory[j];
    let dayj=getDay(elementj.createdAt);
    if(dayj==day)
    {
        let daysum=dailySum;
        let currencyType=transaction.currency;
        let direction= transaction.direction;
        let amount=transaction.amount;
        //let prevsum=sum;
        let cadamount= currencyType=="CAD"? amount:(currencyType=="BTC"? amount*(rates.BTC_CAD):(currencyType=="ETH"? amount*(rates.ETH_CAD):null))
        if(direction=="credit")
        {
            daysum=daysum+cadamount;
        }
        else if(direction=="debit"){
            daysum=daysum-cadamount;
        }
     //day+
    while(dayj==day && j>=0)
    {
        let currencyType=elementj.currency;
    let direction= elementj.direction;
    let amount=elementj.amount;

    let cadAmount= currencyType=="CAD"? amount:(currencyType=="BTC"? amount*(rates.BTC_CAD):(currencyType=="ETH"? amount*(rates.ETH_CAD):null))
    if(direction=="credit")
    {
        daysum+=cadAmount;
        duplicate=true;
    }
    else if(direction=="debit"){
        daysum-=cadAmount;
        duplicate=true;
    }
    j--;
    elementj=tHistory[j];
    dayj=getDay(elementj.createdAt);
    }
    if(duplicate)
    {
    dailyData.push({"date":date,"closing_balance":daysum});
    dailySum=daysum;
    }
    i=j+1;
}
    }
    
if(!duplicate)
{
    let currencyType=transaction.currency;
    let direction= transaction.direction;
    let amount=transaction.amount;
    let prevsum=dailySum;
    let cadamount= currencyType=="CAD"? amount:(currencyType=="BTC"? amount*(rates.BTC_CAD):(currencyType=="ETH"? amount*(rates.ETH_CAD):null))
    if(direction=="credit")
    {
        dailySum=dailySum+cadamount;
    }
    else if(direction=="debit"){
        dailySum=dailySum-cadamount;
    }
    if(prevsum!=dailySum)
    {
    dailyData.push({"date":date,"closing_balance":dailySum});
    }
}
}

module.exports=dailyData