<template>
  <div class="accounts-global-view">
    <h2 class="title">Dashboard</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <!-- Accounts section -->
      <div class="section account-section">
        <h3>Account Information</h3>
        <div v-for="account in accounts" :key="account.AccountId" class="account-item">
          <!-- Account details -->
          <div class="account-details">
            <div class="info-section">
              <p><strong>Account Name:</strong> {{ account.Name }}</p>
              <p><strong>Contact Name:</strong> {{ account.ContactName }}</p>
              <p><strong>Main Number:</strong> {{ account.MainNumber }}</p>
              <p><strong>Location:</strong> {{ account.Address1 }}, {{ account.Address2 }}, {{ account.City }}, {{ account.PostCode }}, {{ account.Country }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Numbers section -->
      <div class="section">
        <h3>Contacts</h3>
        <div v-if="numbersLoading" class="loading">Loading...</div>
        <div v-else-if="numbersError" class="error">{{ numbersError }}</div>
        <div v-else>
          <div v-for="number in numbers" :key="number.Number" class="number-item">
            <p><strong>Number:</strong> {{ number.Number }}</p>
            <p><strong>Contact Name:</strong> {{ number.ContactName || 'Unassigned' }}</p>
            <p><strong>Enabled:</strong> {{ number.Enabled ? 'Yes' : 'No' }}</p>
            <p><strong>Notes:</strong> {{ number.Notes }}</p>
            <div class="contact-actions">
              <button @click="deleteContact(number.Number)" class="delete-contact-button">Delete Contact</button>
              <button @click="toggleBlacklist(number)" class="toggle-blacklist-button" :class="{ 'blacklisted': number.Blacklisted }">{{ number.Blacklisted ? 'Blacklisted' : 'Blacklist' }}</button>
            </div>
          </div>
        </div>
        <div class="add-number-form">
          <h4>Add New Contact</h4>
          <form @submit.prevent="addNumber" class="number-form">
            <input type="text" v-model="newNumber" placeholder="Enter phone number" class="number-input">
            <input type="text" v-model="newContactName" placeholder="Enter contact name" class="number-input">
            <input type="text" v-model="newNotes" placeholder="Enter notes" class="number-input">
            <button type="submit" class="submit-button">Add Contact</button>
          </form>
        </div>
      </div>

      <!-- User Management section (conditionally rendered based on route) -->
      <div class="section" v-if="isUserManagementRoute">
        <h3>User Management</h3>
        <UserManagement />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import UserManagement from '@/components/UserManagement.vue';
import { useRoute } from 'vue-router'; // Import useRoute from Vue Router

export default {
  name: 'AccountsGlobalView',
  components: {
    UserManagement
  },
  setup() {
    const accounts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    const numbers = ref([]);
    const numbersLoading = ref(true);
    const numbersError = ref(null);
    const newNumber = ref('');
    const newContactName = ref('');
    const newNotes = ref('');

    const fetchAccounts = async () => {
      try {
        const response = await axios.get('https://challenge.uk.dev.netx2.btlcloud.net/api/v1/accounts');
        accounts.value = response.data;
        loading.value = false;
      } catch (error) {
        console.error('Error fetching accounts:', error);
        error.value = 'Failed to fetch accounts. Please try again later.';
        loading.value = false;
      }
    };

    const fetchNumbers = async () => {
      try {
        const response = await axios.get('https://challenge.uk.dev.netx2.btlcloud.net/api/v1/numbers');
        numbers.value = response.data;
        numbersLoading.value = false;
      } catch (error) {
        console.error('Error fetching numbers:', error);
        numbersError.value = 'Failed to fetch numbers. Please try again later.';
        numbersLoading.value = false;
      }
    };

    const deleteContact = async (number) => {
      try {
        const response = await axios.delete(`https://challenge.uk.dev.netx2.btlcloud.net/api/v1/numbers/${number}`);
        console.log('Contact deleted successfully:', response);
        fetchNumbers();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    };

    const toggleBlacklist = async (number) => {
      try {
        // Toggle blacklist status
        number.Enabled = !number.Enabled;
        // Update the contact's blacklist status on the server (optional)
        const response = await axios.patch(`https://challenge.uk.dev.netx2.btlcloud.net/api/v1/numbers/${number.Number}`, {
          Blacklisted: number.Enabled ? 'no' : 'yes'
        });
        console.log('Blacklist status updated successfully:', response);
      } catch (error) {
        console.error('Error updating blacklist status:', error);
      }
    };

    const addNumber = async () => {
      try {
        const response = await axios.post('https://challenge.uk.dev.netx2.btlcloud.net/api/v1/numbers', {
          Number: newNumber.value,
          ContactName: newContactName.value,
          Notes: newNotes.value
        });
        console.log('Number added successfully:', response);
        fetchNumbers();
        newNumber.value = '';
        newContactName.value = '';
        newNotes.value = '';
      } catch (error) {
        console.error('Error adding number:', error);
      }
    };

    onMounted(() => {
      fetchAccounts();
      fetchNumbers();
    });

    // Access the current route using useRoute
    const route = useRoute();

    // Check if the current route is /user-management
    const isUserManagementRoute = computed(() => {
      return route.value && route.value.path === '/user-management';
    });

    return {
      accounts,
      loading,
      error,
      numbers,
      numbersLoading,
      numbersError,
      newNumber,
      newContactName,
      newNotes,
      deleteContact,
      toggleBlacklist,
      addNumber,
      isUserManagementRoute
    };
  }
}
</script>

<style scoped>
.accounts-global-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}
.loading {
  font-style: italic;
  font-size: 16px;
  color: #555;
}

.title {
  text-align: center;
  margin-bottom: 50px;
}

.error {
  color: red;
  font-size: 16px;
}

.section h3 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.account-item, .number-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  background-color: #f9f9f9;
}

.delete-account-button,
.delete-contact-button,
.toggle-blacklist-button {
  padding: 8px 12px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

.toggle-blacklist-button {
  background-color: #007bff;
}

.toggle-blacklist-button.blacklisted {
  background-color: #28a745;
}

.delete-account-button {
  margin-bottom: 10px;
}

.delete-account-button:hover,
.delete-contact-button:hover,
.toggle-blacklist-button:hover {
  background-color: #c82333;
}

.add-number-form {
  margin-top: 20px;
}

.number-form {
  display: flex;
  align-items: center;
}

.number-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.submit-button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
.add-number-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>