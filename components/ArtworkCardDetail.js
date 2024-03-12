import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ArtworkCardDetail = ({ objectID }) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (error) return <Error statusCode={404} />;
  if (isLoading) return null;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && (
        <Card.Img
          variant="top"
          src={
            data.primaryImage ||
            `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`
          }
        />
      )}
      <Card.Body>
        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
        <Card.Text>
          <p>
            <strong>Date: </strong>
            {data.objectDate || 'N/A'}
          </p>
          <p>
            <strong>Classifications: </strong>
            {data.classification || 'N/A'}
          </p>
          <p>
            <strong>Medium: </strong>
            {data.medium || 'N/A'}
          </p>
          <br />
          <br />
          <p>
            <strong>Artist: </strong>
            {data.artistDisplayName || 'N/A'}({' '}
            <a href={data.artistWikidata_URL} target="blank" rel="noreferrer">
              wiki
            </a>{' '}
            )
          </p>
          <p>
            <strong>Credit Line: </strong>
            {data.creditLine || 'N/A'}
          </p>
          <p>
            <strong>Dimensions: </strong>
            {data.dimensions || 'N/A'}
          </p>
        </Card.Text>

        <Button
          variant="primary"
          onClick={() => {
            router.back();
          }}
        >
          <strong>Back</strong>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
