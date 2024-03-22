import React from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from './store';
import { Card } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((artwork) => (
            <Col lg={3} key={artwork}>
              <ArtworkCard objectID={artwork} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>Try adding some favourite artwork to your
              list.
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}

export default Favourites;
