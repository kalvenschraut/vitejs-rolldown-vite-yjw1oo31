<template>
  <div class="data-table">
    <div class="table-header">
      <h3>{{ title }}</h3>
      <div class="controls">
        <input 
          v-model="searchTerm" 
          placeholder="Search..." 
          class="search-input"
        />
        <button @click="addRandomItem" class="add-btn">Add Item</button>
      </div>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('id')" class="sortable">
              ID {{ getSortIcon('id') }}
            </th>
            <th @click="sortBy('name')" class="sortable">
              Name {{ getSortIcon('name') }}
            </th>
            <th @click="sortBy('value')" class="sortable">
              Value {{ getSortIcon('value') }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id" class="table-row">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>
              <button @click="removeItem(item.id)" class="remove-btn">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="table-footer">
      <p>Total items: {{ filteredItems.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface TableItem {
  id: number
  name: string
  value: number
}

interface Props {
  title?: string
  initialData?: TableItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Data Table Component',
  initialData: () => []
})

const items = ref<TableItem[]>([])
const searchTerm = ref('')
const sortField = ref<keyof TableItem>('id')
const sortDirection = ref<'asc' | 'desc'>('asc')

// Initialize with sample data if no initial data provided
onMounted(() => {
  if (props.initialData.length > 0) {
    items.value = [...props.initialData]
  } else {
    items.value = [
      { id: 1, name: 'Alpha Item', value: 100 },
      { id: 2, name: 'Beta Component', value: 250 },
      { id: 3, name: 'Gamma Module', value: 175 },
      { id: 4, name: 'Delta Service', value: 300 }
    ]
  }
  console.log('DataTable initialized with rolldown-vite build')
})

const filteredItems = computed(() => {
  let filtered = items.value.filter(item =>
    item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.id.toString().includes(searchTerm.value) ||
    item.value.toString().includes(searchTerm.value)
  )

  // Sort the filtered items
  filtered.sort((a, b) => {
    const aVal = a[sortField.value]
    const bVal = b[sortField.value]
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection.value === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    
    return sortDirection.value === 'asc' 
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })

  return filtered
})

const sortBy = (field: keyof TableItem) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  console.log(`Sorting by ${field} in ${sortDirection.value} order`)
}

const getSortIcon = (field: keyof TableItem) => {
  if (sortField.value !== field) return '↕️'
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

const addRandomItem = () => {
  const names = ['Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet']
  const randomName = names[Math.floor(Math.random() * names.length)]
  const newItem: TableItem = {
    id: Math.max(...items.value.map(i => i.id)) + 1,
    name: `${randomName} ${Math.random().toString(36).substr(2, 5)}`,
    value: Math.floor(Math.random() * 500) + 50
  }
  items.value.push(newItem)
  console.log('Added new item:', newItem)
}

const removeItem = (id: number) => {
  const index = items.value.findIndex(item => item.id === id)
  if (index > -1) {
    items.value.splice(index, 1)
    console.log(`Removed item with id: ${id}`)
  }
}

// Emit events
const emit = defineEmits<{
  itemAdded: [item: TableItem]
  itemRemoved: [id: number]
}>()
</script>

<style scoped>
.data-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1rem 0;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.table-header h3 {
  margin: 0;
  color: #2d3748;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #3182ce;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f7fafc;
  font-weight: 600;
  color: #4a5568;
}

.sortable {
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}

.sortable:hover {
  background: #edf2f7;
}

.table-row:hover {
  background: #f7fafc;
}

.remove-btn {
  padding: 0.25rem 0.75rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #c53030;
}

.table-footer {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;
}
</style>