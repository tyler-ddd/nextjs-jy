"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BackButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import {Image,Divider } from 'react-vant';

export default function User() {
    const { back } = useRouter();
    const { initWebAppData } = useWebApp();
    useEffect(() => {
        // 获取用户信息
        const user = initWebAppData.user;
        console.log(user);
      }, []);
  return (
    <div className='container p-4 pt-6'>
        <BackButton onClick={back} />
        <div className="flex items-center justify-start w-full h-24">
        <Image round fit='cover' width='80px' height='80px' src='https://img.yzcdn.cn/vant/cat.jpeg' />
        <div className="flex flex-col items-start justify-between h-10 ml-3">
            <h3 className="text-xl font-medium ">牛逼卡拉斯</h3>
            <p className="text-sm ">ID：5564545</p>
        </div>
        </div>
        <Divider className="my-3 " />
        <div className="mt-4 ">
            <h1 className="w-full text-xl font-medium">个人资料</h1>
            <div className="flex flex-col text-sm">
                <div className="mt-3 ">电报昵称：@uss 555</div>
                <div className="flex mt-3"><span>预支详情：</span><span style={{'color':'red'}}>-20trx</span><span style={{'color':'red'}}>-20能量值</span></div>
                <div className="mt-3 ">usdt余额：8888usdt</div>
                <div className="mt-3 ">TRx余额：565trx</div>
                <div className="mt-3 ">注册时间：2023-12-12</div>
            </div>
        </div>
    </div>
  )
}
