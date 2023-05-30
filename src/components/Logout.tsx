import React, { useState } from "react";
import { Form, Button } from 'antd';
import { api } from './common/http-common';
import { Link } from 'react-router-dom';

const Logout = () => {
  
  const onFinish = () => {
    localStorage.clear();
  };

    
  return (
    <Form >
      <br/><br/><br/>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" onClick={onFinish} >
        <Link to={`/`}>Logout</Link>
      </Button>
      </Form.Item>
    </Form>
    
  )
}

export default Logout;
