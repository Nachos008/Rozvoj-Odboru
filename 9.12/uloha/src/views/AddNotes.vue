<script setup>
import { ref } from 'vue'
import { useNotes } from '../composables/useNotes'
import { useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'

const { addNote } = useNotes()
const router = useRouter()

const title = ref('')
const content = ref('')
const subject = ref('Math')

const subjects = ['Math', 'English', 'Science', 'History', 'Other']


useTitle('Add Note - Notes App')

const handleSubmit = () => {
  if (title.value.trim() && content.value.trim()) {
    addNote(title.value, content.value, subject.value)
    title.value = ''
    content.value = ''
    subject.value = 'Math'
    router.push('/')
  }
}
</script>

<template>
  <div class="add-note">
    <h1 class="page-title">Add Note</h1>
    <form @submit.prevent="handleSubmit" class="note-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          id="title"
          v-model="title" 
          type="text" 
          placeholder="Enter note title"
          required
        />
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <select id="subject" v-model="subject">
          <option v-for="subj in subjects" :key="subj" :value="subj">
            {{ subj }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea 
          id="content"
          v-model="content" 
          placeholder="Enter note content"
          rows="8"
          required
        ></textarea>
      </div>

      <button type="submit" class="btn-submit">Add Note</button>
    </form>
  </div>
</template>

<style scoped>
.add-note {
  max-width: 700px;
  margin: 0 auto;
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

.note-form {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  display: block;
  color: white;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(245, 87, 108, 0.3);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.form-group select option {
  background: #764ba2;
  color: white;
}

.btn-submit {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(245, 87, 108, 0.6);
}

.btn-submit:active {
  transform: translateY(0);
}
</style>