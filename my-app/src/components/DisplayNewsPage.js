import React from 'react'
import NewsCard from './NewsCard'
import TextField from '@mui/material/TextField';
import '../styles/DisplayNewsPage.css'


class DisplayNewsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            news: [],
            errorMsg: ''
        };
        this.handleKeywordChange = this.handleKeywordChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleKeywordChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    handleSearch(date) {
        const BACKEND_API = 'https://space-api.cool2645.com';
        let keyword = this.state.keyword;
        const url = `${BACKEND_API}/news?keyword=${keyword}`;
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(resp => {
                console.log(resp)
                if (resp.isSuccess) {
                    console.log(resp.data)
                    this.setState({
                        news: resp.data,
                        errorMsg: ''
                    })
                }
                else {
                    this.state.setState({
                        errorMsg: 'Error searching events'
                    })
                }

            })
            .catch(error => {
                // handle error here
                console.log('error');
            });
    }

    render() {
        const keyword = this.state.keyword
        return (
            <>
                <div id="display_events_page_container">
                    <div className="date_selector_section">
                        <div className="date_selector_wrapper">
                            <TextField
                                id="keyword-input"
                                value={keyword}
                                onChange={this.handleKeywordChange}
                            />
                        </div>
                        <button id="search_btn" className="btn" onClick={this.handleSearch}>
                            <span className="buy">Search</span>
                        </button>
                    </div>

                    <small id="error_message">{this.state.errorMsg}</small>

                    <div>
                        {this.state.news.map(news => (
                            <NewsCard key={news.id} newsInfo={news} />
                        ))}
                    </div>
                </div>
            </>
        )
    }

}

export default DisplayNewsPage;