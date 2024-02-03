"use client"
import Link from "next/link"
import Image from 'next/image'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { Popover ,Toast, Button,ToastOptions,Card} from 'react-vant';
import { useState,useEffect } from "react"

 
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const actions = [{ text: '中文' }, { text: '英文' }];
export default function IndexPage() {
  const select = (option: { text: ToastOptions }) => Toast.info(option.text);
  const router = useRouter();
  const handleUserBtn=()=>{
    router.push('/user');
  }

  async function getData() {
    const res = await fetch('http://localhost:3000/api/test');
    const data = await res.json();
    console.log(data)
    return data;
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='container p-4 pt-6'>
    <div className='flex justify-end w-full'>
    <Popover
        placement="bottom-end"
        actions={actions}
        onSelect={select}
        reference={ <Image
          src="/langurage.png"
          width={30}
          height={30}
          className="mr-4 "
          alt="选择语言"
        />}
      />
   
        <Image
         src="/user.png"
         className="mr-4 "
         width={30}
         height={30}
         onClick={handleUserBtn}
         alt="用户"
       />
    </div>
    <div className='flex flex-col items-center w-full p-3 mt-3 rounded-xl amount-warper bg-slate-200'>
   <h3>钱包余额</h3>
   <div className='flex items-center justify-between w-full px-3 mt-3'>
          <div className='flex items-center justify-start'>
    <Image
         src="/USDT.png"
         width={30}
         height={30}
         alt="选择语言"
       />
       <span className='ml-1 text-slate-900'>100.00</span>
    </div>
    <div className='flex items-center'>
    <Link href={"/payment"}><Button>充值</Button></Link>
    <Link href={"/payment"}><Button className="ml-3 ">提现</Button></Link>
    </div>
   </div>
   <div className='flex items-center justify-between w-full px-3 mt-3'>
          <div className='flex items-center justify-start'>
    <Image
         src="/TRX.png"
         width={30}
         height={30}
         alt="选择语言"
       />
       <span className='ml-1 text-slate-900'>100.00</span>
    </div>
    <div className='flex items-center'>
    <Button>充值</Button>
    <Button className="ml-3 ">提现</Button>
    </div>
   </div>
    </div>

    <div className='flex items-center justify-around h-20 mt-4'>
           <div className='flex flex-col items-center '>
			  <Image
						src="/convert.png"
						width={30}
						height={30}
						alt=""
					/>
					<p className='text-xs '>币种兑换</p>
		   </div>
		   <div className='flex flex-col items-center '>
			  <Image
						src="/trxicon.png"
						width={30}
						height={30}
						alt=""
					/>
					<p className='text-xs '>能量租赁</p>
		   </div>
		   <div className='flex flex-col items-center '>
			  <Image
						src="/yuzhi.png"
						width={30}
						height={30}
						alt=""
					/>
					<p className='text-xs '>预支 TRX</p>
		   </div>
		   <div className='flex flex-col items-center '>
			  <Image
						src="/telegram.png"
						width={30}
						height={30}
						alt=""
					/>
					<p className='text-xs '>订阅 TG 会员</p>
		   </div>
		   </div>
       
       <Card>
      <Card.Header>账单</Card.Header>
         <Card.Body>卡片内容区域</Card.Body>
    </Card>
 </div>
  )
}
