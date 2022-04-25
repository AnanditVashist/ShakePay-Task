// import * as tHistory from './transaction_history.json'
// import * as rates from './rates.json'

const tHistory=require('./transaction_history.json');
const rates=require('./rates.json');

let arr=[]
let sum=0;

// 2020-03-16T16:17:10.951Z
const getDay=(date)=>{
    let arr1=date.split('T');
    let arr2=arr1[0].split('-');
    let day=arr2[2];
    return day;
}

for (let i = tHistory.length -1; i >= 0; i--) {
    
    const element = tHistory[i];
    let date=element.createdAt;
    let day=getDay(date);
    let dupliacte=false;
    if(i-1>=0)
    {
    let j=i-1;
    let elementj=tHistory[j];
    let dayj=getDay(elementj.createdAt);
    if(dayj==day)
    {
        let daysum=sum;
        let currencyType=element.currency;
        let direction= element.direction;
        let amount=element.amount;
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

    let cadamount= currencyType=="CAD"? amount:(currencyType=="BTC"? amount*(rates.BTC_CAD):(currencyType=="ETH"? amount*(rates.ETH_CAD):null))
    if(direction=="credit")
    {
        daysum+=cadamount;
        dupliacte=true;
    }
    else if(direction=="debit"){
        daysum-=cadamount;
        dupliacte=true;
    }
    j--;
    elementj=tHistory[j];
    dayj=getDay(elementj.createdAt);
    //arr.push({"date":date,"closing_balance":sum});
    }
    if(dupliacte)
    {
    arr.push({"date":date,"closing_balance":daysum});
    sum=daysum;
    }
    i=j+1;
}
    }
    
if(!dupliacte)
{
    let currencyType=element.currency;
    let direction= element.direction;
    let amount=element.amount;
    let prevsum=sum;
    let cadamount= currencyType=="CAD"? amount:(currencyType=="BTC"? amount*(rates.BTC_CAD):(currencyType=="ETH"? amount*(rates.ETH_CAD):null))
    if(direction=="credit")
    {
        sum=sum+cadamount;
    }
    else if(direction=="debit"){
        sum=sum-cadamount;
    }
    if(prevsum!=sum)
    {
    arr.push({"date":date,"closing_balance":sum});
    }
}
}

module.exports=arr