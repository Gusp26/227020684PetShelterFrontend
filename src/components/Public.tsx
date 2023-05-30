import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Image, Space, Button } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const Public = () => {
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
    return(<div>Loading ...</div>)
  } else {
    if(!cats){
      return(<div>There is no cat available now.</div>)
    } else {
      return(

        <div>
        <br/>
        <Space wrap>
          <Button type="primary" style={{width: 150}}> <Link to={`/Login`}> Login </Link> </Button>
        </Space>
          <br/>
          <hr/>
          <br/>
      
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
}

export default Public ;