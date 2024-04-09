<template>
  <div class="user-management">
    <h2>User Management</h2>
    <!-- Add user form -->
    <form @submit.prevent="addUser" class="add-user-form">
      <input type="text" v-model="newUserEmail" placeholder="Email" class="input-field" required>
      <input type="text" v-model="newUserFullName" placeholder="Full Name" class="input-field" required>
      <input type="password" v-model="newUserPassword" placeholder="Password" class="input-field" required>
      <button type="submit" class="submit-button">Add User</button>
    </form>
    <!-- Current users section -->
    <div class="current-users">
      <h3 v-if="users.length > 0" class="current-users-title">Current Users</h3>
      <p v-if="users.length === 0" class="no-users-message">No current users - please add a user</p>
      <!-- User list -->
      <ul class="user-list">
        <li v-for="user in users" :key="user.UserId" class="user-item">
          <span class="user-info">{{ user.Email }} - {{ user.Fullname }}</span>
          <button @click="deleteUser(user.UserId)" class="delete-button">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUserEmail: '',
      newUserFullName: '',
      newUserPassword: '',
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const url = 'https://challenge.uk.dev.netx2.btlcloud.net/api/v1/accounts/{AccountId}/users';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    addUser() {
      const url = 'https://challenge.uk.dev.netx2.btlcloud.net/api/v1/accounts/{AccountId}/users';
      const newUser = {
        AccountId: 'your_account_id_here',
        Active: true,
        Email: this.newUserEmail,
        Fullname: this.newUserFullName,
        Password: this.newUserPassword,
        UserId: 'generated_user_id_here'
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json())
        .then(data => {
          console.log('New user added:', data);
          this.users.push(newUser);
          this.newUserEmail = '';
          this.newUserFullName = '';
          this.newUserPassword = '';
        })
        .catch(error => {
          console.error('Error adding user:', error);
        });
    },
    deleteUser(userId) {
      const url = `https://challenge.uk.dev.netx2.btlcloud.net/api/v1/accounts/{AccountId}/users/${userId}`;
      fetch(url, {
        method: 'DELETE'
      })
        .then(() => {
          console.log('User deleted:', userId);
          // Remove the user from the local users array
          this.users = this.users.filter(user => user.UserId !== userId);
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  }
};
</script>

<style scoped>
.user-management {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

.user-management h2 {
  font-size: 24px;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
}

.add-user-form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  width: 100%;
  max-width: 350px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.submit-button {
  width: 100%;
  max-width: 200px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: Arial, sans-serif;
}

.submit-button:hover {
  background-color: #0056b3;
}

.current-users {
  width: 60%;
  margin: 0 auto;
}

.current-users-title {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.no-users-message {
  font-size: 16px;
  color: #888;
  font-family: Arial, sans-serif;
}

.user-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 10px;
}

.user-info {
  flex-grow: 1;
  font-family: Arial, sans-serif;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: Arial, sans-serif;
}

.delete-button:hover {
  background-color: #c82333;
}

</style>