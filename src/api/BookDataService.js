import axios from 'axios'
const API_URL = 'https://library-project-private-api.herokuapp.com'
// http://localhost:8080


class BookDataService {

    getAllBooks() {
        return axios.get(`${API_URL}/books`)
    }

    getBookById(id) {
        return axios.get(`${API_URL}/books/${id}`)
    }

    updateBook(id, book) {
        return axios.put(`${API_URL}/books/${id}/edit`, book)
    }

    createBook(book) {
        return axios.post(`${API_URL}/books/-1/edit`, book)
    }

    deleteBook(id) {
        return axios.delete(`${API_URL}/books/${id}/delete`)
    }


}
export default new BookDataService()