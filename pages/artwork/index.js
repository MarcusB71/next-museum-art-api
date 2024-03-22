import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Pagination } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import useSWR from 'swr';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;
const Artwork = () => {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);
  const router = useRouter();

  let finalQuery = router.asPath.split('?')[1];

  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data) {
      let results = [];
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;
  if (isLoading) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((artwork) => (
            <Col lg={3} key={artwork}>
              <ArtworkCard objectID={artwork} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>Try searching for something else.
            </Card.Body>
          </Card>
        )}
      </Row>
      {artworkList.length > 0 && (
        <>
          <br></br>
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage}></Pagination.Prev>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}></Pagination.Next>
              </Pagination>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Artwork;
