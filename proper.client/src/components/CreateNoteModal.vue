<template>
  <div class="create-note-modal" v-if="state.viewportWidth <= 700">
    <div class="modal fade"
         id="create-note"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <span type="button" class="close py-4" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </span>
                  <h4 class="modal-title">
                    New Note
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <div class="container">
              <form class="form-inline" @submit.prevent="createNote">
                <div class="form-group">
                </div>
                <textarea name="note-text"
                          id="note-description"
                          cols="30"
                          rows="5"
                          placeholder="Add a Note"
                          aria-describedby="helpId"
                          v-model="state.note.body"
                          required
                >
                  </textarea>
                <button class="btn btn-success" type="submit">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="create-note-modal" v-else>
    <div class="modal fade"
         id="create-note"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <span type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </span>
                  <h4 class="modal-title">
                    New Note
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createNote">
              <div>
                <textarea name="note-text"
                          id="note-description"
                          cols="30"
                          rows="5"
                          placeholder="Add a Note"
                          aria-describedby="helpId"
                          v-model="state.note.body"
                          required
                >
                </textarea>
                <div>
                  <button class="btn btn-success" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default ({
  name: 'CreateNoteModal',
  setup() {
    const state = reactive({
      note: {},
      notes: computed(() => AppState.notes),
      rental: computed(() => AppState.rental),
      viewportWidth: window.innerWidth

    })
    onMounted(() => { window.addEventListener('resize', () => { state.viewportWidth = window.innerWidth }) })

    return {
      state,

      async createNote() {
        try {
          state.note.rentalId = state.rental.id
          await notesService.createNote(state.note)
          state.note = {}
          $('#create-note').modal('hide')
          $('.modal-backdrop').remove()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
})
</script>

<style scoped>
.m-btns{
  justify-content: space-between;
}
</style>
