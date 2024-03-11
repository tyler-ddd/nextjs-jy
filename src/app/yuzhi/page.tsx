// /* eslint-disable @next/next/no-sync-scripts */
"use client"
 import Link from "next/link"
 import Image from 'next/image'
 import { Space, Table, Tag } from 'antd';
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
    title: '	交易hash',
    dataIndex: 'hash',
    key: 'hash',
  },
  {
    title: '	还款总金额',
    dataIndex: 'repayAmount',
    key: 'repayAmount',
  },
  {
    title: '	还款时间',
    dataIndex: 'repayDate',
    key: 'repayDate',
  },
   {
     title: '审核时间',
     dataIndex: 'auditDate',
     key: 'auditDate',
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
         <a>Invite {record.name}</a>
         <a>Delete</a>
       </Space>
     ),
   },
 ];
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
   const router = useRouter()
   const [lastId,setLastId]=useState(0)
   const [limit,setLimit]=useState(10)
   const [listData,setListData]=useState([])
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