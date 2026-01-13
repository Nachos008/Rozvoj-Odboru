import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useNotes() {
  const notes = useLocalStorage('notes', [])

  const addNote = (title, content, subject) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      subject,
      date: new Date().toISOString()
    }
    notes.value.push(newNote)
  }

  const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  const editNote = (id, title, content, subject) => {
    const noteIndex = notes.value.findIndex(note => note.id === id)
    if (noteIndex !== -1) {
      notes.value[noteIndex] = {
        ...notes.value[noteIndex],
        title,
        content,
        subject,
        date: new Date().toISOString()
      }
    }
  }

  const getNotesFiltered = (subject = null) => {
    if (!subject) return notes.value
    return notes.value.filter(note => note.subject === subject)
  }

  const notesBySubject = computed(() => {
    const grouped = {}
    notes.value.forEach(note => {
      if (!grouped[note.subject]) {
        grouped[note.subject] = []
      }
      grouped[note.subject].push(note)
    })
    return grouped
  })

  return {
    notes,
    addNote,
    deleteNote,
    editNote,
    getNotesFiltered,
    notesBySubject
  }
}
