import React, { Component } from 'react'
import BookDataService from '../api/BookDataService'


export default class BooksList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            search: '',
            books: []
        }

        this.updateSearch = this.updateSearch.bind(this)
        this.handleClickToBook = this.handleClickToBook.bind(this)
        this.handleClickToEdit = this.handleClickToEdit.bind(this)

    }

    componentDidMount() {

        // INITIAL STATE WHEN PAGE OPEN --> GET ALL BOOKS
        BookDataService.getAllBooks()
            .then(
                response => {
                    this.setState({ books: response.data })
                }
            )
    }

    // Search
    updateSearch(event) {
        this.setState({ search: event.target.value })
    }

    // Click to Book page
    handleClickToBook(id) {
        this.props.history.push(`/books/${id}`)
    }

    // Click to Edit Book (Admin Only)
    handleClickToEdit(id) {
        this.props.history.push(`/books/${id}/edit`)
    }

    // Click to Edit Restaurant
    handleClickToDelete(id) {
        BookDataService.deleteBook(id)
        window.location.reload();
    }


    render() {

        let searchResult = this.state.books.filter(
            (foundBook) => {
                return foundBook.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )


        return (

            <div className="container">

                <h1 className="display-3 text-center">All Books</h1>


                <div className="form-group" style={{ width: "60%", margin: "0pt auto 20pt" }}>
                    <input type="text" id="search" className="form-control form-control-lg" placeholder="Search By Book Title"
                        value={this.state.search} onChange={this.updateSearch} />
                </div>

                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {searchResult.map(

                        (book) =>
                            <div className="col" key={book.bookId}>

                                <div className="card shadow m-2" >

                                    <div className="card-body pb-5">



                                        <img src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                                            className="card-img-top" alt="main image" />

                                        <p className="card-text">ISBN: {book.isbn}</p>

                                        <a href="" className=" h3 link-primary text-decoration-none stretched-link "
                                            onClick={() => this.handleClickToBook(book.bookId)}>{book.title}</a>
                                        <p></p>
                                        {/* <p className="card-text">{book.summary}</p> */}


                                    </div>


                                    {/* THIS IS GOING TO BE FOR ADMIN ONLY */}
                                    <div className="card-footer d-flex justify-content-around" style={{ position: "relative", zIndex: 1 }}>

                                        <button className="btn btn-success ps-4 pe-4"
                                            onClick={() => this.handleClickToEdit(book.bookId)}>Edit</button>

                                        <button className="btn btn-danger ps-3 pe-3"
                                            onClick={() => this.handleClickToDelete(book.bookId)}>Delete</button>
                                    </div>

                                </div>
                            </div>
                    )}
                </div>


            </div>
        )
    }
}
