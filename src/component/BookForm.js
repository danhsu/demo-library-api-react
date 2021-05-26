import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import BookDataService from '../api/BookDataService'


export default class BookForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }


    // populate when the page is opened, with Book JSON data
    componentDidMount() {
        if (this.state.id === -1) return

        BookDataService.getBookById(this.state.id)
            .then(response => this.setState({ book: response.data }))
    }


    // Formik onSubmit Button
    onSubmit(values) {

        console.log(values)

        let book = {
            bookId: this.state.id,
            isbn: values.isbn,
            title: values.title,
            summary: values.summary
        }

        // if ID == -1, this is a NEW restaurant to add
        if (this.state.id == -1) {
            BookDataService.createBook(book)
                .then(() => this.props.history.push(`/books`))
        }
        else {

            //This is an edit of existing restaurant
            BookDataService.updateBook(this.state.id, book)
                .then(() => this.props.history.push(`/books`))
        }

    }

    validate(values) {
        let errors = {}

        if (!values.isbn)
            errors.isbn = "Please input book isbn"
        if (!values.title)
            errors.title = "Please input book title"
        if (!values.summary)
            errors.summary = "Please input book summary"


        return errors
    }

    render() {

        // IF this is EDIT, retrieve the initial values from Book JSON
        // so we can populate the form
        let { isbn, title, summary } = this.state.book
        let displayBookId = this.state.id


        return (
            <div className="container">
                <div className="m-5 p-5">

                    <h1>{`Book ID: ${displayBookId == -1 ? 'NEW' : displayBookId}`}</h1>

                    <Formik
                        // Formik Form initial values
                        initialValues={{ isbn, title, summary }}

                        // Click to submit --> Formik onSubmit
                        onSubmit={this.onSubmit}

                        // handle validation --> Formik validate
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}

                        // allow the Formik form to get the state
                        enableReinitialize={true}
                    >

                        {

                            (props) =>
                                <Form >
                                    <ErrorMessage name="isbn" component="p" className="alert alert-warning" />
                                    <ErrorMessage name="title" component="p" className="alert alert-warning" />
                                    <ErrorMessage name="summary" component="p" className="alert alert-warning" />



                                    <fieldset className="form-group pb-3">
                                        <label>Book ISBN</label>
                                        <Field className="form-control" type="text" name="isbn" />
                                    </fieldset>

                                    <fieldset className="form-group pb-3">
                                        <label>Book Title</label>
                                        <Field className="form-control" type="text" name="title" />
                                    </fieldset>

                                    <fieldset className="form-group pb-5">
                                        <label>Summary</label>
                                        <Field className="form-control" as="textarea" rows="5" name="summary" />
                                    </fieldset>

                                    <button className="btn btn-primary " type="submit" name="submit">Submit</button>

                                </Form>
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}
