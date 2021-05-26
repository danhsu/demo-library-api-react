import React, { Component } from 'react'
import BookDataService from '../api/BookDataService'

export default class Book extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }
        console.log(this.state.id)
    }

    // populate when the page is opened, with Book JSON data
    componentDidMount() {

        if (this.state.id === -1) return

        BookDataService.getBookById(this.state.id)
            .then(response => this.setState({ book: response.data }))
            .catch((error) => console.log(error.response.request._response))

    }


    render() {


        return (

            <div className="container">
                <div className="m-5 p-5">
                    <h1 className="display-4">{this.state.book.title}</h1>

                    <img src={`http://covers.openlibrary.org/b/isbn/${this.state.book.isbn}-L.jpg`} />

                    <p className="lead">ISBN: {this.state.book.isbn}</p>
                    <p className="lead">{this.state.book.summary}</p>
                </div>
            </div>
        )
    }
}
