import React from 'react'
import { Helmet } from 'react-helmet';
import '../styles/NewsCard.css'

export default function NewsCard({ newsInfo }) {

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </Helmet>
            <div id="container">
                <div className="product-details">
                    <h1>{newsInfo.title}</h1>

                    <div className="dates">
                        <h5>{newsInfo.publishedAt}</h5>
                    </div>

                    <p className="information">{newsInfo.summary}</p>

                    <div className="control">
                        <button className="btn" onClick={() => {
                            window.open(newsInfo.url, '_blank')
                        }}>
                            <span className="buy">Read More</span>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}
