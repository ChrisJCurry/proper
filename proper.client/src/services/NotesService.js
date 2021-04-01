import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { Note } from '../models/Note'

class NotesService {
  async getAll() {
    try {
      const res = await api.get('api/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (err) {
      logger.log(err)
    }
  }

  async getNotesByRentalId(rentalId) {
    try {
      const res = await api.get('api/notes/' + rentalId + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(noteData) {
    try {
      delete noteData.id
      const res = await api.post('api/notes', noteData)
      AppState.notes.push(res.data)
      return res.data._id
    } catch (err) {
      logger.error(err)
    }
  }

  async delete(note) {
    const res = window.confirm('Are you sure you want to delete this note?')
    if (!res) {
      return
    }
    try {
      await api.delete('/api/notes/' + note.id)
      AppState.notes.splice(AppState.notes.indexOf(note), 1)
    } catch (err) {
      logger.error(err)
    }
  }
}
export const notesService = new NotesService()
