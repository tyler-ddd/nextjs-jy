// /* eslint-disable @next/next/no-sync-scripts */
"use client"
 import Link from "next/link"
 import Image from 'next/image'
 import { Space, Table, Button,message } from 'antd';
 import { useRouter } from 'next/navigation'
 import { useState,useEffect } from "react"
 import {baseUrl} from '../../config'

 const getstatus=(val:any)=>{
  let text=''
  switch (val){
    case 0:
      text= '待审核'
      break
      case 1:
        text= '审核通过'
        break
        case 0:
          text= '自动审核通过'
          break
       default :
       text='审核拒绝'
       break
  }
  return text
 }
 
 const data = [
   {
     key: '1',
     name: 'John Brown',
     age: 32,
     address: 'New York No. 1 Lake Park',
     tags: ['nice', 'developer'],
   },
   {
     key: '2',
     name: 'Jim Green',
     age: 42,
     address: 'London No. 1 Lake Park',
     tags: ['loser'],
   },
   {
     key: '3',
     name: 'Joe Black',
     age: 32,
     address: 'Sydney No. 1 Lake Park',
     tags: ['cool', 'teacher'],
   },
 ]
 export default function Yuzhi() {
  const columns = [
    {
      title: '接收地址',
      dataIndex: 'acceptAddr',
      key: 'acceptAddr',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
     title: '	预支总金额',
     dataIndex: 'amount',
     key: 'amount',
     render: (text:string, record:any) => <a>{text}{record.currency}</a>,
   },
   {
     title: '	用户id',
     dataIndex: 'userId',
     key: 'userId',
   },
  
    {
      title: '审核状态',
      key: 'auditStatus',
      dataIndex: 'auditStatus', 
      render: (val:any) => <span>{getstatus(val)}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_:any, record:any) => (
        
          <Space size="middle">
          {record.auditStatus===0?<Button onClick={()=>handlepass(record)}>通过</Button> :
        <></>
        }
          {record.auditStatus===0?<Button onClick={()=>handleno(record)} danger>拒绝</Button> :
        <></>
        }
        </Space>
       
       
      ),
    },
  ];
   const router = useRouter()
   const [lastId,setLastId]=useState(0)
   const [limit,setLimit]=useState(10)
   const [listData,setListData]=useState([])
   const [messageApi, contextHolder] = message.useMessage();

   const init=()=>{
    fetch(`${baseUrl}/sys/advance/private/audit/list?lastId=${lastId}&&limit=${limit}`)
    .then(response => response.json())
      .then(res=>{
        setListData(res.data.list as any)
      })
      .catch(err=>{
        console.log(err)
      })
   }

   const handlepass=(record:any)=>{
    
    let values={
      id:record.advanceId,
      status:1
    }
    const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', localStorage.getItem('token') || ''); // 如果token可能为null，需要处理为一个默认值
    fetch(`${baseUrl}/sys/advance/private/audit`,{method: 'POST',body: JSON.stringify(values), headers: headers})
    .then(response => response.json())
    .then(res=>{
      
      if(res.code==200){
        messageApi.open({
          type: 'success',
          content: res.msg,
        });
        init()
      }else{
        console.log(res,'99999999')
       alert(res.msg)
      }
      
    })
    .catch(err=>{
      console.log(err)
    })
   }

   const handleno=(record:any)=>{
    let values={
      id:record.advanceId,
      status:2
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token') || ''); // 如果token可能为null，需要处理为一个默认值
        fetch(`${baseUrl}/sys/advance/private/audit`,{method: 'POST',body: JSON.stringify(values), headers: headers})
    .then(response => response.json())
    .then(res=>{
      if(res.code==200){
        messageApi.open({
          type: 'success',
          content: res.msg,
        });
        init()
      }else{
        alert(res.msg)
      }
      console.log(res,'99999999')
    })
    .catch(err=>{
      console.log(err)
    })
   }
   useEffect(()=>{
  if(!localStorage.getItem('token')){
    router.push('/login')
  }
   },[])
   useEffect(()=>{
    init()
   },[])
   return (
     <div className='container'>
       <Table columns={columns} dataSource={listData} />
      </div>
   )
 }