import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Container fluid className="text-center">
          <h1 className="title">
            Welcome on this <span className="text-primary">skill TEST</span> !
          </h1>

          <Form.Row className="align-center">
              <Col xs={3}></Col>
              <Col xs={4}>
                <Form.Control size="lg" placeholder="Search for a subreddit" />
              </Col>
              <Col xs={2}>
                <Link href="/reddit/search"><Button block size="lg" variant="primary" type="submit">Search</Button></Link>
              </Col>
          </Form.Row>
      </Container>

      <style jsx>{`
      .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .title {
        margin: 0 0 2rem 0;
        line-height: 1.15;
        font-size: 4rem;
      }
      `}</style>
    </div>
  )
}
