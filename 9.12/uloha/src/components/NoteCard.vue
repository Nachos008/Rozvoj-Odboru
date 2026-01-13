<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'edit'])

const { copy, copied } = useClipboard()

const isEditing = ref(false)
const editTitle = ref(props.note.title)
const editContent = ref(props.note.content)
const editSubject = ref(props.note.subject)

const subjects = ['Math', 'English', 'Science', 'History', 'Other']

const startEdit = () => {
  isEditing.value = true
  editTitle.value = props.note.title
  editContent.value = props.note.content
  editSubject.value = props.note.subject
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = () => {
  if (editTitle.value.trim() && editContent.value.trim()) {
    emit('edit', props.note.id, editTitle.value, editContent.value, editSubject.value)
    isEditing.value = false
  }
}

const copyContent = () => {
  copy(props.note.content)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="note-card">
    <div v-if="!isEditing">
      <div class="note-header">
        <h3 class="note-title">{{ note.title }}</h3>
        <span class="note-subject">{{ note.subject }}</span>
      </div>
      <p class="note-content">{{ note.content }}</p>
      <small class="note-date">{{ formatDate(note.date) }}</small>
      <div class="note-actions">
        <button @click="copyContent" class="btn-copy">
          {{ copied ? '✓ Copied!' : '📋 Copy' }}
        </button>
        <button @click="startEdit" class="btn-edit">✏️ Edit</button>
        <button @click="emit('delete', note.id)" class="btn-delete">🗑️ Delete</button>
      </div>
    </div>
    
    <div v-else class="edit-mode">
      <div class="form-group">
        <input v-model="editTitle" type="text" placeholder="Title" class="edit-input" />
      </div>
      <div class="form-group">
        <select v-model="editSubject" class="edit-select">
          <option v-for="subj in subjects" :key="subj" :value="subj">{{ subj }}</option>
        </select>
      </div>
      <div class="form-group">
        <textarea v-model="editContent" placeholder="Content" rows="4" class="edit-textarea"></textarea>
      </div>
      <div class="note-actions">
        <button @click="saveEdit" class="btn-save">💾 Save</button>
        <button @click="cancelEdit" class="btn-cancel">❌ Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(245, 87, 108, 0.3);
  background: rgba(255, 255, 255, 0.2);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.note-title {
  font-size: 1.4rem;
  color: #fff;
  margin: 0;
  flex: 1;
  word-break: break-word;
  font-weight: 700;
}

.note-subject {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 3px 10px rgba(245, 87, 108, 0.3);
}

.note-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
  word-break: break-word;
}

.note-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 500;
}

.note-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-copy,
.btn-edit,
.btn-delete,
.btn-save,
.btn-cancel {
  flex: 1;
  padding: 0.65rem 0.5rem;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-copy {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-copy:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.btn-delete {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  box-shadow: 0 3px 10px rgba(238, 90, 111, 0.3);
}

.btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(238, 90, 111, 0.5);
}

.btn-copy:active,
.btn-delete:active,
.btn-edit:active,
.btn-save:active,
.btn-cancel:active {
  transform: translateY(0);
}

.btn-edit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
}

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.5);
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.edit-input,
.edit-textarea,
.edit-select {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
  font-weight: 500;
}

.edit-input::placeholder,
.edit-textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.edit-input:focus,
.edit-textarea:focus,
.edit-select:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.edit-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.edit-select {
  cursor: pointer;
}

.edit-select option {
  background: #667eea;
  color: white;
  padding: 0.5rem;
}

.btn-save {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
  color: white;
  box-shadow: 0 3px 10px rgba(86, 171, 47, 0.3);
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(86, 171, 47, 0.5);
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}
</style>