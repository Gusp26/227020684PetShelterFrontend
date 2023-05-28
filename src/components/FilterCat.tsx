import React from "react";
import { Link } from 'react-router-dom';
import { Select, Form, Input, Button, Space, Card, Col, Row, Image } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const Filter = () => {
  const [form] = Form.useForm();
  
  const [cats, setCats] = React.useState(null);

  const handleFormSubmit = (values: any) => {
    const id = values.id;
    const name = values.name;
    const breeds = values.breeds;
    const gender = values.gender;
    const centre = values.centre;
    console.log(values, id, name, breeds, gender, centre);

    if(!id){
      axios.get(`${api.uri}/cats`)
      .then((res)=> {
        setCats(res.data);
        console.log(res.data);
      });
      
    } else {
      const postCat = {
      id: id,
      name: name,
      breeds: breeds,
      gender: gender,
      centre: centre
    }
    
    axios.post(`${api.uri}/filter`, postCat)
      .then((res)=> {
        setCats(res.data);
        console.log(res.data);
    });
    }
    
  }

  console.log(cats);
  
  const onReset = () => {
    form.resetFields();
  };

  const onBack = () => {
    window.location.reload();
  };

  if(!cats){
      return (
    <Form name="cat"  labelCol={{ span: 2 }} onFinish={(values)=>handleFormSubmit(values)}>
      <br/>
      <br/>
      <Form.Item name="id" label="Cat ID" >
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Cat Name" >
        <Input />
      </Form.Item>
      <Form.Item name="breeds" label="Breed" >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" >
        <Select
          placeholder="Select Gender"
          options={[
            {
              value: 'M',
              label: 'M - Male',
            },
            {
              value: 'F',
              label: 'F - Female',
            },
          ]}
          allowClear
        />
      </Form.Item>
      <Form.Item name="centre" label="Centre" >
        <Select
          placeholder="Select a centre"
          options={[
            {
              value: 'HK01',
              label: 'HK01 - Hong Kong Centre',
            },
            {
              value: 'HK02',
              label: 'HK02 - Wan Chai Centre',
            },
            {
              value: 'KL01',
              label: 'KL01 - Kowloon Centre',
            },
            {
              value: 'KL02',
              label: 'KL02 - Kowloon Bay Centre',
            },
            {
              value: 'KL03',
              label: 'KL03 - Kowloon Tong Centre',
            },
          ]}
          allowClear
        />
      </Form.Item>
      <Form.Item>
        <Space wrap>
          <Button type="primary" htmlType="submit" > Filter </Button>
          <Button type="primary" htmlType="reset" onClick={onReset} danger> Reset </Button>
        </Space>
      </Form.Item>
    </Form>
  )
  } else {
      return(
        <div>
          <p></p>
          <div align="right"><Button type="primary" onClick={onBack}> Back </Button></div>
          <p></p>
          <Row>
          {
            cats && cats.map(({id, name, breeds, gender, centre, imageurl})=> (
              <Col span={8} key={id}>
                <Card title={name} style={{width: 400}}>
                  <pre>ID:         {id}</pre>
                  <pre>Breed:      {breeds}</pre>
                  <pre>Gender:     {gender}</pre>
                  <pre>Centre:     {centre}</pre>
                  <Image width={300} height={300} src={imageurl} />
                  <p></p>
                  <Link to={`/a/${id}`}>Details</Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
      )
  } 
}
export default Filter;