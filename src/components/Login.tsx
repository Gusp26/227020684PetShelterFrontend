import React, { useState } from "react";
import { Form, Input, Button, Space, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate= useNavigate();

  const handleFormSubmit = (values: any) => {
    const username = values.username;
    const password = values.password;
    console.log(values, username, password);

      const postUser = {
        username: username,
        password: password
      }
      // Post request
      axios.post(`${api.uri}/login`, postUser)
        . then((res)=> {
        console.log(res.data);
      });

      message.success('Login  successful')
    
  }

  const onReset = () => {
    form.resetFields();
  };

    
  return (
    <Form name="user" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} 
      style={{ maxWidth: 600 }} 
      onFinish={(values)=>handleFormSubmit(values)}
      >
      <br/><br/><br/>
      <Form.Item label="Username" name="username"
      rules={[{ required: true, message: 'Please input your username!' },
              { min: 6 , message: 'Username must be minimum 6 characters.' },
              { max: 16 , message: 'Maximum 16 characters.' },
             ]}
      >
      <Input />
    </Form.Item>

      <Form.Item label="Password" name="password"
      rules={[{ required: true, message: 'Please input your username!' },
              { min: 6 , message: 'Password must be minimum 6 characters.' },
              { max: 32 , message: 'Maximum 32 characters.' },
             ]}
      >
      <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      </Form.Item>
    </Form>
  )
}

export default Login;
