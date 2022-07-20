import { Row, Container, Col } from 'react-bootstrap';

interface CollectiblesPageProps {
  initialAuctionId?: number;
}

const CollectiblesPage: React.FC<CollectiblesPageProps> = props => {
  return (
    <Container fluid="lg">
      <Row>
        <Col lg={{ span: 6 }}>
          <h1>Collectibles</h1>
        </Col>
        <Col lg={{ span: 6 }}></Col>
      </Row>
    </Container>
  );
};
export default CollectiblesPage;
