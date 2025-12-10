<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Contact</h1>
        <p class="text-sm text-gray-600">( {{ unreadCount }} unread message )</p>
      </div>

      <div class="flex gap-6">
        <!-- Contact List -->
        <div class="w-1/2 space-y-4">
          <div 
            v-for="contact in contacts" 
            :key="contact.id"
            class="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition cursor-pointer"
            :class="{ 'border-l-4 border-green-500': contact.unread, 'ring-2 ring-blue-500': selectedContactId === contact.id }"
            @click="selectContact(contact.id)"
          >
            <!-- Avatar -->
            <div class="relative flex-shrink-0">
              <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img 
                  v-if="contact.avatar" 
                  :src="contact.avatar" 
                  :alt="contact.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <span v-if="contact.online" class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <!-- Message Content -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 mb-1">{{ contact.name }}</h3>
              <p class="text-sm text-gray-600 line-clamp-2">{{ contact.lastMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Chat Box -->
        <div class="w-1/2 bg-white rounded-lg shadow-lg flex flex-col h-[600px]" v-if="selectedContact">
          <!-- Chat Header -->
          <div class="border-b p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img 
                v-if="selectedContact.avatar" 
                :src="selectedContact.avatar" 
                :alt="selectedContact.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="font-semibold">{{ selectedContact.name }}</h3>
              <p class="text-xs text-gray-500" v-if="selectedContact.online">Online</p>
            </div>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div 
              v-for="message in selectedContact.messages" 
              :key="message.id"
              class="flex"
              :class="{ 'justify-end': message.isMe, 'justify-start': !message.isMe }"
            >
              <div 
                class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm"
                :class="{ 
                  'bg-blue-500 text-white': message.isMe, 
                  'bg-gray-200 text-gray-900': !message.isMe 
                }"
              >
                <p>{{ message.text }}</p>
                <p class="text-xs mt-1 opacity-75">{{ message.time }}</p>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="border-t border-gray-200 p-4">
            <form @submit.prevent="sendMessage" class="flex gap-3">
              <input 
                type="text" 
                v-model="newMessage"
                placeholder="Type a message..."
                class="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                class="bg-blue-500 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-blue-600 transition"
                :disabled="!newMessage.trim()"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="w-1/2 bg-white rounded-lg shadow-lg flex items-center justify-center h-[600px]">
          <div class="text-center text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <p>Select a contact to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageHero',
  data() {
    return {
      selectedContactId: null,
      newMessage: '',
      contacts: [
        {
          id: 1,
          name: 'Abdullah Adiwarman Wildan',
          lastMessage: 'In our project that we agreed on, would you still be okay if I give you a few more tasks? I feel the exchange is still a bit unbalanced on my side — but it’s totally fine if you can’t.',
          avatar: "data:image/jpeg;base64,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",
          online: true,
          unread: true,
          messages: [
            { id: 1, text: 'In our project that we agreed on, would you still be okay if I give you a few more tasks?', time: '10:30 AM', isMe: false },
            { id: 2, text: 'Sure, no problem! What tasks do you need help with?', time: '10:32 AM', isMe: true }
          ]
        },
        {
          id: 2,
          name: 'Name',
          lastMessage: 'Text message',
          avatar: null,
          online: false,
          unread: false,
          messages: [{ id: 1, text: 'Text message', time: '9:00 AM', isMe: false }]
        },
        {
          id: 3,
          name: 'Name',
          lastMessage: 'Text message',
          avatar: null,
          online: false,
          unread: false,
          messages: [{ id: 1, text: 'Text message', time: '8:00 AM', isMe: false }]
        },
        {
          id: 4,
          name: 'Name',
          lastMessage: 'Text message',
          avatar: null,
          online: false,
          unread: false,
          messages: [{ id: 1, text: 'Text message', time: '7:00 AM', isMe: false }]
        },
        {
          id: 5,
          name: 'Name',
          lastMessage: 'Text message',
          avatar: null,
          online: false,
          unread: false,
          messages: [{ id: 1, text: 'Text message', time: '6:00 AM', isMe: false }]
        }
      ]
    }
  },
  computed: {
    selectedContact() {
      return this.contacts.find(contact => contact.id === this.selectedContactId)
    },
    unreadCount() {
      return this.contacts.filter(contact => contact.unread).length
    }
  },
  methods: {
    selectContact(contactId) {
      this.selectedContactId = contactId
      // Mark as read
      const contact = this.contacts.find(c => c.id === contactId)
      if (contact) {
        contact.unread = false
      }
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedContact) return

      const newMsg = {
        id: this.selectedContact.messages.length + 1,
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }

      this.selectedContact.messages.push(newMsg)
      this.selectedContact.lastMessage = this.newMessage
      this.newMessage = ''
    }
  },
  mounted() {
    // Check if new contact created from TaskHero
    const newContactData = localStorage.getItem('newContactFromTask')
    if (newContactData) {
      const contactInfo = JSON.parse(newContactData)
      
      // Create new contact
      const newContact = {
        id: this.contacts.length + 1,
        name: contactInfo.partner,
        lastMessage: `Connected via: ${contactInfo.taskTitle}`,
        avatar: null,
        online: true,
        unread: false,
        messages: [
          {
            id: 1,
            text: `Hi! I'm interested in collaborating on "${contactInfo.taskTitle}"`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
          }
        ]
      }
      
      // Add to contacts list at the top
      this.contacts.unshift(newContact)
      
      // Auto-select the new contact
      this.selectContact(newContact.id)
      
      // Clear localStorage
      localStorage.removeItem('newContactFromTask')
    }
  }
}
</script>
