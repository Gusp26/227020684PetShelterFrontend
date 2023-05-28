import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Image, Button } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const DetailCat = () => {
  const { aid } = useParams();
  const navigate= useNavigate();

  const [cats, setCats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(()=>{
    axios.get(`${api.uri}/cats/${aid}`)
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
      let birthday = [cats.birth];
      
      if ( birthday[0] == null ){
        return(
        <Row justify="center">
          {
              <Col key={cats.id}>
                <Card title={cats.name} style={{width: 700} }>
                  <pre>       ID:         {cats.id}</pre>
                  <pre>       Breed:      {cats.breeds}</pre>
                  <pre>       Gender:     {cats.gender}</pre>
                  <pre>       Birth:      N\A </pre>
                  <pre>       Centre:     {cats.centre}</pre>
                  <pre>       Remark:     {cats.remark}</pre>
                  <pre>       Status:     {cats.status}</pre>
                  <pre>       <Image width={500} height={500} src={cats.imageurl} /></pre>
                  <br/>
                  <br/>
                  <div align="right"><Button type="primary" onClick={()=>navigate(-1)}>Back</Button></div>
                </Card>
              </Col>
          }
        </Row>
      )
      } else {
        return(
        <Row justify="center">
          {
              <Col key={cats.id}>
                <Card title={name} style={{width: 700} }>
                  <pre>       ID:         {cats.id}</pre>
                  <pre>       Name:       {cats.name}</pre>
                  <pre>       Breed:      {cats.breeds}</pre>
                  <pre>       Gender:     {cats.gender}</pre>
                  <pre>       Birth:      {cats.birth} </pre>
                  <pre>       Centre:     {cats.centre}</pre>
                  <pre>       Remark:     {cats.remark}</pre>
                  <pre>       Status:     {cats.status}</pre>
                  <pre>       <Image width={500} height={500} src={cats.imageurl} /></pre>
                  <br/>
                  <br/>
                  <div align="right"><Button type="primary" onClick={()=>navigate(-1)}>Back</Button></div>
                </Card>
              </Col>
          }
        </Row>
      )
      }
    }
  }
}

export default DetailCat;