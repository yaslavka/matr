import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Redirect, BrowserRouter as Router, BrowserRouter, Route } from 'react-router-dom'
import { Row, Col, Container } from 'reactstrap'

import * as actions from '../../../actions/news.actions'
import routes from '../../../constants/routes.constants'
import NavBar from '../../../components/layout/Navbar'
import UserInfo from '../../../components/UserInfo'
import NewsItemPage from './NewsItemPage'
import NewsBlock from './NewsBlock'
import NewsList from './NewsList'
import { Spinner } from 'react-bootstrap'

const NewsPage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.news.isLoading)

  useEffect(() => {
    dispatch(actions.newsList())
  }, [dispatch])

  return (
    <>
      <NewsBlock />
      <Spinner isLoading={isLoading}>
        <NewsList />
      </Spinner>
    </>
  )
}

function News() {
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col>
          <BrowserRouter>
            <Router>
              <Switch>
                <Route exact path={routes.news} component={NewsPage} />
                <Route exact path={routes.newsItem} component={NewsItemPage} />
                <Redirect to={routes.news} />
              </Switch>
            </Router>
          </BrowserRouter>
        </Col>
      </Row>
    </Container>
  )
}

export default News
