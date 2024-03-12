import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

const ArtworkCard = () => {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  );
};

export default ArtworkCard;
