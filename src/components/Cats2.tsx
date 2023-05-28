import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Image, Space, Button } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
//import {LoadingOutlined} from '@ant-design/icons';

const Cat2 = () => {
  const [cats, setCats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(()=>{
    axios.get(`${api.uri}/cats`)
      .then((res)=>{
        setCats(res.data);
      })
      .then(()=>{
        setLoading(false);
      })
  }, []);
  
  if(loading){
//    const antIcon = <LoadingOutlined style={{ fontSize: 48}} spin />
//    return(<Spin indicator={antIcon} />);
    return(<div>Loading ...</div>)
  } else {
    if(!cats){
      return(<div>There is no cat available now.</div>)
    } else {
      return(
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
                  <Space wrap>
                    <Button type="primary" ><Link to={`/b/${id}`}>Update</Link></Button>
                    <Button type="primary" danger><Link to={`/c/${id}`}>Delete</Link></Button>
                  </Space>
                </Card>
              </Col>
            ))
          }
        </Row>
      )
    }
  }
}

export default Cat2;