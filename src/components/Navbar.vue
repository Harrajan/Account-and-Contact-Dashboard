<template>
  <nav class="navbar">
    <div class="container">
      <div class="left">
        <button class="hamburger-btn" :class="{ 'open': showDropdown }" @click="toggleDropdown">☰</button>
        <div class="dropdown-menu" :class="{ 'show': showDropdown && dropdownType === 'user-management' }">
          <router-link to="/user-management" class="dropdown-link">User Management</router-link>
        </div>
      </div>
      <div class="center">
        <button class="home-btn" @click="goHome">Home</button>
      </div>
      <div class="right">
        <router-link v-if="showMyAccount" class="my-account-btn" to="/my-account">My Account</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      showMyAccount: false,
      showDropdown: false,
      dropdownType: '' // To track which dropdown is currently active
    };
  },
  methods: {
    goHome() {
      // Navigate to home page
      this.$router.push('/');
    },
    toggleDropdown(event) {
      event.preventDefault(); // Prevent default form submission behavior
      this.showDropdown = !this.showDropdown;
      this.dropdownType = 'user-management'; // Set the dropdown type to user management
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #f2f2f2;
  color: #333; 
  padding: 10px 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.left {
  display: flex;
  align-items: center;
  position: relative;
}

.center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.right {
  display: flex;
  align-items: center;
}

.hamburger-btn,
.home-btn,
.my-account-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #333; 
}

.hamburger-btn {
  font-size: 24px;
  transition: transform 0.3s ease; 
}

.hamburger-btn.open {
  transform: rotate(90deg);
}

.my-account-btn {
  margin-left: 10px;
  text-decoration: none;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: none;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-link {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease; 
}

.dropdown-link:hover {
  background-color: #f2f2f2; 
}
</style>