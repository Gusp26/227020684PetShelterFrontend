import React from "react";
import type { DatePickerProps } from 'antd';
import { message, DatePicker, Upload, Select, Form, Input, Button } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const { TextArea } = Input
const { Option } = Select

const NewCat = () => {
  const username = "alice";
  const password = "abc123";
  // Create token by username:password
  const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  localStorage.setItem('atoken', access_token);
  
  const handleFormSubmit = (values: any) => {
    const name = values.name;
    const breeds = values.breeds;
    const gender = values.gender;
    const birth = values.birth;
    const centre = values.centre;
    const umageurl = values.umageurl;
    const remark = values.remark;
    const status = values.status;
    console.log(values, name, breeds, gender, birth, centre, umageurl, remark, status);
    const postCat = {
      name: name,
      breeds: breeds,
      gender: gender,
      birth: birth,
      centre: centre,
      umageurl: umageurl,
      remark: remark,
      status: status
    }
    
    // Post request
    axios.post(`${api.uri}/cats`, postCat, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem('atoken')}`
      }
    }).then((res)=> {
      console.log(res.data);
    });
    
  }

  const contentRules = [
    {required: true, message: 'Please input somethings'}    
  ]

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  return (
    <Form name="cat"  labelCol={{ span: 2 }} onFinish={(values)=>handleFormSubmit(values)}>
      <br/>
      <br/>
      <Form.Item name="name" label="Cat Name" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="breeds" label="Breed" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={contentRules}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option value="M">M - Male</Option>
          <Option value="F">F - Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name="birth" label="birth">
        <DatePicker onChange={onChange} />
      </Form.Item>
      <Form.Item name="centre" label="centre" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="umageurl" label="Cat Photo">
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="imageurl" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </Form.Item>
      <Form.Item name="remark" label="remark" rules={contentRules}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="status" label="status">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add New Cat</Button>
      </Form.Item>
    
    </Form>
  )
}

export default NewCat;
