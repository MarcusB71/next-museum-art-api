import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

const ArtworkCard = ({ objectID }) => {
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (error) return <Error statusCode={404} />;
  if (isLoading) return null;
  if (!data) return null;
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall ||
            `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
          <Card.Text>
            <p>
              <strong>Date:</strong>
              {data.objectDate || 'N/A'}
            </p>
            <p>
              <strong>Classifications:</strong>
              {data.classification || 'N/A'}
            </p>
            <p>
              <strong>Medium:</strong>
              {data.medium || 'N/A'}
            </p>
          </Card.Text>
          <Link href={`/artwork/${data.objectID}`} passHref legacyBehavior>
            <Button variant="primary">
              <strong>ID: </strong>
              {data.objectID}
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default ArtworkCard;
