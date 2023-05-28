import React, { useState } from "react";
import { Select, Form, Input, Button, Space, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate= useNavigate();

  const handleFormSubmit = (values: any) => {
    const username = values.username;
    const password = values.password;
    const email = values.email;
    const staff = values.staff;
    const sign_up_code = values.sign_up_code;
    console.log(values, username, password, email, staff, sign_up_code);

    if (staff == 'T' && sign_up_code == '970226'){
      const postUser = {
        username: username,
        password: password,
        email: email,
        staff: 'T'
      }

      // Post request
      axios.post(`${api.uri}/user`, postUser)
        . then((res)=> {
        console.log(res.data);
      });

      message.success('Register successful')
    }else if (staff == 'F'){
      const postUser = {
        username: username,
        password: password,
        email: email,
        staff: 'F'
      }
      // Post request
      axios.post(`${api.uri}/user`, postUser)
        . then((res)=> {
          if(res.data.Status === "Success"){
            navigate('/')
          } else {
            message.error('Username or Email existing, please check again')
          }
        console.log(res.data);
      });
    } else if (staff == 'T' && sign_up_code != '970226'){
        message.success('Register successful')
    } else {
      
    }
    
  }

  const onReset = () => {
    form.resetFields();
  };

    
  return (
    <Form name="user" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} 
      style={{ maxWidth: 600 }} initialValues={{ staff: 'F'}}
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

      <Form.Item label="Email" name="email"
      rules={[{ required: true, message: 'Please input your email!' },
             { max: 64 , message: 'Maximum 64 characters.' },
             ]}
      >
      <Input />
      </Form.Item>

      <Form.Item label="Staff" name="staff">
        <Select
          placeholder="Select ..."
        >
          <Option value="F">No</Option>
          <Option value="T">Yes</Option>
        </Select>
      </Form.Item>
      
      <Form.Item label="Sign up code" name="sign_up_code">
      <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      </Form.Item>
    </Form>
  )
}

export default Register;
