<script setup>
const navItems = [
  { label: "Главная страница", to: "/" },
  { label: "Модель угроз", to: "/threat-modelling" },
  { label: "Справочная информация", to: "/reference" },
  { label: "Поддержка", to: "/help" },
];
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <span class="navbar-brand p-0 m-0">
          <img class="logo" src="@/assets/fstec_logo.png" alt="FSTEC LOGO" />
        </span>

        <div class="nav-buttons">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-btn"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>

      <router-link to="/profile" class="user-icon">
        <img src="@/assets/Person.png" alt="Person" />
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #a11919;
  padding: 0.25rem;
  display: flex;
  align-items: center;
}

.container-fluid {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .d-flex {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 4.5rem;
    margin-right: 1rem;
  }
}

.nav-buttons {
  display: flex;
  gap: 12px;

  .nav-btn {
    background-color: transparent;
    border: 1.5px solid white;
    color: white;
    font-size: 1.25rem;
    font-weight: 500;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 0.2rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: white;
      color: #a11919;
    }
  }
}

.user-icon {
  margin-left: auto;

  img {
    height: 3rem;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;

    &:hover {
      opacity: 0.9;
      transform: scale(1.1);
    }
  }
}
</style>
