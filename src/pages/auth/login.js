import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import { apiClient } from '@/utils/apiClient';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/data';

export default function Login() {
    const router = useRouter();
    const {data:session, status} = useSession();
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useRecoilState(userState);
    const [form] = Form.useForm();

    const checkPassword3Month = async (username) => {
      let result = await apiClient().post('/user/find', {username: username})
      let condition = dayjs(_.result(result, 'data[0].date_changepassword')).isBefore(dayjs().subtract(3,'months').format('YYYY-MM-DD'), 'day'); // > 3 month true
      console.log('condition',condition);
      return {
        condition,
        attempt: _.result(result, 'data[0].fail_attempt'),
        status: _.result(result, 'data[0].status'),
      }
    }

    const onFinish = async (values) => {
      const {condition,attempt,status} = await checkPassword3Month(values?.username);
      if (status=='lock') {
        message.error('User is lock, Please contract administrator to reset the password', 5)
      }
      if (condition || status == 'changepassword') {
        setUser(values?.username);
        router.push('/auth/changePassword');
      } else {
        let result = await signIn('credentials', {...values, redirect: false, callbackUrl: '/' })
        if (result?.ok == false) {
          router.push('/auth/login?attempt='+(+attempt+1))
          form.setFieldValue('password',null);
        }
        console.log(result)
        
      }
      
    };

    useEffect(()=>{
      let attempt = localStorage.getItem('attempt')
      console.log(attempt)
    },[]);

    useEffect(() => {
      // console.log(generateSalt())
      // hashPassword()
      // let ss = genSalt()
      // console.log(ss, ss.toString('hex'));
      // console.log(Uint8Array.from(ss.toString('hex').match(/.{1,2}/g).map((byte) => parseInt(byte, 16))))

      if (status==='authenticated') {
        router.push('/')
      } else if (status=='unauthenticated' && router?.query?.error) {
        // message.error(router.query.error)
      }
    }, [status])
    
    
    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 90px)' }}>
              <Form form={form} name="login" onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please enter your username' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item extra={<span>{router.query?.attempt>=4?'Please contract administrator to reset the password':''}</span>}>
                  
                  <Button type="primary" htmlType="submit" loading={loading} block>
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
      );
}
