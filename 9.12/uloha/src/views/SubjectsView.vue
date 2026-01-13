<script setup>
import { computed } from 'vue'
import { useNotes } from '../composables/useNotes'
import { useTitle } from '@vueuse/core'

const { notesBySubject, notes } = useNotes()

// Set dynamic page title based on number of subjects
const subjectCount = computed(() => Object.keys(notesBySubject.value).length)
useTitle(computed(() => 
  subjectCount.value > 0 
    ? `Subjects (${subjectCount.value}) - Notes App` 
    : 'Subjects - Notes App'
))
</script>

<template>
  <div class="subjects-view">
    <h1 class="page-title">Subjects</h1>
    
    <div v-if="notes.length === 0" class="empty-state">
      <p>No notes yet. Add some notes to see subjects!</p>
    </div>

    <div v-else class="subjects-grid">
      <div v-for="(notesInSubject, subject) in notesBySubject" :key="subject" class="subject-card">
        <h2 class="subject-name">{{ subject }}</h2>
        <p class="note-count">{{ notesInSubject.length }} note{{ notesInSubject.length !== 1 ? 's' : '' }}</p>
        <ul class="notes-list">
          <li v-for="note in notesInSubject" :key="note.id" class="note-item">
            <strong>{{ note.title }}</strong>
            <span class="note-preview">{{ note.content.substring(0, 50) }}...</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subjects-view {
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

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.subject-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(245, 87, 108, 0.3);
  background: rgba(255, 255, 255, 0.2);
}

.subject-name {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: white;
  font-weight: 700;
}

.note-count {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  margin: 0 0 1.5rem 0;
  font-weight: 600;
}

.notes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.note-item strong {
  color: #fff;
  font-size: 1.1rem;
}

.note-preview {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}
</style>