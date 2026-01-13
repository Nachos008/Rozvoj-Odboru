<script setup>
import { ref, computed } from 'vue'
import { useNotes } from '../composables/useNotes'
import { useTitle } from '@vueuse/core'
import NoteCard from '../components/NoteCard.vue'

const { notes, deleteNote, editNote } = useNotes()

const selectedSubject = ref('All')
const subjects = ['All', 'Math', 'English', 'Science', 'History', 'Other']

const filteredNotes = computed(() => {
  if (selectedSubject.value === 'All') {
    return notes.value
  }
  return notes.value.filter(note => note.subject === selectedSubject.value)
})

// Set dynamic page title based on number of notes
useTitle(computed(() => 
  notes.value.length > 0 
    ? `All Notes (${notes.value.length}) - Notes App` 
    : 'All Notes - Notes App'
))
</script>

<template>
  <div class="all-notes">
    <h1 class="page-title">All Notes</h1>
    
    <div class="filter-section">
      <label for="subject-filter" class="filter-label">Filter by Subject:</label>
      <select id="subject-filter" v-model="selectedSubject" class="filter-select">
        <option v-for="subject in subjects" :key="subject" :value="subject">
          {{ subject }}
        </option>
      </select>
    </div>

    <div v-if="filteredNotes.length === 0" class="empty-state">
      <p>No notes found. Add your first note!</p>
    </div>

    <div v-else class="notes-grid">
      <NoteCard 
        v-for="note in filteredNotes" 
        :key="note.id" 
        :note="note"
        @delete="deleteNote"
        @edit="editNote"
      />
    </div>
  </div>
</template>

<style scoped>
.all-notes {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.filter-section {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.filter-label {
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
}

.filter-select {
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.filter-select:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(245, 87, 108, 0.3);
}

.filter-select option {
  background: #764ba2;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.empty-state p {
  font-size: 1.5rem;
  opacity: 0.95;
  color: white;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
</style>
