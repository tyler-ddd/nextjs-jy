 "use client"


import React from 'react';
import { useRouter } from 'next/navigation'
import {baseUrl} from '../../config'
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



export default function Login() {
  const router = useRouter();

  const onFinish = (values:any) => {

    console.log('Success:', values);
    fetch(`${baseUrl}/sys/public/login`,{method: 'POST',body: JSON.stringify(values), headers: {
      'Content-Type': 'application/json' // 设置请求头为 JSON
    }})
    .then(response => response.json())
    .then(res=>{
      console.log(res,'99999999')
      localStorage.setItem('token',res.data.accessToken)
      router.push('/');
    })
    .catch(err=>{
      console.log(err)
    })
  };
  
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
  <div className=' w-full flex justify-center items-center h-96 pt-16 flex-col'>
    <h1 className=' text-3xl font-bold pb-8'>万象后台管理</h1>
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="用户名"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="密码"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" className=' bg-black' htmlType="submit">
        登陆
      </Button>
    </Form.Item>
  </Form>
  </div>
  )
}
