import { Card, Col, Row, Image } from "antd";

const Catapi2 = ({ Catapi2 }) => {
  return (
        <Row>

              <Col>
                <Card title={Catapi2?.breeds[0]?.name} style={{width: 400}}>
                  <p>Description: </p>
                  <p>{Catapi2?.breeds[0]?.description}</p>
                  <Image width={300} height={300} src={Catapi2.url} />
                  <p></p>
                  <a className="text-muted" href={`${Catapi2?.breeds[0]?.wikipedia_url}`}>
                    Wikipedia
                  </a>
                </Card>
              </Col>
        </Row>
  )
};

export default Catapi2;
