import React, { useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Select, Form, Input, Button, Upload, Space, message } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';

const { TextArea } = Input
const { Option } = Select

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
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

const NewCat = () => {
  const { bid } = useParams();
  const [cats, setCats] = React.useState(null);

  React.useEffect(()=>{
    axios.get(`${api.uri}/cats/${bid}`)
      .then((res)=>{
        setCats(res.data);
      })
  }, []);

  console.log(cats);
  
  const username = "alice";
  const password = "abc123";
  // Create token by username:password
  const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  localStorage.setItem('atoken', access_token);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }

    console.log(imageUrl);
  };
  
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  const handleFormSubmit = (values: any) => {
    const name = values.name;
    const breeds = values.breeds;
    const gender = values.gender;
    const birth = values.birth;
    const centre = values.centre;
    const imageurl = Object.values({imageUrl}).toString('base64');
    const remark = values.remark;
    const status = values.status;
    console.log(imageurl);
    console.log(values, name, breeds, gender, birth, centre, imageurl, remark, status);
    const postCat = {
      name: name,
      breeds: breeds,
      gender: gender,
      birth: birth,
      centre: centre,
      imageurl: imageurl,
      remark: remark,
      status: status
    }
    
    // Post request
    axios.put(`${api.uri}/cats/${bid}`, postCat, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem('atoken')}`
      }
    }).then((res)=> {
      console.log(res.data);
    });

    message.success('Update cat infomation successful')
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onReset = () => {
    window.location.reload();
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
  return e && e.fileList;
  };
  
  if(!cats){
    return(<div>Please wait ...</div>)
  } else {
    
    const dateFormat = 'YYYY-MM-DD';
    
return (
    <Form 
      name="cat"  
      initialValues={{ 
        name:`${cats.name}`, 
        breeds:`${cats.breeds}`,
        gender:`${cats.gender}`,
        centre:`${cats.centre}`,
        remark:`${cats.remark}`,
        status:`${cats.status}`
      }}
      labelCol={{ span: 2 }} 
        onFinish={(values)=>handleFormSubmit(values)}
      >
      <br/>
      <br/>
      <Form.Item name="name" label="Cat Name" >
        <Input />
      </Form.Item>
      <Form.Item name="breeds" label="Breed" >
        <Input /> 
      </Form.Item>
      <Form.Item name="gender" label="Gender" >
        <Select
          placeholder="Select Gender"
          allowClear
        >
          <Option value="M">M - Male</Option>
          <Option value="F">F - Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name="birth" label="Birth">
        <DatePicker defaultValue={dayjs(`${cats.birth}`, dateFormat)}  name="birth" onChange={onChange} />
      </Form.Item>
      <Form.Item name="centre" label="Centre" >
        <Select
          placeholder="Select a centre"
          allowClear
        >
          <Option value="HK01">HK01 - Hong Kong Centre</Option>
          <Option value="HK02">HK02 - Wan Chai Centre</Option>
          <Option value="KL01">KL01 - Kowloon Centre</Option>
          <Option value="KL02">KL02 - Kowloon Bay Centre</Option>
          <Option value="KL03">KL03 - Kowloon Tong Centre</Option>
        </Select>
      </Form.Item>
      <Form.Item name="imageurl" label="Cat Photo" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload 
        listType="picture-card"
        showUploadList={false}
        action="https://run.mocky.io/v3/4f503449-0349-467e-a38a-c804956712b7"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </Form.Item>
      <Form.Item name="remark" label="Remark" >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="status" label="Status" >
        <Select
          placeholder="Select Status"
          allowClear
        >
          <Option value="Available">Available</Option>
          <Option value="Not available">Not available</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Space wrap>
          <Button type="primary" htmlType="submit" > Update </Button>
          <Button type="primary" htmlType="reset" onClick={onReset} danger> Reset </Button>
        </Space>
      </Form.Item>
    
    </Form>
  )
  }
  
}

export default NewCat;
